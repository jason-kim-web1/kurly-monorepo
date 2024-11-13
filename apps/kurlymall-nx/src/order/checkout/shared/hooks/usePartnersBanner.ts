import { MemberShipList } from '../../../../shared/interfaces';

type PartnersCode = 'LOREAL';

const PARTNERS_CODE: Record<PartnersCode, string> = {
  LOREAL: 'loreal',
};

export const useLorealBanner = ({ memberships }: { memberships: MemberShipList }) => {
  const lorealProducts = memberships.find((membership) => membership.code === PARTNERS_CODE.LOREAL);

  return {
    disabledBanner: lorealProducts?.containsAllBrands ?? true,
    membership: lorealProducts,
  };
};
