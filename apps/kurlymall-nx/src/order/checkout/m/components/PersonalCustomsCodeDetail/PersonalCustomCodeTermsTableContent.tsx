import styled from '@emotion/styled';

import { isPC } from '../../../../../../util/window/getDevice';

const Text = styled.td`
  font-size: 12px;
  line-height: 16px;
`;

const UnderLineText = styled.td`
  font-size: 15px;
  font-weight: ${isPC ? 500 : 600};
  line-height: 20px;
  text-decoration: underline;
  vertical-align: middle;
`;

export function PersonalCustomCodeTermsTableContent() {
  return (
    <tbody>
      <tr>
        <Text>개인통관고유부호</Text>
        <Text>관세청 통관 처리 필요 상품 구매 주문서 작성</Text>
        <UnderLineText>동의 철회 또는 회원 탈퇴 즉시 파기</UnderLineText>
      </tr>
    </tbody>
  );
}
