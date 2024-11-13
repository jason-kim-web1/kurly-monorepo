import styled from '@emotion/styled';

import { format } from 'date-fns';

import { ProductInquiryPostItem } from '../types';
import COLOR from '../../../../shared/constant/colorset';
import ProductInquiryListItemContents from './ProductInquiryListItemContents';
import { ListSecretBlackIcon, ListSecretIcon } from '../../../../shared/images';

const Container = styled.div<{ expanded: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 0;
  min-height: 74px;
  margin: 0 16px;
  border-bottom: 1px solid ${COLOR.bg};
  ${({ expanded }) => (expanded ? 'border: none;' : '')}
`;

const Row = styled.div`
  font-size: 13px;
  display: flex;
  color: ${COLOR.kurlyGray450};
  &.row1 {
    line-height: 20px;
    margin-bottom: 8px;
  }
  &.row2 {
    line-height: 18px;
  }
`;

const Bar = styled.span`
  width: 1px;
  height: 10px;
  margin: 3px 6px 0;
  background-color: ${COLOR.kurlyGray250};
`;

const Subject = styled.span<{ isVisible: boolean }>`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: ${({ isVisible }) => (isVisible ? COLOR.kurlyGray800 : COLOR.kurlyGray400)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Status = styled.span<{ complete: boolean }>`
  color: ${({ complete }) => (complete ? COLOR.kurlyPurple : COLOR.kurlyGray450)};
`;

const SecretIcon = styled.span<{ isMyPost: boolean }>`
  display: block;
  width: 14px;
  height: 14px;
  background: url(${({ isMyPost }) => (isMyPost ? ListSecretBlackIcon : ListSecretIcon)}) no-repeat;
  margin-left: 6px;
`;

interface Props {
  item: ProductInquiryPostItem;
  onClick(): void;
  onClickEdit(): void;
  onClickDelete(): void;
}

export default function ProductInquiryListItem({ item, onClick, onClickEdit, onClickDelete }: Props) {
  const { subject, contents, createdAt, memberName, comments, commentsCount, isSecret, expanded, isMyPost } = item;

  const isComplete = commentsCount > 0;

  const isVisible = isMyPost || !isSecret;

  return (
    <>
      <Container onClick={onClick} expanded={expanded}>
        <Row className="row1">
          <Subject isVisible={isVisible}>
            <span>{isVisible ? subject : '비밀글입니다.'}</span>
            {isSecret && <SecretIcon isMyPost={isMyPost} />}
          </Subject>
        </Row>
        <Row className="row2">
          <Status complete={isComplete}>{isComplete ? '답변완료' : '답변대기'}</Status>
          <Bar />
          <span>{memberName}</span>
          <Bar />
          <span>{format(new Date(createdAt), 'yyyy.MM.dd')}</span>
        </Row>
      </Container>
      {expanded && (
        <ProductInquiryListItemContents
          contents={contents}
          comments={comments}
          isMyPost={isMyPost}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      )}
    </>
  );
}
