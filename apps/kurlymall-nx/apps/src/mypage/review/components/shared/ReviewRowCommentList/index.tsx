import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { getFormattedDate } from '../../../../../shared/utils/date';
import ReviewTextContent from '../ReviewTextContent';
import COLOR from '../../../../../shared/constant/colorset';
import { clamp5x5C5f0080 } from '../../../../../shared/images';
import { isPC } from '../../../../../../util/window/getDevice';

const ReviewRowCommentWrapper = styled.div`
  margin-top: 10px;
  padding: ${isPC ? '16px 20px' : '16px'};
  width: 100%;
  background-color: ${COLOR.bgLightGray};
  border-radius: 6px;
`;

const ReviewCommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${isPC ? '10px' : '6px'};
`;

const ReviewCommentOwnerName = styled.span`
  position: relative;
  font-weight: 700;
  font-size: ${isPC ? '14px' : '12px'};
  line-height: 19px;
  color: ${COLOR.loversLavender};
  padding-left: 10px;

  :before {
    position: absolute;
    left: 0;
    top: 3px;
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: url(${clamp5x5C5f0080}) no-repeat 50% 50%;
  }
`;

const ReviewCommentRegisteredDate = styled.time`
  font-weight: 400;
  font-size: ${isPC ? '14px' : '12px'};
  line-height: 19px;
  color: ${COLOR.kurlyGray450};
`;

interface Props {
  comments: {
    ownerName: string;
    contents: string;
    registeredAt: string;
  }[];
}

export default function ReviewRowCommentList({ comments }: Props) {
  if (isEmpty(comments)) {
    return null;
  }
  return (
    <>
      {comments.map(({ ownerName, contents, registeredAt }, index) => (
        <ReviewRowCommentWrapper key={`review-comment-${index}`}>
          <ReviewCommentHeader>
            <ReviewCommentOwnerName>{ownerName}</ReviewCommentOwnerName>
            <ReviewCommentRegisteredDate dateTime={registeredAt}>
              {getFormattedDate(Date.parse(registeredAt))}
            </ReviewCommentRegisteredDate>
          </ReviewCommentHeader>
          <ReviewTextContent content={contents} />
        </ReviewRowCommentWrapper>
      ))}
    </>
  );
}
