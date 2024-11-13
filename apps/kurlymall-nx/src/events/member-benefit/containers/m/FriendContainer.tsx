import MemberBenefitNav from '../../components/m/MemberBenefitNav';
import { useFriendBenefitInfo } from '../../hooks/useFriendBenefitQuery';
import Loading from '../../../../shared/components/Loading/Loading';
import FriendBenefit from '../../components/m/FriendBenefit';

export default function FriendContainer() {
  const { isLoading, friendBenefitInfo, isDefaultEvent } = useFriendBenefitInfo();

  if (isLoading || !friendBenefitInfo) {
    return <Loading />;
  }

  return (
    <>
      <MemberBenefitNav />
      <FriendBenefit isDefaultEvent={isDefaultEvent} friendBenefitInfo={friendBenefitInfo} />
    </>
  );
}
