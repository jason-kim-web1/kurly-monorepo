import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { ProductInquiryPostComment } from '../types';
import ProductInquiryListItemContent from './ProductInquiryListItemContent';
import COLOR from '../../../../shared/constant/colorset';
import ProductInquiryListItemFunctions from './ProductInquiryListItemFunctions';

const Container = styled.div`
  padding: 20px 16px;
  background-color: ${COLOR.kurlyGray100};
  line-height: 20px;
`;

const CommentWrap = styled.div`
  margin-top: 20px;
`;

const FunctionsWrap = styled.div`
  margin-top: 12px;
`;

interface Props {
  contents: string;
  comments: ProductInquiryPostComment[];
  isMyPost: boolean;
  onClickEdit(): void;
  onClickDelete(): void;
}

export default function ProductInquiryListItemContents({
  contents,
  comments,
  isMyPost,
  onClickEdit,
  onClickDelete,
}: Props) {
  return (
    <Container>
      <ProductInquiryListItemContent type="QUESTION" content={contents}>
        {isMyPost && isEmpty(comments) && (
          <FunctionsWrap>
            <ProductInquiryListItemFunctions onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
          </FunctionsWrap>
        )}
      </ProductInquiryListItemContent>
      {comments.map((comment) => (
        <CommentWrap key={comment.id}>
          <ProductInquiryListItemContent type="ANSWER" content={comment.contents} />
        </CommentWrap>
      ))}
    </Container>
  );
}
