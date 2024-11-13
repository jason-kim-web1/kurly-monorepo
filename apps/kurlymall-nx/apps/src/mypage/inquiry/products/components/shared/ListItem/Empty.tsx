import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';
import { isPC } from '../../../../../../../util/window/getDevice';

const Container = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.kurlyGray400};
  height: ${isPC ? 700 : 500}px;
`;

const EmptyListItem = () => (
  <Container>
    <p>작성한 상품 문의가 없습니다.</p>
  </Container>
);

export default EmptyListItem;
