import styled from '@emotion/styled';

import Collapse from '../../../../../shared/components/Collapse/Collapse';
import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

const LoadingWrapper = styled.div`
  margin-right: 12px;
`;

export default function LoadingCollapse({ title, testId }: { title: string; testId?: string }) {
  return (
    <Collapse
      title={title}
      summary={
        <LoadingWrapper>
          <SkeletonLoading width={191} height={20} testId={testId} />
        </LoadingWrapper>
      }
      isSummaryKeepOpen
      opened={false}
      onClick={() => {}}
    />
  );
}
