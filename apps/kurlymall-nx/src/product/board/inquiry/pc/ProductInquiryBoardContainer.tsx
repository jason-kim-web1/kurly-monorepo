import styled from '@emotion/styled';
import { chain, range } from 'lodash';

import { useDispatch } from 'react-redux';

import { useEffect, useMemo } from 'react';

import { useInView } from 'react-intersection-observer';

import Button from '../../../../shared/components/Button/Button';
import BoardHeader from './BoardHeader';
import BoardTable from './BoardTable';
import BoardTableBottomContainer from './BoardTableBottomContainer';
import ProductInquiryRegisterFormContainer from './form/ProductInquiryRegisterFormContainer';
import { useAppSelector } from '../../../../shared/store';
import { initProductInquiryItems, loadProductInquiryItems, modifyProductInquiryForm } from '../../../detail/slice';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectAddProductInquiry } from '../../../../shared/amplitude/events/product/SelectAddProductInquiry';
import { getFusionQueryId } from '../../../detail/shared/utils/productDetailEvent';

const Container = styled.div`
  margin-bottom: 60px;
`;

const ButtonWrap = styled.div`
  position: absolute;
  right: 0;
  button {
    border-radius: 3px;
  }
  span {
    font-size: 14px;
  }
`;

interface Props {
  no: number;
  name: string;
  mainImageUrl: string;
}

export default function ProductInquiryBoardContainer({ no, name, mainImageUrl }: Props) {
  const { inView, ref } = useInView();
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const accessToken = useAppSelector(({ auth }) => auth.accessToken);
  const pagination = useAppSelector(({ productDetail }) => productDetail.inquiry.pagination);
  const isLoading = useAppSelector(({ productDetail }) => productDetail.inquiry.loading);
  const isError = useAppSelector(({ productDetail }) => productDetail.inquiry.isError);
  const inquiryList = useAppSelector(({ productDetail }) => productDetail.inquiry.items);
  const isInquiryFormOpen = useAppSelector(({ productDetail }) => productDetail.inquiry.form.open);
  const queryId = useAppSelector(({ productList }) => productList.queryId);
  const { currentPage, perPage } = pagination;
  const dispatch = useDispatch();
  const currentPageItems = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return chain(range(start, start + perPage))
      .map((index) => inquiryList[index])
      .compact()
      .value();
  }, [inquiryList, currentPage, perPage]);

  const closeInquiryModal = () => {
    dispatch(
      modifyProductInquiryForm({
        open: false,
      }),
    );
  };

  const handleClickButton = () => {
    amplitudeService.logEvent(
      new SelectAddProductInquiry({
        fusionQueryId: getFusionQueryId(queryId),
      }),
    );
    dispatch(
      modifyProductInquiryForm({
        open: true,
        subject: '',
        content: '',
        isSecret: false,
        mode: 'new',
      }),
    );
  };

  useEffect(() => {
    return () => {
      closeInquiryModal();
    };
  }, []);

  useEffect(() => {
    if (!inView || !accessToken) {
      return;
    }
    dispatch(loadProductInquiryItems(no, currentPage));
  }, [dispatch, accessToken, currentPage, no, inView]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(initProductInquiryItems());
  }, [accessToken, dispatch, no]);

  return (
    <Container ref={ref}>
      <ButtonWrap>
        <Button type="button" text="문의하기" onClick={handleClickButton} width={120} height={40} />
      </ButtonWrap>
      <BoardHeader />
      <BoardTable loading={isLoading} isError={isError} items={currentPageItems} pageSize={perPage} />
      <BoardTableBottomContainer pagination={pagination} />
      <ProductInquiryRegisterFormContainer
        productNo={no}
        productName={name}
        productImageUrl={mainImageUrl}
        open={isInquiryFormOpen}
        isGuest={isGuest}
        onClose={closeInquiryModal}
      />
    </Container>
  );
}
