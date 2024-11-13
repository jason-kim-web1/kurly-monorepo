import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { eq, head, isEmpty } from 'lodash';

import { useAppSelector } from '../../../src/shared/store';
import { useCollectionListPageQueryParams } from '../../../src/product/list/collections/hook/useCollectionsPageQueryParams';
import MobileHeader from '../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../src/shared/components/Button/BackButton';
import DeliveryLocationContainer from '../../../src/header/containers/m/DeliveryLocationContainer';
import CartButtonContainer from '../../../src/shared/containers/m/CartButtonContainer';
import UserMenu from '../../../src/shared/components/layouts/UserMenu';
import CollectionListContainer from '../../../src/product/list/collections/m/containers/CollectionListContainer';
import { useCollectionGroups } from '../../../src/product/list/collections/hook/useCollectionGroups';
import HeaderTitle from '../../../src/shared/components/layouts/HeaderTitle';
import Loading from '../../../src/shared/components/Loading/Loading';
import COLOR from '../../../src/shared/constant/colorset';
import { productListSetScreenName } from '../../../src/product/list/shared/util/productListSetScreenName';
import SkeletonLoading from '../../../src/shared/components/Loading/SkeletonLoading';
import MenuCollections from '../../../src/product/list/m/components/MenuCollections';
import { amplitudeService } from '../../../src/shared/amplitude';
import { SelectCollectionBanner, SelectCollectionMenu } from '../../../src/shared/amplitude/events';
import { ProductListPolicy } from '../../../src/product/list/m/components/ProductListPolicy';
import { redirectTo } from '../../../src/shared/reducers/page';
import { useCollection } from '../../../src/product/list/collections/hook/useCollection';
import MainCollectionGroup from '../../../src/product/list/m/containers/MainCollectionGroups';
import { useMoWebConfigContext } from '../../../src/shared/context/MoWebConfigContext';
import { removeQueryString } from '../../../src/shared/utils/url';

const MenuArea = styled.div`
  height: 44px;
`;

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

const CollectionGroup = () => {
  const dispatch = useDispatch();
  const { hasSession } = useAppSelector(({ auth }) => auth);
  const router = useRouter();
  const { isReady, asPath, query } = router;
  const { site, collectionGroupsCode, collection } = useCollectionListPageQueryParams();
  const [collectionCode, setCollectionCode] = useState<string>(collection);
  const [isMenuLine, setIsMenuLine] = useState(false);
  const { ref, entry } = useInView();
  const { collectionGroupTitle, collectionGroups, status } = useCollectionGroups({ collectionGroupsCode });
  const { isSuccess } = useCollection({ collectionName: collectionCode });

  const pathname = useMemo(() => {
    return removeQueryString(asPath);
  }, [asPath]);

  const route = useCallback(
    (groupCode: string) => {
      dispatch(
        redirectTo({
          url: pathname,
          query: {
            ...query,
            filters: null,
            collectionGroupsCode,
            ...(groupCode && { collection: groupCode }),
            ...(site === 'BEAUTY' && { site: 'beauty' }),
          },
          replace: true,
        }),
      );
    },
    [collectionGroupsCode, dispatch, pathname, query, site],
  );

  const handlePageChange = useCallback(
    (groupCode: string) => {
      route(groupCode);
    },
    [route],
  );

  const handleMenuAmplitude = (groupCode: string) => {
    amplitudeService.logEvent(
      new SelectCollectionMenu({
        groupCode,
      }),
    );
  };

  const handleBannerAmplitude = (url: string) => {
    amplitudeService.logEvent(
      new SelectCollectionBanner({
        url,
        groupCollectionId: collectionGroupsCode,
        selectCode: collection,
        groups: collectionGroups,
      }),
    );
  };

  useEffect(() => {
    if (!entry) {
      return;
    }
    setIsMenuLine(!entry.isIntersecting);
  }, [entry]);

  useEffect(() => {
    if (collection || isEmpty(collectionGroups)) {
      return;
    }

    const groupFirstCode = head(collectionGroups);

    if (groupFirstCode) {
      setCollectionCode(groupFirstCode.code);
      handlePageChange(groupFirstCode.code);
    }
  }, [collectionGroups, collection, handlePageChange]);

  useEffect(() => {
    if (eq(collection, collectionCode) || !isSuccess) {
      return;
    }
    route(collectionCode);
  }, [collection, collectionCode, isSuccess, route]);

  if (!hasSession || !isReady) {
    return (
      <>
        <MobileHeader hideBottomLine>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle hasLocationIcon>
            <SkeletonLoading width={180} height={20} />
          </HeaderTitle>
          <HeaderButtons position="right">
            <DeliveryLocationContainer />
            <CartButtonContainer />
          </HeaderButtons>
        </MobileHeader>
        <Loading />
        <UserMenu />
      </>
    );
  }

  return (
    <>
      <MobileHeader hideBottomLine>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle hasLocationIcon>
          {status === 'loading' ? <SkeletonLoading width={180} height={20} /> : null}
          {status === 'success' ? collectionGroupTitle : null}
          {status === 'error' ? '컬렉션 그룹' : null}
        </HeaderTitle>
        <HeaderButtons position="right">
          <DeliveryLocationContainer />
          <CartButtonContainer />
        </HeaderButtons>
        {status === 'success' && (
          <MenuCollections
            code={collection}
            groups={collectionGroups}
            onAmplitude={handleMenuAmplitude}
            setCollectionCode={setCollectionCode}
          />
        )}
        <Line isShown={isMenuLine && isEmpty(collectionGroups)} />
      </MobileHeader>
      {status === 'success' && !isEmpty(collectionGroups) && <MenuArea />}
      <div ref={ref} />
      <ProductListPolicy code={collectionGroupsCode} type="collection-groups">
        <ProductListPolicy code={collection} type="collection">
          <CollectionListContainer
            collectionName={collection}
            bannerAmplitude={handleBannerAmplitude}
            isCollectionGroup={true}
          />
        </ProductListPolicy>
      </ProductListPolicy>
      <UserMenu />
    </>
  );
};

const CollectionGroups = () => {
  const { isReady } = useRouter();
  const dispatch = useDispatch();
  const { site, collectionGroupsCode, filters } = useCollectionListPageQueryParams();
  const { isHome } = useMoWebConfigContext();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    productListSetScreenName(collectionGroupsCode, 'collections');
  }, [collectionGroupsCode, filters, dispatch, isReady]);

  if (isHome) {
    return <MainCollectionGroup code={collectionGroupsCode} site={site} />;
  }

  return <CollectionGroup />;
};

export default CollectionGroups;
