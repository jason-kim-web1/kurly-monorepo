import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLOR.kurlyWhite};
  background: rgba(0, 0, 0, 0.15);
  z-index: 10;
`;

interface Props {
  currentIndex: number;
  totalLength: number;
  className?: string;
}

export default function SwiperIndexIndicator({ currentIndex, totalLength, className }: Props) {
  return <Container className={className}>{`${currentIndex + 1} / ${totalLength}`}</Container>;
}
