import { postSktSubscribe } from '../../../shared/api/partners/tuniverse.api';

const SKT_KURLY_MEMBERS_PRODUCT_ID = 'TM0001';

export const subscribeWithSkt = async (svcMgmtNum: string, subsProdId: string) => {
  await postSktSubscribe({
    productCd: SKT_KURLY_MEMBERS_PRODUCT_ID,
    svcMgmtNum,
    subsProdId,
    benefitOptionId: null,
  });
};
