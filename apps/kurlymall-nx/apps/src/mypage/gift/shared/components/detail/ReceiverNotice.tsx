import styled from '@emotion/styled';

const Wrapper = styled.div`
  position: relative;
  padding: 20px;
  font-size: 12px;
  line-height: 16px;
  color: #666;
`;

export default function ReceiverNotice() {
  return (
    <Wrapper>
      증정 포함 상품인 경우 선물 발송 시 증정품도 함께 배송해 드리며 선물 내역에 선물 본품만 확인 가능합니다.
    </Wrapper>
  );
}
