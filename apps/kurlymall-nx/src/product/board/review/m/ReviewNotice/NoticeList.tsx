import { useState } from 'react';

import { useReviewNotice } from '../../hooks';
import NoticeRow from './NoticeRow';
import { NoticeListWrapper, NoticeRowHeader } from './styled-components';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

function SkeletonNoticeList() {
  return (
    <NoticeListWrapper>
      {Array.from({ length: 2 }).map((_, index) => (
        <NoticeRowHeader key={`notice-${index}`}>
          <SkeletonLoading width={30} height={20} />
          <SkeletonLoading width={160} height={20} />
        </NoticeRowHeader>
      ))}
    </NoticeListWrapper>
  );
}

export default function NoticeList() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { reviewNotices, status } = useReviewNotice();

  if (status === 'loading') {
    return <SkeletonNoticeList />;
  }

  return (
    <NoticeListWrapper>
      {status === 'success' && !!reviewNotices
        ? reviewNotices.map((notice) => (
            <NoticeRow
              key={notice.id}
              {...notice}
              isExpanded={notice.id === selectedId}
              onToggle={() => setSelectedId(notice.id !== selectedId ? notice.id : null)}
            />
          ))
        : null}
    </NoticeListWrapper>
  );
}
