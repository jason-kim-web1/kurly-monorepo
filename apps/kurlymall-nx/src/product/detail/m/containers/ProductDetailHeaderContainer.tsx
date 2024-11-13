import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';

import { useAppSelector } from '../../../../shared/store';

import HeaderButtons from '../../../../shared/components/layouts/HeaderButtons';
import BackButton from '../../../../shared/components/Button/BackButton';
import CartButtonContainer from '../../../../shared/containers/m/CartButtonContainer';
import MobileHeader from '../../../../shared/components/layouts/MobileHeader';
import {
  usePreviousRouteFromCPSGoodsDetail,
  usePreviousRoutePath,
} from '../../../../shared/context/PreviousRoutePathContext';
import { getPageUrl, ORDER_PATH, USER_MENU_PATH } from '../../../../shared/constant';
import { redirectTo } from '../../../../shared/reducers/page';
import ProductDetailHeaderTitle from '../components/header/ProductDetailHeaderTitle';
import SearchButtonContainer from './ProductDetailSearchButtonContainer';

const doNotReturnPreviousPages = [
  ORDER_PATH.subscribeSuccess.uri, // 컬리 멤버스 정기결제 성공 /order/checkout/subscribe/success
] as const;

interface Props {
  children: ReactNode;
}

export default function ProductDetailHeaderContainer({ children }: Props) {
  const name = useAppSelector(({ productDetail }) => productDetail.name);
  const productSites = useAppSelector(({ productDetail }) => productDetail.productSites);
  const router = useRouter();
  const dispatch = useDispatch();
  const { previousRoutePath } = usePreviousRoutePath();
  const isFromRedirect = usePreviousRouteFromCPSGoodsDetail();
  const hasDoNotReturnPage = doNotReturnPreviousPages.includes(previousRoutePath || '');

  const assertDisallowedPages = useMemo(
    () => !previousRoutePath || isFromRedirect || hasDoNotReturnPage,
    [hasDoNotReturnPage, isFromRedirect, previousRoutePath],
  );
  const goToHomeWithSite = useCallback(() => {
    const isBeauty = productSites.includes('BEAUTY');
    const mainURL = isBeauty ? USER_MENU_PATH.beautyHome : USER_MENU_PATH.home;
    dispatch(
      redirectTo({
        url: getPageUrl(mainURL),
      }),
    );
  }, [dispatch, productSites]);

  const handleClickBack = () => {
    router.back();
  };

  useEffect(() => {
    router.beforePopState(() => {
      if (assertDisallowedPages) {
        window.history.pushState('', '', previousRoutePath);
        goToHomeWithSite();
        return true;
      }
      return true;
    });
    return () => {
      router.beforePopState(() => {
        return true;
      });
    };
  }, [assertDisallowedPages, goToHomeWithSite, previousRoutePath, router]);

  return (
    <MobileHeader hideBottomLine>
      <HeaderButtons position="left">
        <BackButton onClick={handleClickBack} />
      </HeaderButtons>
      <ProductDetailHeaderTitle>{name}</ProductDetailHeaderTitle>
      <HeaderButtons position="right">
        <SearchButtonContainer sites={productSites} />
        <CartButtonContainer />
      </HeaderButtons>
      {children}
    </MobileHeader>
  );
}
