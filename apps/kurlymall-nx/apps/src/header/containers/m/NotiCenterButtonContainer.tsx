import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import { NotiCenterIconBlack, NotiCenterIconWhite } from '../../../shared/images';
import { checkBadges } from '../../../shared/api/notifications';
import COLOR from '../../../shared/constant/colorset';
import { COMMON_PATH, MYPAGE_PATH } from '../../../shared/constant';
import { useAppSelector } from '../../../shared/store';

const Button = styled.button<{
  color?: string;
  badge?: boolean;
}>`
  width: 44px;
  height: 44px;
  background-image: url(${({ color }) => (color === 'black' ? NotiCenterIconBlack : NotiCenterIconWhite)});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  transition: all 0.3s ease-in-out;
  position: relative;

  ${({ badge }) =>
    badge
      ? `&:after {
    content: '';
    position: absolute;
    display: block;
    background-color: ${COLOR.pointText};
    width: 5px;
    height: 5px;
    border-radius: 2.5px;
    top: 11px;
    right: 8px;
  }`
      : ''}
`;

interface Props {
  color?: 'black' | 'white';
}

export default function NotiCenterButtonContainer({ color = 'black' }: Props) {
  const router = useRouter();

  const { hasSession, isGuest } = useAppSelector(({ auth }) => ({
    hasSession: auth.hasSession,
    isGuest: auth.isGuest,
  }));

  const { data: badge } = useQuery(['noti-badge'], checkBadges, {
    enabled: !isGuest && hasSession,
  });

  const handleClick = useCallback(() => {
    const path = isGuest
      ? `${COMMON_PATH.login.uri}?internalUrl=${encodeURIComponent(MYPAGE_PATH.notiCenter.uri)}`
      : MYPAGE_PATH.notiCenter.uri;
    router.push(path);
  }, [isGuest, router]);

  return <Button color={color} badge={badge} onClick={handleClick} />;
}
