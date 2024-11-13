import React from 'react';

import { useQueryClient } from '@tanstack/react-query';

import styled from '@emotion/styled';

import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';

import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import { ProductCollectionGroup } from '../../../src/product/shared/components/ProductCollectionGroup';
import { ProductCollectionPolicyProvider } from '../../../src/product/shared/providers/ProductCollectionPolicyProvider';
import { productNameMapper } from '../../../src/event-benefit/beauty/utils/beauty-brand';
import { ImpressionPolicyContextProvider } from '../../../src/shared/context/ImpressionPolicyContext';
import { ProductCollectionGroupAmplitudePropertyProvider } from '../../../src/product/shared/providers/ProductCollectionGroupAmplitudePropertyProvider';
import { usePageWindowScroll } from '../../../src/shared/hooks/usePageWindowScroll';
import PullToRefreshNew from '../../../src/shared/components/PullToRefresh/m/PullToRefreshNew';
import { GNB_HEIGHT } from '../../../src/shared/constant/mobileHeaderHeight';

const Gutter = styled.div`
  height: ${GNB_HEIGHT}px;
`;

export default function EventBenefitPage() {
  useScreenName(ScreenName.BRAND_LIST);
  const queryClient = useQueryClient();
  const { restoreScrollPoint } = usePageWindowScroll();

  return (
    <MainSiteProvider site="BEAUTY">
      <Gutter />
      <ProductCollectionGroupAmplitudePropertyProvider
        sectionType={'collection_group_gallery'}
        sectionScreen={'brand_list'}
      >
        <ProductCollectionPolicyProvider mapProductName={productNameMapper}>
          <ImpressionPolicyContextProvider>
            <PullToRefreshNew onRefresh={() => queryClient.resetQueries()}>
              <ProductCollectionGroup
                code={'beauty-brand'}
                onListRendered={restoreScrollPoint}
                productCollectionGroupType={'collection_group_gallery'}
              />
            </PullToRefreshNew>
          </ImpressionPolicyContextProvider>
        </ProductCollectionPolicyProvider>
      </ProductCollectionGroupAmplitudePropertyProvider>
    </MainSiteProvider>
  );
}
