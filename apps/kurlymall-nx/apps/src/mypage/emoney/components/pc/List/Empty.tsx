import styled from '@emotion/styled';

const Container = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 400;
  color: #757575;
`;

const Empty = () => <Container>적립금 내역이 존재하지 않습니다.</Container>;

export default Empty;
