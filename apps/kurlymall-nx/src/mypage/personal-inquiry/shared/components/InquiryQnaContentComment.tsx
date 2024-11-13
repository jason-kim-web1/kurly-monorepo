import styled from '@emotion/styled';

import InquiryQnaContent from '../../list/component/mo/InquiryQnaContent';
import { UserInquiryContentCommentResponseData } from '../../list/types';

const Container = styled.div`
  padding-top: 20px;
  > div {
    margin-top: 0;
  }
`;

interface Props {
  comment: UserInquiryContentCommentResponseData;
}

export default function InquiryQnaContentComment({ comment }: Props) {
  return (
    <Container>
      <InquiryQnaContent type="ANSWER" text={comment.contents} date={comment.createdDateTime} />
    </Container>
  );
}
