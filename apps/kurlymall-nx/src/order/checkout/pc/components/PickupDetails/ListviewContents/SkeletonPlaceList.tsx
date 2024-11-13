import styled from '@emotion/styled';

import SkeletonLoading from '../../../../../../shared/components/Loading/SkeletonLoading';
import CheckboxIcon from '../../../../../../shared/components/Input/CheckboxIcon';

const ListWrapper = styled.div`
  padding: 16px 30px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;

  div + div {
    margin-top: 6px;
  }

  + div {
    padding-top: 57px;
  }
`;

const SkeletonLoadingWrapper = styled.div`
  padding-left: 12px;
  width: 100%;
`;

function SkeletonItem() {
  return (
    <ItemWrapper>
      <CheckboxIcon checked={false} />
      <SkeletonLoadingWrapper>
        <SkeletonLoading width={172} height={21} />
        <SkeletonLoading height={19} />
      </SkeletonLoadingWrapper>
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
    </ListWrapper>
  );
}
