import styled from '@emotion/styled';
import { css } from '@emotion/react';

import MemberIcon from '../../../../../shared/components/icons/MemberIcon';

import { Member } from '../../../interfaces';

import COLOR from '../../../../../shared/constant/colorset';

const Ul = styled.ul`
  padding: 12px 0;
`;

const Li = styled.li`
  display: flex;
  :first-of-type > div {
    border: none;
  }
`;

const MemberWrap = styled.div`
  flex-grow: 1;
  border-top: 1px solid #eee;
`;

const MemberId = styled.div`
  padding-top: 17px;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
`;

const JoinedAt = styled.div`
  display: block;
  padding-top: 4px;
  font-size: 12px;
  color: ${COLOR.kurlyGray450};
`;

const icon = css`
  display: block;
  margin: 17px 12px 16px 0;
`;

interface Props {
  members: Member[];
}

export default function Members({ members }: Props) {
  return (
    <Ul>
      {members.map(({ memberId, joinedAt }) => (
        <Li key={memberId}>
          <MemberIcon css={icon} />
          <MemberWrap>
            <MemberId>{memberId}</MemberId>
            <JoinedAt>가입일 {joinedAt + '.'}</JoinedAt>
          </MemberWrap>
        </Li>
      ))}
    </Ul>
  );
}
