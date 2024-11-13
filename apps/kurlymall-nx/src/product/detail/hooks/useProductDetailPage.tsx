import { useCallback, useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { initProductDetail, initProductDetailCouponBanner, loadProductIsPicked, setDefaultContentId } from '../slice';
import { useAppSelector } from '../../../shared/store';
import {
  loadAdultVerificationData,
  saveAdultVerificationData,
} from '../../../member/adult-verification/services/adult-verificaiton-data-storage';
import Alert from '../../../shared/components/Alert/Alert';
import { notify, redirectTo } from '../../../shared/reducers/page';
import { loadBaseAddressNotification } from '../../../shared/reducers/shipping-address.slice';
import useRecentProducts from './useRecentProducts';
import { loadSessionStorage, storeSessionStorage } from '../../../shared/services/session.storage.service';
import { branchService } from '../../../shared/branch';
import { ViewItem } from '../../../shared/branch/events';
import { amplitudeService, ScreenName } from '../../../shared/amplitude';
import { ViewProductDetail } from '../../../shared/amplitude/events/product/ViewProductDetail';
import { getFusionQueryId } from '../shared/utils/productDetailEvent';
import { COMMON_PATH, MEMBERSHIP_PATH, PRODUCT_PATH, getPageUrl } from '../../../shared/constant';
import type { ProductDetailServerSidePropsResult } from '../shared/utils/getProductDetailServerSideProps';
import { LockedUserErrorMessage } from '../../../shared/errors/LockedUserError';
import { useCurrentAddress } from '../../../shared/hooks/useCartAddress';
import { isPC } from '../../../../util/window/getDevice';
import { verifyMembershipOnlyProductByDeal } from '../../service/verifyMembershipOnlyProductByDeal';
import {
  LAST_VIEWING_CONTENT_NO,
  PRODUCT_SELECT_USER_ACTION_TYPE,
} from '../../../shared/components/Cart/MembershipOnlyProductAlert/constants';
import { logEventPixelViewContents } from '../shared/utils/pixel/logEventPixelViewContents';

export default function useProductDetailPage({
  product,
  adultVerificationFailed,
  error,
}: ProductDetailServerSidePropsResult) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isViewProductEventFiredRef = useRef<boolean>(false);
  const { hasSession, isGuest, accessToken } = useAppSelector(({ auth }) => auth);
  const { queryId } = useAppSelector(({ productList }) => productList);
  const { loadCartAddress } = useCurrentAddress();

  const verifyAdultForAdultProduct = useCallback(async () => {
    if (!hasSession || !product || !product.isOnlyAdult || !adultVerificationFailed) {
      return;
    }

    const data = loadAdultVerificationData();

    const referrerUrl: string =
      data?.referrer_url || loadSessionStorage('prevPath') || encodeURIComponent(window.location.href);

    saveAdultVerificationData({
      referrer_url: referrerUrl,
      goodsno: product.no,
    });

    if (isGuest) {
      const { isConfirmed } = await Alert({
        text: '로그인하셔야 본 서비스를 이용하실 수 있습니다.',
        allowOutsideClick: false,
      });

      if (isConfirmed) {
        dispatch(
          redirectTo({
            url: getPageUrl(COMMON_PATH.login),
            query: {
              internalUrl: `${getPageUrl(PRODUCT_PATH.detail)}/${product.no}`,
              authAdult: 'true',
            },
          }),
        );
      }

      return;
    }

    dispatch(
      redirectTo({
        url: '/member/adult-verification',
      }),
    );
  }, [hasSession, isGuest, product, adultVerificationFailed, dispatch]);

  useEffect(() => {
    verifyAdultForAdultProduct().catch((err) => dispatch(notify(err.message)));
  }, [verifyAdultForAdultProduct, dispatch]);

  useEffect(() => {
    if (!product) {
      if (error?.message === LockedUserErrorMessage) {
        // 이미 alert으로 로그아웃되었다는 메세지가 표시되므로 여기서 Alert을 보여줄 필요 없음
        return;
      }

      Alert({ text: error ? error.message : '일시적인 오류로 상품 정보를 불러 올 수 없습니다.' }).then(() => {
        dispatch(redirectTo({ url: '/', isExternal: true }));
      });
      return;
    }

    dispatch(setDefaultContentId(product.no));
    dispatch(initProductDetail(product));
  }, [dispatch, product]);

  useEffect(() => {
    if (!adultVerificationFailed && product && hasSession) {
      dispatch(initProductDetailCouponBanner(product.no));
    }
  }, [adultVerificationFailed, hasSession, product, dispatch]);

  useEffect(() => {
    (async () => {
      if (!hasSession) {
        return;
      }
      if (isGuest) {
        await loadCartAddress();
        return;
      }
      dispatch(loadBaseAddressNotification());
    })();
  }, [dispatch, hasSession, isGuest, loadCartAddress]);

  useRecentProducts(product);

  useEffect(() => {
    logEventPixelViewContents(product);
  }, [product]);

  useEffect(() => {
    const isViewProductEventFired = isViewProductEventFiredRef.current;
    if (isViewProductEventFired) {
      return;
    }
    if (product && accessToken) {
      try {
        isViewProductEventFiredRef.current = true;
        amplitudeService.setScreenName(ScreenName.PRODUCT_DETAIL_DESCRIPTION);
        amplitudeService.logEvent(new ViewProductDetail({ product, fusionQueryId: getFusionQueryId(queryId) }));
        const { no, name, basePrice, discountedPrice } = product;
        branchService.logEvent(
          new ViewItem([
            {
              $canonical_identifier: `product/${no}`,
              $sku: no,
              $price: discountedPrice || basePrice,
              $quantity: 1,
              $currency: 'KRW',
              $product_name: name,
            },
          ]),
        );
      } catch (e) {}
    }

    if (error) {
      Alert({ text: error.message }).then(() => dispatch(redirectTo({ url: '/main' })));
    }

    if (error) {
      console.error(error.log);
    }
  }, [dispatch, error, queryId, accessToken, product, router]);

  useEffect(() => {
    if (isGuest || !product) {
      return;
    }

    dispatch(loadProductIsPicked(product.no));
  }, [dispatch, isGuest, product]);

  useEffect(() => {
    if (!isPC || !product) {
      return;
    }

    verifyMembershipOnlyProductByDeal({
      dealProducts: product.dealProducts,
      userAction: PRODUCT_SELECT_USER_ACTION_TYPE.ADD_TO_CART,
      onClickConfirm: () => {
        storeSessionStorage<string>(LAST_VIEWING_CONTENT_NO, JSON.stringify(product.no));
        router.push(getPageUrl(MEMBERSHIP_PATH.membership));
      },
    });
  }, [product, router]);
}
