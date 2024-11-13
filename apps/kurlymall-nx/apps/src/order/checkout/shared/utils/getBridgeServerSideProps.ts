import { get } from 'lodash';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parse } from 'qs';
import getRawBody from 'raw-body';

import { VendorCode } from '../../../shared/shared/interfaces';
import { encodeQueryString } from '../../../../shared/utils/querystring-encoder';

export const getBridgeServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const vendor = (get(context, 'params.vendor') ?? null) as VendorCode;

  const { req, query } = context;
  try {
    const body = await getRawBody(req as any, { limit: '1mb', encoding: 'UTF-8' });
    const result: any = parse(body.toString());

    if (result) {
      return {
        props: {
          vendor,
          bodyResult: result,
          queryResult: encodeQueryString((query as { [key: string]: string | number }) ?? {}),
        },
      };
    }
  } catch (err: any) {
    return {
      props: {
        vendor,
      },
    };
  }

  return {
    props: {
      vendor,
    },
  };
};
