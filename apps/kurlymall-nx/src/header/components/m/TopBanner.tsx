import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import ScreenOut from '../../../shared/components/Pagination/ScreenOut';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import Close from '../../../shared/icons/Close';
import useTopBanner from '../../hooks/useTopBanner';

const Wrapper = styled.div<{ visible: boolean }>`
  position: relative;
  text-align: center;
  transition: margin 0.4s linear;
  ${({ visible }) => !visible && `margin-top: -38px`};
  background-color: ${COLOR.kurlyWhite};
`;

const Link = styled.a`
  display: block;
  font-size: 14px;
  line-height: 38px;
  height: 38px;
  color: ${COLOR.kurlyGray800};
  border-bottom: 1px solid ${COLOR.bg};

  b {
    color: ${COLOR.kurlyPurple};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 38px;
  height: 38px;
`;

interface Props {
  visible: boolean;
  loggedIn: boolean;
  title?: string;
  link: string;
  locationTarget: string;

  onClickClose(): void;
}

function TopBanner({ visible = true, loggedIn = false, title, link, onClickClose, locationTarget }: Props) {
  const { handleClickBanner, handleClickClose } = useTopBanner({
    onClickClose,
    loggedIn,
  });

  return (
    <Wrapper visible={visible}>
      <Link
        href={link}
        rel="noreferrer"
        target={locationTarget === 'NEW' ? '_blank' : '_self'}
        onClick={() => handleClickBanner(link)}
      >
        {title && <RawHTML html={title} />}
      </Link>
      <CloseButton onClick={handleClickClose} type="button">
        <Close stroke={COLOR.kurlyGray600} fill={COLOR.kurlyGray600} width={20} height={20} />
        <ScreenOut>배너 하루 안보기</ScreenOut>
      </CloseButton>
    </Wrapper>
  );
}

export { TopBanner };
