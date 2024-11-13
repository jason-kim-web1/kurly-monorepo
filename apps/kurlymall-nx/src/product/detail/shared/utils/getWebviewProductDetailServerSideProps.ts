import { GetServerSideProps } from 'next';
import { get } from 'lodash';

import { getWebViewInjectedAccessToken } from '../../../../server/webview';
import { getProductDetail } from '../../../service/product.service';
import { getGuestTokenWithData, getRefreshData } from '../../../../shared/services/session.service';
import { DecodedToken, extractAuthentication } from '../../../../shared/utils/token';

type ExtractedTokenSuccessResult = {
  success: true;
  auth: DecodedToken;
};

type ExtractedTokenResult =
  | ExtractedTokenSuccessResult
  | {
      success: false;
      auth: null;
    };

const checkValidExtractedTokenResult = (result: ExtractedTokenResult): result is ExtractedTokenSuccessResult =>
  result.success;
const getExtractedToken = (accessToken: string): ExtractedTokenResult => {
  try {
    const auth = extractAuthentication(accessToken);
    return {
      success: true,
      auth,
    };
  } catch (error) {
    return {
      success: false,
      auth: null,
    };
  }
};

const getValidAccessToken = async (accessToken: string) => {
  const extractedToken = getExtractedToken(accessToken);
  if (!checkValidExtractedTokenResult(extractedToken)) {
    return getGuestTokenWithData();
  }
  const {
    auth: { isExpired, isGuest },
  } = extractedToken;
  if (!isExpired) {
    return {
      accessToken,
      isGuest,
    };
  }
  const { refreshedAccessToken, isAvailableRefreshToken } = await getRefreshData(accessToken);
  if (!isAvailableRefreshToken) {
    return getGuestTokenWithData();
  }
  return {
    accessToken: refreshedAccessToken,
    isGuest,
  };
};

export const getWebviewProductDetailServerSideProps: GetServerSideProps = async (context) => {
  const headerAccessToken = getWebViewInjectedAccessToken(context);
  const userAgent = context.req.headers['user-agent'];
  const productCode = get(context, 'params.productCode');
  try {
    const { accessToken } = await getValidAccessToken(headerAccessToken);
    const productProps = {
      productCode: Number(productCode),
      accessToken,
      isInternal: true,
      userAgent,
    };
    const product = await getProductDetail(productProps);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      props: {
        product: null,
      },
    };
  }
};
