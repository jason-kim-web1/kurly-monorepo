import styled from '@emotion/styled';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

const Wrapper = styled.div`
  display: flex;
  padding: 20px 0;

  div ~ div {
    margin-left: 30px;
  }
`;

const PersonalCustomsCodeSkeleton = () => {
  return (
    <Wrapper>
      <SkeletonLoading width={160} height={20} />
      <SkeletonLoading width={860} height={20} />
    </Wrapper>
  );
};

export default PersonalCustomsCodeSkeleton;
