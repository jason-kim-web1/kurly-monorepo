import styled from '@emotion/styled';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

const Wrapper = styled.div`
  padding: 12px 0;
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  > div:first-of-type {
    margin-right: 30px;
  }
`;

export default function LoadingOrderer() {
  return (
    <Wrapper>
      {Array(3)
        .fill('')
        .map((item, index) => (
          <Contents key={`kurly-${item}-${index}`}>
            <SkeletonLoading width={160} height={20} />
            <SkeletonLoading width={860} height={20} />
          </Contents>
        ))}
    </Wrapper>
  );
}
