import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR.kurlyGray450};
`;

// TODO: 오류 일 경우 다시 요청할 수 있도록 초기화 버튼 노출
const Error = () => <Container>오류가 발생했습니다.</Container>;

export default Error;
