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

// TODO: Retry
const ErrorListItem = () => (
  <Container>
    <p>상품 문의 정보를 불러올 수 없습니다.</p>
    <p>잠시 후 다시 시도해 주세요.</p>
  </Container>
);

export default ErrorListItem;
