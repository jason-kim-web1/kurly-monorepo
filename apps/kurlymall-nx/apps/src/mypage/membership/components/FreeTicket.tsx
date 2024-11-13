import { isEmpty } from 'lodash';

import styled from '@emotion/styled';

import { RoundSection, BenefitTitle } from '../shared/styled';
import { useAppSelector } from '../../../shared/store';
import FreeTicketItem from './FreeTicketItem';

const FreeTicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
`;

export default function FreeTicket() {
  const { usingFreeTicket, unusedFreeTickets } = useAppSelector(({ myMembership }) => ({
    usingFreeTicket: myMembership.usingFreeTicket,
    unusedFreeTickets: myMembership.unusedFreeTickets,
  }));

  if (isEmpty(usingFreeTicket) && isEmpty(unusedFreeTickets)) {
    return null;
  }

  return (
    <RoundSection>
      <BenefitTitle className="border">이용권 이용 현황</BenefitTitle>
      <FreeTicketList>
        {usingFreeTicket && <FreeTicketItem {...usingFreeTicket} />}
        {unusedFreeTickets?.map(({ id, name, createdAt, expiredAt, status }) => (
          <FreeTicketItem key={id} name={name} startedAt={createdAt} endedAt={expiredAt} status={status} />
        ))}
      </FreeTicketList>
    </RoundSection>
  );
}
