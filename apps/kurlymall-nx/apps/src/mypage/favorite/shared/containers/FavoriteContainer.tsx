import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import FavoriteList from '../components/FavoriteList';
import FavoriteListCount from '../components/FavoriteListCount';
import FavoriteListFilterPC from '../../pc/components/FavoriteListFilter';
import FavoriteListFilterMo from '../../m/components/FavoriteListFilter';
import useFavoriteListQuery from '../../hooks/useFavoriteListQuery';

import { FavoriteListSkeleton } from '../components/FavoriteListSkeleton';
import BottomInfoText from '../components/BottomInfoText';
import Error from '../components/Error';
import { ProductEmpty } from '../components/ProductEmpty';
import useFavoriteSortType from '../../hooks/useFavoriteSortType';
import { isPC } from '../../../../../util/window/getDevice';

const HeaderWrapper = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  ${isPC
    ? css`
        padding: 20px 0 10px;
      `
    : css`
        padding: 17px 16px;
      `}
`;

export default function FavoriteContainer() {
  const { isReady } = useRouter();

  const { sortType, changeSortType } = useFavoriteSortType();
  const { isError, isLoading, isDataEmpty, favoriteList, favoriteListSize } = useFavoriteListQuery(sortType);

  const FavoriteListFilter = isPC ? FavoriteListFilterPC : FavoriteListFilterMo;

  useEffect(() => {
    if (!isReady) {
      return;
    }
  }, [isReady]);

  if (isError) {
    return (
      <>
        <BottomInfoText />
        <Error />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <HeaderWrapper>
          <FavoriteListCount favoriteListSize={favoriteListSize} />
          <FavoriteListFilter sortType={sortType} changeSortType={changeSortType} />
        </HeaderWrapper>
        <FavoriteListSkeleton />
      </>
    );
  }
  if (isDataEmpty) {
    return (
      <>
        <BottomInfoText />
        <ProductEmpty />
      </>
    );
  }

  return (
    <>
      <HeaderWrapper>
        <FavoriteListCount favoriteListSize={favoriteListSize} />
        <FavoriteListFilter sortType={sortType} changeSortType={changeSortType} />
      </HeaderWrapper>
      <FavoriteList favoriteList={favoriteList} favoriteListSize={favoriteListSize} />
    </>
  );
}
