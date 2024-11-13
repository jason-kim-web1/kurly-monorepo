import { isEmpty } from 'lodash';

import styled from '@emotion/styled';

import { ProductInquiryPostComment } from '../types';

import InquiryBoardItemQuestion from './InquiryBoardItemQuestion';
import InquiryBoardItemAnswer from './InquiryBoardItemAnswer';
import COLOR from '../../../../shared/constant/colorset';

const Container = styled.tr`
  background-color: ${COLOR.kurlyGray100};
  border-bottom: 1px solid ${COLOR.bg};
  max-width: 100px;
`;

interface Props {
  postId: number;
  contents: string;
  comments: ProductInquiryPostComment[];
  isMyPost: boolean;
}

export default function InquiryBoardPostItemContents({ postId, contents, comments, isMyPost }: Props) {
  return (
    <Container>
      <td colSpan={4}>
        <InquiryBoardItemQuestion
          postId={postId}
          content={contents}
          isComplete={!isEmpty(comments)}
          isMyPost={isMyPost}
        />
        {comments.map((comment) => (
          <InquiryBoardItemAnswer key={comment.id} content={comment.contents} createdDate={comment.createdAt} />
        ))}
      </td>
    </Container>
  );
}
