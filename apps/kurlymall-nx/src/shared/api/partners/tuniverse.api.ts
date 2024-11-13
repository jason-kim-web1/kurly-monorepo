import { AxiosError } from 'axios';

import httpClient from '../../configs/http-client';

const prefix = '/member/proxy/membership/v1/subscriptions';

type SktSubscribeRequest = {
  productCd: string;
  svcMgmtNum: string;
  subsProdId: string;
  benefitOptionId: number | null;
};

export const postSktSubscribe = async ({ productCd, svcMgmtNum, subsProdId, benefitOptionId }: SktSubscribeRequest) => {
  try {
    const { data } = await httpClient.post(`${prefix}/partners/skt/subscribe`, {
      productCd,
      svcMgmtNum,
      subsProdId,
      benefitOptionId,
    });

    return data;
  } catch (err) {
    console.error(err);

    throw err as AxiosError;
  }
};
