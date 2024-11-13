import styled from '@emotion/styled';

import SkeletonLoading from '../../../../../../shared/components/Loading/SkeletonLoading';

const ListWrapper = styled.div`
  padding: 16px 20px;
`;

const ItemWrapper = styled.div`
  div + div {
    margin-top: 6px;
  }

  + div {
    padding-top: 56px;
  }
`;

function SkeletonItem() {
  return (
    <ItemWrapper>
      <SkeletonLoading width={167} height={21} />
      <SkeletonLoading height={19} />
    </ItemWrapper>
  );
}

export default function SkeletonPlaceList() {
  return (
    <ListWrapper data-testid="skeleton-place-list">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </ListWrapper>
  );
}
