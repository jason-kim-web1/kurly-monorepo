import { css } from '@emotion/react';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

export default function ReviewModalPostSkeleton() {
  return (
    <div>
      <div
        css={css`
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 4px;
          margin-bottom: 17px;
        `}
      >
        <SkeletonLoading width={38} height={18} />
        <SkeletonLoading width={38} height={18} />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
          gap: 4px;
          margin-bottom: 10px;
        `}
      >
        <SkeletonLoading width={180} height={12} />
        <SkeletonLoading width={210} height={12} />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
          gap: 2px;
        `}
      >
        <SkeletonLoading width={343} height={14} />
        <SkeletonLoading width={343} height={14} />
        <SkeletonLoading width={240} height={14} />
      </div>
    </div>
  );
}
