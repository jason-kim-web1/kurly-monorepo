import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import { useCallback, useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { head, isEmpty } from 'lodash';

import { useAppSelector } from '../../src/shared/store';
import { useCollectionListPageQueryParams } from '../../src/product/list/collections/hook/useCollectionsPageQueryParams';
import { ListPageSkeleton } from '../../src/product/list/pc/components/ListPageSkeleton';
import { productListSetScreenName } from '../../src/product/list/shared/util/productListSetScreenName';
import { useCollectionGroups } from '../../src/product/list/collections/hook/useCollectionGroups';
import Header from '../../src/header/components/Header';
import Footer from '../../src/footer/components/Footer';
import ScrollEventTopButton from '../../src/shared/components/Scroll/ScrollEventTopButton';
import CollectionGroupsTopContainer from '../../src/product/list/collections/pc/containers/CollectionGroupsTopContainer';
import { Error as RetryError } from '../../src/product/list/shared/components/Error';
import MainSiteProvider from '../../src/main/components/shared/MainSiteProvider';
import { redirectTo } from '../../src/shared/reducers/page';
import CircleThumbCollectionListContainer from '../../src/product/list/collections/pc/containers/CircleThumbCollectionListContainer';
import { ProductListPolicy } from '../../src/product/list/pc/components/ProductListPolicy';

const FloatingNavigator = dynamic(() => import('../../src/navigator/components/FloatingNavigator'), { ssr: false });

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 480px;
  margin-top: 50px;
  margin-bottom: 75px;
  padding: 100px 0;
`;

export default function CollectionList() {
  const { hasSession } = useAppSelector(({ auth }) => auth);

  const dispatch = useDispatch();
  const router = useRouter();
  const { isReady, pathname, query } = router;
  const { site, filters: urlBasedFilter, collectionGroupsCode, collection } = useCollectionListPageQueryParams();

  const {
    data: groupsData,
    status: groupsStatus,
    refetch: refetchCollectionGroups,
  } = useCollectionGroups({ collectionGroupsCode });
  const collectionGroups = useMemo(() => (groupsData ? groupsData.collections : []), [groupsData]);
  const handlePageChange = useCallback(
    (groupCode: string) => {
      dispatch(
        redirectTo({
          url: pathname,
          query: {
            ...query,
            page: 1,
            ...(groupCode && { collection: groupCode }),
            ...(site === 'BEAUTY' && { site: 'beauty' }),
          },
          replace: true,
        }),
      );
    },
    [pathname, query, site, dispatch],
  );

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
    if (!isReady) {
      return;
    }

    productListSetScreenName(collectionGroupsCode, 'collections');
  }, [collectionGroupsCode, urlBasedFilter, dispatch, isReady]);

  return (
    <MainSiteProvider site={site}>
      <Header />
      <Container>
        <ScrollEventTopButton>
          {isReady && hasSession && groupsData ? (
            <CollectionGroupsTopContainer
              groupsStatus={groupsStatus}
              groupsData={groupsData}
              collectionGroupsCode={collectionGroupsCode}
              collection={collection}
              collectionGroups={collectionGroups}
            />
          ) : null}
          {groupsData && isEmpty(collectionGroups) ? (
            <ErrorWrapper>
              <RetryError onRetry={refetchCollectionGroups} />
            </ErrorWrapper>
          ) : isReady && hasSession ? (
            <ProductListPolicy code={collectionGroupsCode} type="collection-groups">
              <ProductListPolicy code={collection} type="collection">
                <CircleThumbCollectionListContainer collectionName={collection} />
              </ProductListPolicy>
            </ProductListPolicy>
          ) : (
            <ListPageSkeleton pageType="collections" />
          )}
        </ScrollEventTopButton>
        <FloatingNavigator />
      </Container>
      <Footer />
    </MainSiteProvider>
  );
}
