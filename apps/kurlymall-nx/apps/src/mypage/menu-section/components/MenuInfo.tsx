import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../shared/constant/colorset';

import { Menu } from '../interfaces';
import { MenuTitleTextMap } from '../constants';
import NewBadge from '../../../shared/icons/NewBadge';
import { useMenuAmplitude } from '../../info-section/hooks/useMenuAmplitude';
import { isPC } from '../../../../util/window/getDevice';

const MenuLink = styled.a<{ isKurlyPass: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: ${isPC ? '100%' : '50%'};
  padding: 12px 0;
  font-weight: ${isPC ? 500 : 600};
  cursor: pointer;

  ${({ isKurlyPass }) =>
    isKurlyPass &&
    css`
      flex-direction: row;
      align-items: center;

      > div:nth-of-type(2) {
        margin: 0 0 0 6px;
        font-weight: 400;
        font-size: 16px;
        color: ${COLOR.kurlyGray450};
      }
    `};

  @media (max-width: 320px) {
    width: 100%;

    ${({ isKurlyPass }) =>
      isKurlyPass &&
      css`
        justify-content: space-between;
      `};
  }
`;

const InfoTitle = styled.div<{ isActive: boolean }>`
  font-size: 16px;
  line-height: 22px;
  color: ${COLOR.kurlyGray800};
  white-space: nowrap;

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${COLOR.kurlyPurple};
    `}

  > svg {
    margin: 4px 0 0 4px;
    vertical-align: top;
  }
`;

const InfoText = styled.div`
  margin-top: 4px;
  color: ${COLOR.loversLavender};
  line-height: 20px;
`;

export default function MenuInfo({
  title,
  text,
  badge,
  link = '',
  isKurlyPayFailure,
  isActive,
}: Menu & { isKurlyPayFailure?: boolean; isActive: boolean }) {
  const { handleClickLink } = useMenuAmplitude();

  return (
    <MenuLink
      onClick={() => handleClickLink(title, link, isKurlyPayFailure)}
      isKurlyPass={title === MenuTitleTextMap.kurlypass}
    >
      <InfoTitle isActive={isActive}>
        {title}
        {badge && <NewBadge />}
      </InfoTitle>
      {text && <InfoText>{text}</InfoText>}
    </MenuLink>
  );
}
