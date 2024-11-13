import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Header from '../../src/header/components/Header';
import Footer from '../../src/footer/components/Footer';

import { useAppSelector } from '../../src/shared/store';
import ScrollEventTopButton from '../../src/shared/components/Scroll/ScrollEventTopButton';
import MainSiteProvider from '../../src/main/components/shared/MainSiteProvider';
import CollectionListContainer from '../../src/product/list/collections/pc/containers/CollectionListContainer';
import { useCollectionListPageQueryParams } from '../../src/product/list/collections/hook/useCollectionsPageQueryParams';

import { ListPageSkeleton } from '../../src/product/list/pc/components/ListPageSkeleton';

import { setQueryId } from '../../src/product/list/slice';
import { productListSetScreenName } from '../../src/product/list/shared/util/productListSetScreenName';
import { ProductListPolicy } from '../../src/product/list/pc/components/ProductListPolicy';

const FloatingNavigator = dynamic(() => import('../../src/navigator/components/FloatingNavigator'), { ssr: false });

const Container = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 80px;
`;

export default function CollectionList() {
  const { hasSession } = useAppSelector(({ auth }) => auth);
  const { isReady } = useRouter();
  const { site, collectionName, filters: urlBasedFilter } = useCollectionListPageQueryParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    dispatch(setQueryId(null));
    productListSetScreenName(collectionName, 'collections');
  }, [collectionName, urlBasedFilter, dispatch, isReady]);

  return (
    <MainSiteProvider site={site}>
      <Header />
      <Container>
        <ScrollEventTopButton>
          {isReady && hasSession ? (
            <ProductListPolicy code={collectionName} type="collection">
              <CollectionListContainer collectionName={collectionName} />
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
