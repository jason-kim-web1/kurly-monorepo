import { format } from 'date-fns';

import styled from '@emotion/styled';

import InquiryBoardItemContent from './InquiryBoardItemContent';
import COLOR from '../../../../shared/constant/colorset';

const CreatedDate = styled.div`
  padding: 0 16px 20px;
  margin-left: 40px;
  font-size: 14px;
  line-height: 22px;
  color: ${COLOR.kurlyGray450};
`;

interface Props {
  content: string;
  createdDate: string;
}

export default function InquiryBoardItemAnswer({ content, createdDate }: Props) {
  return (
    <InquiryBoardItemContent type="Answer" content={content}>
      <CreatedDate>{format(new Date(createdDate), 'yyyy.MM.dd')}</CreatedDate>
    </InquiryBoardItemContent>
  );
}
