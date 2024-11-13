import LorealMemberShipBanner from '../../components/LorealMemberShipBanner';
import { useAppSelector } from '../../../../../shared/store';
import { useLorealBanner } from '../../hooks/usePartnersBanner';

const MemberShipBannerContainer = () => {
  const memberships = useAppSelector(({ payments }) => payments.paymentsResult.memberships);
  const { disabledBanner, membership } = useLorealBanner({ memberships });

  if (disabledBanner) {
    return null;
  }

  return <LorealMemberShipBanner membership={membership} />;
};

export default MemberShipBannerContainer;
