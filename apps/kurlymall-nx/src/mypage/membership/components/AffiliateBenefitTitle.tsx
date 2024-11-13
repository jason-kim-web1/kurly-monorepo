import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { useAppSelector } from '../../../shared/store';
import { shortenText } from '../shared/service';
import { BenefitTitle } from '../shared/styled';

const Container = styled.div`
  margin-bottom: 16px;

  p {
    padding-top: 2px;
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    color: ${vars.color.text.$tertiary};
  }
`;

export default function AffiliateBenefitTitle() {
  const { userName, startAffiliateDate, endAffiliateDate } = useAppSelector(({ member, myMembership }) => ({
    userName: member.info?.name,
    startAffiliateDate: myMembership.startAffiliateDate,
    endAffiliateDate: myMembership.endAffiliateDate,
  }));

  return (
    <Container>
      <BenefitTitle>
        {`${shortenText(userName ?? '')}님이 주목할 만한`}
        <br />
        제휴 혜택이 있어요!
      </BenefitTitle>
      <p>{`${startAffiliateDate.substring(5)}부터 ${endAffiliateDate.substring(5)}까지 제휴 혜택 조회할 수 있어요.`}</p>
    </Container>
  );
}
