import styled from '@emotion/styled';

import { ProductInquiryPostItem } from '../types';
import COLOR from '../../../../shared/constant/colorset';
import RawHTML from '../../../../shared/components/layouts/RawHTML';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  min-height: 38px;
`;

const Chip = styled.span`
  border-radius: 4px;
  margin-right: 8px;
  width: 30px;
  padding: 4px 6px;
  font-size: 10px;
  font-weight: 600;
  color: ${COLOR.kurlyGray800};
  background-color: rgba(102, 102, 102, 0.06);
  word-break: keep-all;
`;

const Subject = styled.span`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NoticeContents = styled.div`
  padding: 20px;
  background-color: ${COLOR.bg};
`;

interface Props {
  item: ProductInquiryPostItem;
  onClick(): void;
}

export default function ProductInquiryListNoticeItem({ item, onClick }: Props) {
  const { subject, contents, expanded } = item;

  return (
    <>
      <Container onClick={onClick}>
        <Chip>공지</Chip>
        <Subject>{subject}</Subject>
      </Container>
      {expanded && (
        <NoticeContents>
          <RawHTML html={contents} />
        </NoticeContents>
      )}
    </>
  );
}
