import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../shared/constant/colorset';

import ScreenOut from '../../../shared/components/Pagination/ScreenOut';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import Close from '../../../shared/icons/Close';
import useTopBanner from '../../hooks/useTopBanner';

const Wrapper = styled.div<{ visible: boolean; isLoggedIn: boolean }>`
  text-align: center;
  transition: margin 0.4s linear;
  ${({ visible }) => !visible && 'margin-top: -42px'};
  ${({ isLoggedIn }) =>
    isLoggedIn
      ? css`
          background-color: ${COLOR.kurlyWhite};
          border-bottom: 1px solid ${COLOR.bg};
        `
      : css`
          background-color: ${COLOR.kurlyPurple};
        `};
`;

const Inner = styled.div`
  position: relative;
  width: 1050px;
  margin: 0 auto;
`;

const Link = styled.a<{ isLoggedIn: boolean }>`
  display: block;
  font-size: 14px;
  line-height: 42px;
  color: ${({ isLoggedIn }) => (isLoggedIn ? COLOR.kurlyGray800 : COLOR.kurlyWhite)};
  height: 42px;
  b {
    ${({ isLoggedIn }) =>
      isLoggedIn &&
      css`
        color: ${COLOR.kurlyPurple};
      `};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 42px;
  height: 42px;
`;

interface Props {
  visible: boolean;
  loggedIn: boolean;
  title?: string;
  link: string;
  onClickClose(): void;
  locationTarget: string;
}

function TopBanner({ visible = true, loggedIn = false, title, link, onClickClose, locationTarget }: Props) {
  const { handleClickBanner, handleClickClose } = useTopBanner({ onClickClose, loggedIn });
  return (
    <Wrapper visible={visible} isLoggedIn={loggedIn}>
      <Inner>
        <Link
          href={link}
          isLoggedIn={loggedIn}
          rel="noreferrer"
          target={locationTarget === 'NEW' ? '_blank' : '_self'}
          onClick={() => handleClickBanner(link)}
        >
          {title && <RawHTML html={title} />}
        </Link>
        <CloseButton type="button" onClick={handleClickClose}>
          <Close
            stroke={loggedIn ? COLOR.kurlyGray600 : 'rgba(242, 242, 242, 0.7)'}
            fill={loggedIn ? COLOR.kurlyGray600 : 'rgba(242, 242, 242, 0.7)'}
            width={20}
            height={20}
          />
          <ScreenOut>배너 하루 안보기</ScreenOut>
        </CloseButton>
      </Inner>
    </Wrapper>
  );
}

export { TopBanner };
