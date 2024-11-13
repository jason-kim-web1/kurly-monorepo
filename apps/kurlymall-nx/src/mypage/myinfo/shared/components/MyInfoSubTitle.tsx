import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { isPC } from '../../../../../util/window/getDevice';

const Title = styled.h4`
  padding-bottom: 8px;
  font-weight: 500;
  font-size: ${isPC ? '18px' : '14px'};
`;

const Text = styled.p`
  padding-bottom: ${isPC ? '20px' : '0'};
  font-size: ${isPC ? '12px' : '14px'};
  line-height: 1.5;
  color: ${COLOR.kurlyGray600};
`;

export default function MyInfoSubTitle() {
  return (
    <>
      <Title>비밀번호 재확인</Title>
      <Text>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요.</Text>
    </>
  );
}
