import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  width: 220px;
  transform: translate(5px, 5px);
  padding: 10px;
  color: ${COLOR.kurlyPurple};
  background-color: ${COLOR.kurlyWhite};
  font-weight: 600;
  font-size: 12px;
  border-radius: 6px;
  box-sizing: border-box;
  border: 1px solid ${COLOR.lightGray};
`;

const Arrow = styled.div`
  position: absolute;
  top: -12px;
  left: 15%;
  width: 24px;
  height: 12px;
  overflow: hidden;
  &:after {
    position: absolute;
    content: '';
    width: 12px;
    height: 12px;
    left: 50%;
    transform: translate(-50%, 50%) rotate(45deg);
    background-color: ${COLOR.kurlyWhite};
    border: 1px solid ${COLOR.lightGray};
  }
`;

export default function EventTooltip() {
  return (
    <Container>
      동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내
      <Arrow />
    </Container>
  );
}
