import type { GetServerSideProps } from 'next';

import { get } from 'lodash';

import type { ProductProps } from '../../types';
import { getProductDetail } from '../../../service/product.service';
import { logger, verifyAdultUser } from '../../../../shared/services';
import { getServerSideSessionData } from '../../../../shared/services/session.service';
import { ParsedUrlQuery } from 'querystring';
import { LockedUserError, LockedUserErrorMessage } from '../../../../shared/errors/LockedUserError';

const getErrorMessage = (error: { code: string; message: string }) => {
  const errorCode = get(error, 'code', '3000');
  if (errorCode === '3001') {
    return get(error, 'message', '성인 인증이 필요한 상품입니다.');
  }

  if (error instanceof LockedUserError) {
    return LockedUserErrorMessage;
  }

  return get(error, 'message', '일시적으로 해당 상품의 판매가 중지되었습니다.');
};

export interface ProductDetailServerSidePropsResult {
  product: ProductProps | null;
  adultVerificationFailed: boolean;
  error?: {
    log: string;
    message: string;
  };
}

export const getProductDetailServerSideProductProps: GetServerSideProps<ProductDetailServerSidePropsResult> = async (
  context,
) => {
  const { req, res, query } = context;
  const userAgent = get(req, 'headers["user-agent"]');

  try {
    const { accessToken, isGuest } = await getServerSideSessionData(req, res);
    const { productCode } = query as ParsedUrlQuery & { productCode: string };

    const product = await getProductDetail({
      productCode: Number(productCode),
      accessToken,
      userAgent,
      isInternal: true,
    });

    // NOTE: 성인인증 상품이 아닌 경우 성인인증을 검증하지 않습니다.
    const adultVerificationRequired = get(product, 'isOnlyAdult');
    if (!adultVerificationRequired) {
      return {
        props: {
          adultVerificationFailed: false,
          product,
        },
      };
    }
    // NOTE: 게스트 유저는 성인인증 상품에 접근할 수 없습니다.
    if (isGuest) {
      return {
        props: {
          adultVerificationFailed: true,
          product,
        },
      };
    }

    // NOTE: 성인인증 상품인 경우 성인인증을 검증합니다.
    const isAdultUser = await verifyAdultUser(accessToken);
    return {
      props: {
        adultVerificationFailed: !isAdultUser,
        product,
      },
    };
  } catch (err) {
    logger.error(err);

    const error = {
      log: JSON.stringify(err),
      message: getErrorMessage(err),
    };

    return {
      props: {
        adultVerificationFailed: true,
        product: null,
        error,
      },
    };
  }
};
