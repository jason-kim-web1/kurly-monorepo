import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.li`
  padding-top: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR.kurlyGray450};
`;

const Empty = () => <Container>적립금 내역이 존재하지 않습니다.</Container>;

export default Empty;
