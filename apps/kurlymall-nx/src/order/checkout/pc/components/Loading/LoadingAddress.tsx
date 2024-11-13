import styled from '@emotion/styled';

import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';
import COLOR from '../../../../../shared/constant/colorset';

const Wrapper = styled.div`
  display: flex;
  padding: 20px 0;
  > div:first-of-type {
    margin-right: 30px;
  }
`;

const css = {
  borderTop: `1px solid ${COLOR.bg}`,
};

export default function LoadingAddress() {
  return (
    <>
      <Wrapper>
        <SkeletonLoading width={160} height={20} />
        <SkeletonLoading width={860} height={20} />
      </Wrapper>
      <Wrapper css={css}>
        <SkeletonLoading width={160} height={20} />
        <SkeletonLoading width={860} height={20} />
      </Wrapper>
    </>
  );
}
