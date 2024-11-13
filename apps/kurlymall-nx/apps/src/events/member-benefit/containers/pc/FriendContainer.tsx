import styled from '@emotion/styled';

import MemberBenefitNav from '../../components/pc/MemberBenefitNav';
import FriendBenefit from '../../components/pc/FriendBenefit';
import Loading from '../../../../shared/components/Loading/Loading';
import { useFriendBenefitInfo } from '../../hooks/useFriendBenefitQuery';

const Container = styled.div`
  min-width: 1050px;
  padding-bottom: 100px;
`;

export default function FriendContainer() {
  const { isLoading, friendBenefitInfo, isDefaultEvent } = useFriendBenefitInfo();

  if (isLoading || !friendBenefitInfo) {
    return <Loading />;
  }

  return (
    <Container>
      <MemberBenefitNav />
      <FriendBenefit isDefaultEvent={isDefaultEvent} friendBenefitInfo={friendBenefitInfo} />
    </Container>
  );
}
