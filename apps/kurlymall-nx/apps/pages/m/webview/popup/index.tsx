import styled from '@emotion/styled';

const EmptyContent = styled.p`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function PopupContentPage() {
  return <EmptyContent>팝업이 종료되었습니다. 감사합니다.</EmptyContent>;
}
