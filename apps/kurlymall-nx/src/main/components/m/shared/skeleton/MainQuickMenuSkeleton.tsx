import React from 'react';
import styled from '@emotion/styled';

import { eq } from 'lodash';

import Repeat from '../../../../../shared/components/Repeat';
import COLOR from '../../../../../shared/constant/colorset';
import { useAppSelector } from '../../../../../shared/store';

const Container = styled.div`
  margin-bottom: 4px;
`;

const List = styled.div`
  display: flex;
  padding: 0 12px;
`;

const MarketSkeletonList = styled(List)`
  margin-bottom: 4px;
  justify-content: space-between;
`;

const Item = styled.div`
  padding: 4px 3px;
  width: 66px;
  height: 72px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const ThumbnailWrapper = styled(SkeletonItem)`
  width: 44px;
  height: 44px;
  border-radius: 16px;
`;

const TextLine = styled(SkeletonItem)`
  width: 60px;
  height: 14px;
  border-radius: 3px;
`;

const Space = styled.div`
  height: 6px;
`;

const QuickMenuSkeletonItem = () => (
  <Item>
    <ThumbnailWrapper />
    <Space />
    <TextLine />
  </Item>
);
const MainQuickMenuSkeleton = () => {
  const { site } = useAppSelector(({ main }) => main);
  const isBeautySite = eq(site, 'BEAUTY');

  return (
    <Container>
      {isBeautySite ? (
        <List>
          <Repeat count={6}>
            <QuickMenuSkeletonItem />
          </Repeat>
        </List>
      ) : (
        <Repeat count={2}>
          <MarketSkeletonList>
            <Repeat count={5}>
              <QuickMenuSkeletonItem />
            </Repeat>
          </MarketSkeletonList>
        </Repeat>
      )}
    </Container>
  );
};

export default MainQuickMenuSkeleton;
