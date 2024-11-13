import styled from '@emotion/styled';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

const Wrapper = styled.div`
  padding: 16px 0 20px;
`;

const LoadingPersonalCustomsCode = () => {
  return (
    <Wrapper>
      <SkeletonLoading width={295} height={20} />
    </Wrapper>
  );
};

export default LoadingPersonalCustomsCode;
