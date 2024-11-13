import styled from '@emotion/styled';
import { head, isEmpty, isEqual, isUndefined } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { useCollectionFilter } from '../../hook/useCollectionFilter';
import { useCollection } from '../../hook/useCollection';
import { useCollectionListPageQueryParams } from '../../hook/useCollectionsPageQueryParams';
import Banner from '../../../m/components/Banner';
import useInfiniteProductList from '../../../hook/useInfiniteProductList';
import { useAppSelector } from '../../../../../shared/store';
import CircleThumbCollections from '../../../m/components/CircleThumbCollections';
import { amplitudeService } from '../../../../../shared/amplitude';
import { SelectCollectionBanner, SelectCollectionMenu } from '../../../../../shared/amplitude/events';
import Loading from '../../../../../shared/components/Loading/Loading';
import { useCollectionGroups } from '../../hook/useCollectionGroups';
import getValidatedFiltersAndUrlFilters from '../../../shared/util/getValidatedFiltersAndUrlFilters';
import ProductList from '../../../../list/m/containers/ProductList';
import { Error as RetryError } from '../../../shared/components/Error';
import { ProductListPolicy } from '../../../m/components/ProductListPolicy';
import { ANIMATION_CHANGE_RATIO, THUMB_CHANGE_SCROLL_RANGE } from '../../constants';
import { useScroll } from '../../../../../shared/hooks';
import PullToRefreshNew from '../../../../../shared/components/PullToRefresh/m/PullToRefreshNew';
import { CollectionsVideo } from '../../components/CollectionsVideo';
import { FilterScrollPolicy } from '../../../shared/components/FilterScrollPolicy';

const ProductListContainer = styled.div<{ isChipShape: boolean }>`
  margin: 0 auto;

  & > div[class*='BannerView'] {
    position: relative;
    z-index: ${({ isChipShape }) => (isChipShape ? 0 : 2)};
  }
`;

const CollectionBannerArea = styled.div`
  padding-bottom: 7px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
`;

const MenuArea = styled.div`
  height: 44px;
`;

interface Props {
  collectionGroupsCode: string;
}

export default function CircleThumbCollectionListContainer({ collectionGroupsCode }: Props) {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const {
    status: collectionGroupStatus,
    refetch: refetchCollectionGroups,
    collectionGroups,
  } = useCollectionGroups({ collectionGroupsCode });
  const { isReady, query, replace: routerReplace } = useRouter();
  const { filters: activeFilter, site, collection } = useCollectionListPageQueryParams();
  const {
    data: collectionData,
    status: collectionStatus,
    isDesignKindNumber,
  } = useCollection({ collectionName: collection });
  const {
    status: productListQueryStatus,
    refetch: refetchProductList,
    totalProductsCount,
  } = useInfiniteProductList({
    section: 'collections',
    code: collection,
    defaultSortType: collectionData?.defaultSortType || '',
    enabledCondition: isReady && hasSession && !!collection,
  });
  const { data: filterData } = useCollectionFilter({
    collectionName: collection,
    productListQueryStatus,
  });
  const isValidStatus = collectionStatus === 'success' && productListQueryStatus === 'success';
  const { scrollY } = useScroll();
  const isChipShape = scrollY > THUMB_CHANGE_SCROLL_RANGE * ANIMATION_CHANGE_RATIO + 0.1;
  const collectionBanner = collectionData?.banner;
  const collectionVideo = head(collectionData?.videos ?? []);
  const bannerVisible = isValidStatus && !!collectionData && !isUndefined(collectionBanner) && !!totalProductsCount;
  const videoVisible = isValidStatus && !!collectionData && !!collectionVideo && !!totalProductsCount;
  const productListWrapperRef = useRef<HTMLDivElement>(null);
  const getScrollPositionOnFilterChange = useCallback(() => {
    return productListWrapperRef.current?.offsetTop || 0;
  }, []);

  const handlePageChange = useCallback(
    (groupCode: string) => {
      void routerReplace(
        {
          query: {
            ...query,
            filters: null,
            ...(groupCode && { collection: groupCode }),
            ...(site === 'BEAUTY' && { site: 'beauty' }),
          },
        },
        undefined,
      );
    },
    [routerReplace, query, site],
  );

  const handleClickBanner = (url: string) => {
    amplitudeService.logEvent(
      new SelectCollectionBanner({
        url,
        groupCollectionId: collectionGroupsCode,
        selectCode: collection,
        groups: collectionGroups,
      }),
    );
  };

  const handleRefresh = useCallback(async () => {
    refetchProductList();
  }, [refetchProductList]);

  const handleMenuAmplitude = (groupCode: string) => {
    amplitudeService.logEvent(
      new SelectCollectionMenu({
        groupCode,
      }),
    );
  };

  useEffect(() => {
    if (collection || isEmpty(collectionGroups)) {
      return;
    }

    const groupFirstCode = head(collectionGroups);

    if (groupFirstCode) {
      handlePageChange(groupFirstCode.code);
    }
  }, [collectionGroups, collection, handlePageChange]);

  useEffect(() => {
    if (isEmpty(filterData) || !filterData) {
      return;
    }

    const { validatedFilters, urlFilters } = getValidatedFiltersAndUrlFilters({ activeFilter, filterData });

    if (!isEqual(urlFilters, validatedFilters)) {
      void routerReplace(
        {
          query: {
            ...query,
            filters: validatedFilters.join('|'),
          },
        },
        undefined,
      );
    }
  }, [routerReplace, activeFilter, filterData, query]);

  return isReady && hasSession ? (
    <>
      {collectionGroupStatus === 'success' && !isEmpty(collectionGroups) && <MenuArea />}
      {collectionGroupStatus === 'success' && isEmpty(collectionGroups) ? (
        <RetryError onRetry={refetchCollectionGroups} />
      ) : (
        <PullToRefreshNew onRefresh={handleRefresh}>
          <>
            <CircleThumbCollections
              code={collection}
              groups={collectionGroups}
              isChipShape={isChipShape}
              onAmplitude={handleMenuAmplitude}
              onPageChange={handlePageChange}
            />
            <ProductListPolicy code={collectionGroupsCode} type="collection-groups">
              <ProductListPolicy code={collection} type="collection">
                <ProductListContainer isChipShape={isChipShape}>
                  {bannerVisible || videoVisible ? (
                    <CollectionBannerArea>
                      {bannerVisible ? (
                        <Banner banner={collectionBanner ?? []} site={site} onClickBanner={handleClickBanner} />
                      ) : null}
                      {videoVisible ? (
                        <CollectionsVideo
                          key={collection}
                          videoSrc={collectionVideo?.videoUrl ?? ''}
                          thumbnailSrc={collectionVideo?.videoThumbnailUrl ?? ''}
                        />
                      ) : null}
                    </CollectionBannerArea>
                  ) : null}

                  <Wrapper ref={productListWrapperRef}>
                    <FilterScrollPolicy offsetGetter={getScrollPositionOnFilterChange}>
                      {isValidStatus && !!collectionData ? (
                        <ProductList
                          data={collectionData}
                          section="collections"
                          code={collection}
                          filterData={filterData}
                          extraHeight={8}
                          isCollectionGroup
                          isDesignKindNumber={isDesignKindNumber}
                        />
                      ) : productListQueryStatus === 'error' ? (
                        <RetryError onRetry={refetchProductList} />
                      ) : null}
                    </FilterScrollPolicy>
                  </Wrapper>
                </ProductListContainer>
              </ProductListPolicy>
            </ProductListPolicy>
          </>
        </PullToRefreshNew>
      )}
    </>
  ) : (
    <Loading />
  );
}
