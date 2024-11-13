import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 12px;
  color: ${COLOR.kurlyPurple};
  transform: translateX(50%);
  font-weight: 400;
  right: 16.5%;
  bottom: 50px;
  font-size: 18px;
`;

const IndexNumber = styled.div`
  padding: 0 3px;
  font-size: 15px;
  font-weight: 600;
`;

interface Props {
  currentIndex: number;
  totalLength: number;
}

export default function SwiperIndicator({ currentIndex, totalLength }: Props) {
  return (
    <Container>
      <IndexNumber>{currentIndex + 1}</IndexNumber>/<IndexNumber>{totalLength}</IndexNumber>
    </Container>
  );
}
