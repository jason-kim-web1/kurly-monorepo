import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import { useEffect, useMemo, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../src/shared/store';

import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import { useCollectionListPageQueryParams } from '../../../src/product/list/collections/hook/useCollectionsPageQueryParams';

import MobileHeader from '../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../src/shared/components/Button/BackButton';
import DeliveryLocationContainer from '../../../src/header/containers/m/DeliveryLocationContainer';
import CartButtonContainer from '../../../src/shared/containers/m/CartButtonContainer';

import UserMenu from '../../../src/shared/components/layouts/UserMenu';
import CollectionListContainer from '../../../src/product/list/collections/m/containers/CollectionListContainer';
import { useCollection } from '../../../src/product/list/collections/hook/useCollection';
import HeaderTitle from '../../../src/shared/components/layouts/HeaderTitle';
import Loading from '../../../src/shared/components/Loading/Loading';

import COLOR from '../../../src/shared/constant/colorset';
import { setQueryId } from '../../../src/product/list/slice';
import { productListSetScreenName } from '../../../src/product/list/shared/util/productListSetScreenName';
import SkeletonLoading from '../../../src/shared/components/Loading/SkeletonLoading';
import { ProductListPolicy } from '../../../src/product/list/m/components/ProductListPolicy';
import MainCollection from '../../../src/product/list/m/containers/MainCollection';
import { useMoWebConfigContext } from '../../../src/shared/context/MoWebConfigContext';

const Line = styled.div<{ isShown: boolean }>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  opacity: ${({ isShown }) => (isShown ? 1 : 0)};
  background-image: linear-gradient(to top, ${COLOR.lightGray} 0%, ${COLOR.lightGray} 51%, transparent 51%);
  transition: opacity 1s;
`;

export default function CollectionList() {
  const dispatch = useDispatch();
  const { hasSession } = useAppSelector(({ auth }) => auth);
  const router = useRouter();
  const { isReady } = router;
  const { site, collectionName, filters: urlBasedFilter } = useCollectionListPageQueryParams();
  const { data: collectionData, status } = useCollection({ collectionName });

  const [isMenuLine, setIsMenuLine] = useState(false);
  const { ref, entry } = useInView();

  const { isHome } = useMoWebConfigContext();

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
    productListSetScreenName(collectionName, 'collections');
  }, [collectionName, urlBasedFilter, dispatch, isReady]);

  const ProductContent = useMemo(() => {
    return (
      <>
        <div ref={ref} />
        {isReady && hasSession ? (
          <ProductListPolicy code={collectionName} type="collection">
            <CollectionListContainer collectionName={collectionName} />
          </ProductListPolicy>
        ) : (
          <Loading />
        )}
      </>
    );
  }, [ref, isReady, hasSession, collectionName]);

  if (isHome) {
    return <MainCollection site={site}>{ProductContent}</MainCollection>;
  }

  return (
    <MainSiteProvider site={site}>
      <MobileHeader hideBottomLine>
        {isReady ? (
          <>
            <HeaderButtons position="left">
              <BackButton />
            </HeaderButtons>
            <HeaderTitle hasLocationIcon>
              {status === 'loading' ? <SkeletonLoading width={180} height={20} /> : null}
              {status === 'success' ? !!collectionData && collectionData.title : null}
              {status === 'error' ? '컬렉션' : null}
            </HeaderTitle>
            <HeaderButtons position="right">
              <DeliveryLocationContainer />
              <CartButtonContainer />
            </HeaderButtons>
            <Line isShown={isMenuLine} />
          </>
        ) : null}
      </MobileHeader>

      {ProductContent}
      <UserMenu />
    </MainSiteProvider>
  );
}
