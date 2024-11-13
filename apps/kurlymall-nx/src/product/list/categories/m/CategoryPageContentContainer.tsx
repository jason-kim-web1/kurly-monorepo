import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { useInView } from 'react-intersection-observer';

import { isEmpty } from 'lodash';

import { useAppSelector } from '../../../../shared/store';
import { useCategoriesPageQueries } from '../Context/CategoriesDataProvider';
import { useCategory } from '../hook/useCategory';
import { useSiblingCategory } from '../hook/useSiblingCategory';

import COLOR from '../../../../shared/constant/colorset';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectCategoryMenu } from '../../../../shared/amplitude/events';
import { productListSetScreenName } from '../../shared/util/productListSetScreenName';
import { setQueryId } from '../../slice';

import MainSiteProvider from '../../../../main/components/shared/MainSiteProvider';
import BackButton from '../../../../shared/components/Button/BackButton';
import HeaderButtons from '../../../../shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../shared/components/layouts/MobileHeader';
import UserMenu from '../../../../shared/components/layouts/UserMenu';
import Loading from '../../../../shared/components/Loading/Loading';
import SkeletonLoading from '../../../../shared/components/Loading/SkeletonLoading';
import CategoryListContainer from './CategoryListContainer';
import DeliveryLocationContainer from '../../../../header/containers/m/DeliveryLocationContainer';
import CartButtonContainer from '../../../../shared/containers/m/CartButtonContainer';
import Menu from '../../m/components/Menu';
import { ProductListPolicy } from '../../m/components/ProductListPolicy';

const MenuArea = styled.div`
  height: 44px;
`;

const Line = styled.div<{ isShow: boolean }>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
  background-image: linear-gradient(to top, ${COLOR.lightGray} 0%, ${COLOR.lightGray} 51%, transparent 51%);
  transition: opacity 1s;
`;

export default function CategoryPageContentContainer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname, query } = router;
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);

  const { isReady } = useRouter();
  const { site, categoryNo } = useCategoriesPageQueries();
  const { data: categoryData, status: categoryQueryStatus } = useCategory({ categoryNo });

  const [isMenuLine, setIsMenuLine] = useState(false);
  const { ref, entry } = useInView();

  const rootCategoryCode = categoryData?.rootCategory.code;

  const { data: siblingCategoriesData } = useSiblingCategory({
    categoryNo: rootCategoryCode,
    options: { enabled: !!rootCategoryCode },
  });

  const handleMenuChange = (code: string, name: string) => {
    router
      .replace({
        pathname,
        query: {
          ...query,
          categoryNo: code,
          filters: null,
          ...(site === 'BEAUTY' && { site: 'beauty' }),
        },
      })
      .then(() =>
        amplitudeService.logEvent(
          new SelectCategoryMenu({
            rootCategory: {
              code: categoryData?.rootCategory.code ?? '',
              name: categoryData?.rootCategory.name ?? '',
            },
            siblingCategory: {
              code,
              name,
            },
          }),
        ),
      );
  };

  useEffect(() => {
    if (!entry) {
      return;
    }

    setIsMenuLine(!entry.isIntersecting);
  }, [entry]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    dispatch(setQueryId(null));
    productListSetScreenName(categoryNo, 'categories');
  }, [categoryNo, dispatch, isReady]);

  return (
    <MainSiteProvider site={site}>
      <MobileHeader hideBottomLine>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle hasLocationIcon>
          {categoryQueryStatus === 'loading' ? <SkeletonLoading width={180} height={20} /> : null}
          {categoryQueryStatus === 'success' && !!categoryData ? categoryData.rootCategory.name : null}
          {categoryQueryStatus === 'error' ? '카테고리' : null}
        </HeaderTitle>
        <HeaderButtons position="right">
          <DeliveryLocationContainer />
          <CartButtonContainer />
        </HeaderButtons>
        {categoryQueryStatus === 'success' && !!categoryData ? (
          <Menu
            rootCategoryCode={rootCategoryCode ?? categoryNo}
            isShowAll={categoryData.isShowAll}
            onMenuChange={handleMenuChange}
          />
        ) : null}
        <Line isShow={isMenuLine && isEmpty(siblingCategoriesData) && !categoryData?.isShowAll} />
      </MobileHeader>
      {!isEmpty(siblingCategoriesData) || categoryData?.isShowAll ? <MenuArea /> : null}
      <div ref={ref} />
      {isReady && hasSession ? (
        <ProductListPolicy code={categoryNo} type="categories">
          <CategoryListContainer extraHeight={!isEmpty(siblingCategoriesData) || categoryData?.isShowAll ? 44 : 0} />
        </ProductListPolicy>
      ) : (
        <Loading />
      )}
      <UserMenu />
    </MainSiteProvider>
  );
}
