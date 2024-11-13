import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

const VipBadge = styled.img<{ iconHeight?: number }>`
  display: inline-block;
  height: ${({ iconHeight }) => iconHeight}px;
  vertical-align: middle;
`;

const MembershipBadge = styled.div<{ membersIconWidth?: number; iconHeight?: number; fontSize?: number }>`
  display: inline-block;
  min-width: ${({ membersIconWidth }) => membersIconWidth}px;
  height: ${({ iconHeight }) => iconHeight}px;
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize}px;
  line-height: ${({ iconHeight }) => iconHeight}px;
  border-radius: 56px;
  background-color: ${COLOR.kurlymembers};
  color: ${COLOR.kurlyWhite};
  text-align: center;
  vertical-align: middle;
`;

interface Props {
  userGradeName: string;
  isSubscribed: boolean;
  vipName: string;
  vipIconUrl?: string;
  membersIconWidth?: number;
  iconHeight?: number;
  fontSize?: number;
}

export default function GradeBadge({
  userGradeName,
  isSubscribed,
  vipName,
  vipIconUrl,
  membersIconWidth = 54,
  iconHeight = 26,
  fontSize = 13,
}: Props) {
  if (vipName) {
    return (
      <VipBadge
        className="vip-badge"
        iconHeight={iconHeight}
        src={vipIconUrl ?? `https://res.kurly.com/images/mykurly/flag_${vipName.toLowerCase()}.png`}
        alt={vipName}
      />
    );
  }
  return isSubscribed ? (
    <MembershipBadge
      className="membership-badge"
      membersIconWidth={membersIconWidth}
      iconHeight={iconHeight}
      fontSize={fontSize}
    >
      {userGradeName}
    </MembershipBadge>
  ) : null;
}
