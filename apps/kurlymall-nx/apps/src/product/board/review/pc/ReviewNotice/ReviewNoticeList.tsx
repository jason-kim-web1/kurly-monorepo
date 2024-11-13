import styled from '@emotion/styled';
import { useState } from 'react';

import { useReviewNotice } from '../../hooks';
import ReviewNoticeRow from './ReviewNoticeRow';
import COLOR from '../../../../../shared/constant/colorset';

const Wrapper = styled.div`
  border-top: 1px solid ${COLOR.kurlyGray800};
`;
export default function ReviewNoticeList() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { reviewNotices, isSuccess } = useReviewNotice();

  return isSuccess && !!reviewNotices ? (
    <Wrapper>
      {reviewNotices.map((notice) => (
        <ReviewNoticeRow
          key={notice.id}
          isExpanded={notice.id === selectedId}
          onToggle={() => setSelectedId(selectedId !== notice.id ? notice.id : null)}
          {...notice}
        />
      ))}
    </Wrapper>
  ) : null;
}
