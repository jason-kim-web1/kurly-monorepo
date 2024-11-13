import styled from '@emotion/styled';
import { forwardRef, Fragment } from 'react';

import COLOR from '../../../shared/constant/colorset';
import NotiItemSkeleton from './NotiItemSkeleton';

const Container = styled.div<{ isAppending?: boolean }>`
  padding: 20px;
  ${({ isAppending }) => (isAppending ? 'padding-top: 0;margin-top: -16px;' : '')}
  background-color: ${COLOR.kurlyWhite};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 16px 0;
  background-color: ${COLOR.kurlyGray150};
`;

function SkeletonNotiList(
  {
    length,
    isAppending,
    showCategoryName,
  }: {
    length: number;
    isAppending?: boolean;
    showCategoryName?: boolean;
  },
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <Container ref={ref} isAppending={isAppending}>
      {isAppending && <Divider />}
      {Array.from({ length }).map((item, idx) => (
        <Fragment key={idx}>
          <NotiItemSkeleton showCategoryName={showCategoryName} />
          {idx < length - 1 && <Divider />}
        </Fragment>
      ))}
    </Container>
  );
}

export default forwardRef(SkeletonNotiList);
