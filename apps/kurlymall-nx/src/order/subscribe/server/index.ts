import { GetServerSidePropsContext } from 'next';
import getRawBody from 'raw-body';

import { parse } from 'qs';

import { CallbackResult } from '../interfaces';
import { getWebViewInjectedAccessToken } from '../../../server/webview';

export function getServerSideKurlyPayProps() {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;

    try {
      const body = await getRawBody(req, {
        encoding: 'UTF-8',
      });

      const result: CallbackResult = parse(body);
      const accessToken = getWebViewInjectedAccessToken(context);

      return {
        props: {
          accessToken,
          result: result.result ?? '',
          orderNo: result.orderNo ?? '',
          merchantMemberId: result.merchantMemberId ?? '',
          isMethodModified: result.modifyPayMethodYn ?? '',
          productCode: result.productCd ?? '',
          productName: result.productNm ?? '',
          createdTime: result.createdAt ?? '',
          errorCode: result.errorCd ?? '',
          errorMessage: result.errorMsg ?? '',
        },
      };
    } catch (err) {
      return { props: {} };
    }
  };
}
