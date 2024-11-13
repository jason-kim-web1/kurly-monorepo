import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { useCallback, useEffect } from 'react';

import { useAppSelector } from '../../../../shared/store';
import ProductInquiryBoardList from './ProductInquiryBoardList';
import ProductInquiryPageButton from './ProductInquiryPageButton';
import {
  loadProductInquiryNextItems,
  modifyProductInquiryForm,
  resetProductInquiryBoard,
  setProductInquiryPageSize,
} from '../../../detail/slice';
import { redirectTo, redirectToLogin } from '../../../../shared/reducers/page';
import { isWebview } from '../../../../../util/window/getDevice';
import useProductInquiryWebview from '../hooks/useProductInquiryWebview';
import deepLinkUrl from '../../../../shared/constant/deepLink';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectAddProductInquiry } from '../../../../shared/amplitude/events/product/SelectAddProductInquiry';
import { getFusionQueryId } from '../../../detail/shared/utils/productDetailEvent';

const Container = styled.div``;

const PAGE_SIZE = 15;

interface Props {
  productNo: number;
  productName: string;
}

export default function ProductInquiryListContainer({ productNo, productName }: Props) {
  const { hasSession, isGuest } = useAppSelector(({ auth }) => auth);
  const { queryId } = useAppSelector(({ productList }) => productList);
  const { inquiry } = useAppSelector(({ productDetail }) => productDetail);
  const { openRegisterPage } = useProductInquiryWebview(productNo, productName);
  const { loading, items, isError } = inquiry;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductInquiryPageSize(PAGE_SIZE));
    dispatch(resetProductInquiryBoard());
  }, [dispatch]);

  const loadNextPage = useCallback(() => {
    if (hasSession) {
      dispatch(loadProductInquiryNextItems(productNo));
    }
  }, [productNo, dispatch, hasSession]);

  const moveToFormPage = async () => {
    const path = '/goods/inquiry/form';
    dispatch(
      redirectTo({
        url: `/m${path}`,
        query: {
          no: productNo,
          name: productName,
        },
      }),
    );
  };

  const handleClickWebviewRegisterButton = () => {
    try {
      amplitudeService.logEvent(
        new SelectAddProductInquiry({
          fusionQueryId: getFusionQueryId(queryId),
        }),
      );
    } catch (e) {
    } finally {
      if (isGuest) {
        location.href = deepLinkUrl.LOGIN;
      } else {
        openRegisterPage();
      }
    }
  };

  const handleClickRegisterButton = async () => {
    if (isGuest) {
      dispatch(redirectToLogin());
      return;
    }

    dispatch(
      modifyProductInquiryForm({
        postId: undefined,
        subject: '',
        content: '',
        isSecret: false,
        mode: 'new',
      }),
    );

    await moveToFormPage();
  };

  const handleClickButton = async () => {
    if (isWebview()) {
      handleClickWebviewRegisterButton();
      return;
    }

    try {
      amplitudeService.logEvent(
        new SelectAddProductInquiry({
          fusionQueryId: getFusionQueryId(queryId),
        }),
      );
    } catch (e) {
    } finally {
      await handleClickRegisterButton();
    }
  };

  return (
    <Container>
      <ProductInquiryPageButton onClick={handleClickButton} />
      <ProductInquiryBoardList
        items={items}
        loading={loading}
        isError={isError}
        productNo={productNo}
        productName={productName}
        loadNextPage={loadNextPage}
        moveToFormPage={moveToFormPage}
      />
    </Container>
  );
}
