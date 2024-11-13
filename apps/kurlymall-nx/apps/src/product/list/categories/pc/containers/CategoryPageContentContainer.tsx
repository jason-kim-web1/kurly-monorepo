import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import { useAppSelector } from '../../../../../shared/store';
import { useCategoriesPageQueries } from '../../Context/CategoriesDataProvider';

import CategoryListContainer from './CategoryListContainer';

import Header from '../../../../../header/components/Header';
import Footer from '../../../../../footer/components/Footer';
import MainSiteProvider from '../../../../../main/components/shared/MainSiteProvider';
import { ListPageSkeleton } from '../../../pc/components/ListPageSkeleton';
import ScrollEventTopButton from '../../../../../shared/components/Scroll/ScrollEventTopButton';

import { setQueryId } from '../../../slice';

import { productListSetScreenName } from '../../../shared/util/productListSetScreenName';
import { ProductListPolicy } from '../../../pc/components/ProductListPolicy';

const FloatingNavigator = dynamic(() => import('../../../../../navigator/components/FloatingNavigator'), {
  ssr: false,
});

const Container = styled.div`
  position: relative;
  margin-bottom: 80px;
`;

export default function CategoryPageContentContainer() {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);

  const { isReady } = useRouter();
  const { site, categoryNo } = useCategoriesPageQueries();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    dispatch(setQueryId(null));
    productListSetScreenName(categoryNo, 'categories');
  }, [categoryNo, dispatch, isReady]);

  return (
    <MainSiteProvider site={site}>
      <Header />
      <Container>
        <ScrollEventTopButton>
          {isReady && hasSession ? (
            <ProductListPolicy code={categoryNo} type="categories">
              <CategoryListContainer />
            </ProductListPolicy>
          ) : (
            <ListPageSkeleton pageType="categories" />
          )}
        </ScrollEventTopButton>
        <FloatingNavigator />
      </Container>
      <Footer />
    </MainSiteProvider>
  );
}
