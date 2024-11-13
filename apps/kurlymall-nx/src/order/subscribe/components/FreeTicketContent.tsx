import styled from '@emotion/styled';

import { KurlyMembersFreeTicket } from '../interfaces/KurlyMembersProduct.interface';
import COLOR from '../../../shared/constant/colorset';
import { isPC } from '../../../../util/window/getDevice';

const Wrapper = styled.div`
  display: flex;
  padding-bottom: 16px;
  border-bottom: 1px solid ${COLOR.bgLightGray};
`;

const MembersIcon = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  color: ${COLOR.kurlyWhite};
  flex-direction: column;
  font-weight: ${isPC ? 500 : 600};
  line-height: 18px;
  letter-spacting: -0.3px;

  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 99px;
  background-color: ${COLOR.kurlymembers};
  margin-right: 12px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: ${isPC ? 500 : 600};
  line-height: 21px;
  color: ${COLOR.kurlyGray800};
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 16px;
  color: ${COLOR.kurlyGray500};
  margin-top: 5px;
`;

export default function FreeTicketContent({ freeTicket }: { freeTicket: KurlyMembersFreeTicket }) {
  const { name, expiredAt } = freeTicket;

  return (
    <Wrapper>
      <MembersIcon>멤버스</MembersIcon>
      <div>
        <Title>{name}</Title>
        <Description>{expiredAt}까지 무료이용권 사용가능</Description>
      </div>
    </Wrapper>
  );
}
