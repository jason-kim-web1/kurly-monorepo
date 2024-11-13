import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  width: 100%;
  padding: 0 30px 30px;
  display: flex;
  justify-content: flex-end;
  button {
    position: relative;
    padding: 0 11px;
    font-size: 14px;
    line-height: 20px;
    border: 0;
    background: none;
    color: ${COLOR.kurlyGray450};
  }
`;

const DeleteButton = styled.button`
  ::before {
    position: absolute;
    top: 5px;
    left: 0;
    width: 1px;
    height: 12px;
    background: ${COLOR.kurlyGray200};
    vertical-align: top;
    content: '';
  }
`;

interface Props {
  onClickEdit(): void;
  onClickDelete(): void;
}

export default function InquiryBoardItemFunctions({ onClickEdit, onClickDelete }: Props) {
  return (
    <Container>
      <button type="button" onClick={onClickEdit}>
        수정
      </button>
      <DeleteButton type="button" onClick={onClickDelete}>
        삭제
      </DeleteButton>
    </Container>
  );
}
