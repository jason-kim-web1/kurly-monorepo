import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../../../../shared/constant/colorset';
import { isPC } from '../../../../../../util/window/getDevice';
import { CollectionListSkeleton } from './CollectionListSkeleton';
import { ProductListSkeleton } from './ProductListSkeleton';
import { ButtonSkeleton } from './ButtonSkeleton';

const Container = styled.div`
  padding: ${isPC ? '24px 0' : ''};
`;

const SectionHeader = styled.div`
  padding: 0 16px;
  margin-bottom: 28px;
  display: flex;
  justify-content: space-between;
`;

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const TitleWrapper = styled.div`
  width: 100%;

  ${isPC &&
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
  `}
`;

const Title = styled(SkeletonItem)`
  width: ${isPC ? '180px' : '192px'};
  height: ${isPC ? '32px' : '22px'};
`;

const SubTitle = styled(SkeletonItem)`
  width: ${isPC ? '314px' : '96px'};
  height: ${isPC ? '23px' : '18px'};
  margin-top: 4px;
`;

const GroupCollectionNumberSkeleton = () => {
  return (
    <Container>
      <SectionHeader>
        <TitleWrapper>
          <Title />
          <SubTitle />
        </TitleWrapper>
      </SectionHeader>
      <CollectionListSkeleton />
      <ProductListSkeleton />
      <ButtonSkeleton />
    </Container>
  );
};

export { GroupCollectionNumberSkeleton };
