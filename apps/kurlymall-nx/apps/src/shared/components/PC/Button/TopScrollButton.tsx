import styled from '@emotion/styled';

import { Link } from 'react-scroll';

import { speed, zIndex } from '../../../styles';

const Container = styled.span<{ isDisplay: boolean }>`
  position: fixed;
  z-index: ${zIndex.topScrollButton};
  right: 31px;
  bottom: 0;
  width: 58px;
  height: 58px;
  opacity: 0;
  transition: opacity 0.5s;
  ${({ isDisplay }) => isDisplay && 'bottom: 25px; opacity: 1;'}
`;

const Img = styled.img`
  width: 58px;
  height: 58px;
`;

interface Props {
  isDisplay: boolean;
}

export default function TopScrollButton({ isDisplay }: Props) {
  return (
    <Container isDisplay={isDisplay}>
      <Link to="top" smooth duration={speed.scroll}>
        <Img src={'https://res.kurly.com/pc/service/common/1903/btn_pagetop_v2.png'} alt="위로가기 아이콘" />
      </Link>
    </Container>
  );
}
