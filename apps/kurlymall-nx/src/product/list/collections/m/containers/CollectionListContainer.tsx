import styled from '@emotion/styled';

import { head, isEmpty, isEqual, isUndefined } from 'lodash';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { useCollectionFilter } from '../../hook/useCollectionFilter';
import { useCollection } from '../../hook/useCollection';
import { useCollectionListPageQueryParams } from '../../hook/useCollectionsPageQueryParams';
import ProductList from '../../../m/containers/ProductList';

import Banner from '../../../m/components/Banner';
import useInfiniteProductList from '../../../hook/useInfiniteProductList';
import getValidatedFiltersAndUrlFilters from '../../../shared/util/getValidatedFiltersAndUrlFilters';
import { Error, ListContainer } from '../../../m/components/styled-components';
import { redirectTo } from '../../../../../shared/reducers/page';
import PullToRefreshNew from '../../../../../shared/components/PullToRefresh/m/PullToRefreshNew';
import { CollectionsVideo } from '../../components/CollectionsVideo';
import { removeQueryString } from '../../../../../shared/utils/url';
import { FilterScrollPolicy } from '../../../shared/components/FilterScrollPolicy';

const Wrapper = styled.div`
  position: relative;
  display: flex;
`;

const CollectionBannerArea = styled.div`
  padding-bottom: 7px;
`;

interface Props {
  collectionName: string;
  isCollectionGroup?: boolean;
  bannerAmplitude?: (url: string) => void;
}

export default function CollectionListContainer({ collectionName, isCollectionGroup, bannerAmplitude }: Props) {
  const { data: collectionData, status, isDesignKindNumber } = useCollection({ collectionName });
  const {
    data: productsData,
    status: productListQueryStatus,
    refetch,
  } = useInfiniteProductList({
    section: 'collections',
    code: collectionName,
    defaultSortType: collectionData?.defaultSortType || '',
  });
  const { data: filterData } = useCollectionFilter({ collectionName, productListQueryStatus });
  const { filters: activeFilter, site } = useCollectionListPageQueryParams();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { query, asPath } = router;
  const pathname = useMemo(() => removeQueryString(asPath), [asPath]);
  const totalProductsCount = productsData?.pages?.[0].meta?.pagination.total;
  const collectionBanner = collectionData?.banner;
  const bannerVisible = !isUndefined(collectionBanner) && productListQueryStatus === 'success' && !!totalProductsCount;
  const videoVisible =
    !isUndefined(head(collectionData?.videos ?? [])) && productListQueryStatus === 'success' && !!totalProductsCount;
  const video = useMemo(() => {
    return head(collectionData?.videos ?? []);
  }, [collectionData]);

  const handleClickBanner = (url: string) => {
    if (bannerAmplitude) {
      // 컬렉션그룹인경우
      bannerAmplitude(url);
      return;
    }
  };

  const handleRefresh = useCallback(async () => {
    refetch();
  }, [refetch]);

  const getScrollPositionOnFilterChange = useCallback(() => {
    return wrapperRef.current?.offsetTop || 0;
  }, []);

  useEffect(() => {
    if (isEmpty(filterData) || !filterData) {
      return;
    }
    const { validatedFilters, urlFilters } = getValidatedFiltersAndUrlFilters({ activeFilter, filterData });
    if (!isEqual(urlFilters, validatedFilters)) {
      dispatch(
        redirectTo({
          url: pathname,
          query: {
            ...query,
            filters: validatedFilters.join('|'),
          },
          replace: true,
        }),
      );
    }
  }, [activeFilter, filterData, router, dispatch, pathname, query]);

  return (
    <PullToRefreshNew onRefresh={handleRefresh}>
      <ListContainer>
        {bannerVisible || videoVisible ? (
          <CollectionBannerArea>
            {bannerVisible ? (
              <Banner banner={collectionBanner || []} site={site} onClickBanner={handleClickBanner} />
            ) : null}
            {videoVisible && video ? (
              <CollectionsVideo key={collectionName} videoSrc={video.videoUrl} thumbnailSrc={video.videoThumbnailUrl} />
            ) : null}
          </CollectionBannerArea>
        ) : null}
        <Wrapper ref={wrapperRef}>
          {status === 'success' && !!collectionData ? (
            <FilterScrollPolicy offsetGetter={getScrollPositionOnFilterChange}>
              <ProductList
                data={collectionData}
                section="collections"
                code={collectionName}
                filterData={filterData}
                isCollectionGroup={isCollectionGroup}
                isDesignKindNumber={isDesignKindNumber}
              />
            </FilterScrollPolicy>
          ) : (
            <Error />
          )}
        </Wrapper>
      </ListContainer>
    </PullToRefreshNew>
  );
}
