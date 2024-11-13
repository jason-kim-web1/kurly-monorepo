import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  button {
    padding: 0 8px;
    font-size: 14px;
    color: ${COLOR.kurlyGray450};
  }
`;

const Bar = styled.span`
  width: 1px;
  height: 12px;
  margin: 4px 0;
  background-color: ${COLOR.kurlyGray250};
`;

interface Props {
  onClickDelete(): void;
  onClickEdit(): void;
}

export default function ProductInquiryListItemFunctions({ onClickDelete, onClickEdit }: Props) {
  return (
    <Container>
      <button type="button" onClick={onClickEdit}>
        수정
      </button>
      <Bar />
      <button type="button" onClick={onClickDelete}>
        삭제
      </button>
    </Container>
  );
}
