import styled from '@emotion/styled';

import { useState } from 'react';

import { css } from '@emotion/react';

import InputRowHeader from './InputRowHeader';
import SlideModal from '../../../../../../shared/components/modal/SlideModal';
import SelectedOrderProducts from '../SelectedOrderProducts';
import useOrderProductPicker from '../../../../hook/useOrderProductPicker';
import { InquiryOrderProductType } from '../../../types';
import InputOrderProductHeader from './InputOrderProductHeader';
import { useAppSelector } from '../../../../../../shared/store';
import OrderProductPicker from '../product/OrderProductPicker';
import OrderProductItemList from './OrderProductItemList';
import InputOrderProductBottom from './InputOrderProductBottom';
import { MemberOrderProduct } from '../../../../shared/types';
import OrderDateNumber from '../product/OrderDateNumber';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 10,
});

const Button = styled.button({
  width: '100%',
  padding: '0.625rem',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '3rem',
  borderRadius: 4,
  fontSize: '0.938rem',
  border: '1px solid #dddddd',
});

const slideModalCss = css`
  height: 100%;
  z-index: 100;
`;

interface Props {
  orderProductType: InquiryOrderProductType;
}

export default function InputOrderProduct({ orderProductType }: Props) {
  const { orders, searchInfo } = useAppSelector(({ personalInquiryForm }) => personalInquiryForm.orderProductPicker);

  const [open, setOpen] = useState(false);

  const { selectedOrder, selectedOrderProducts, deselectProduct, completeProductSelection } = useOrderProductPicker();

  const handleClickProductSelect = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const hasSelected = orders
    .reduce((prev, curr) => [...prev, ...curr.products], [] as Array<MemberOrderProduct>)
    .some((product) => product.selected);

  const handleCompleteButtonClicked = () => {
    completeProductSelection();
    setOpen(false);
  };

  return (
    <Container>
      <InputRowHeader label="문의 상품" required={orderProductType !== 'OPTIONAL_EACH'} />
      {selectedOrder && (
        <>
          <OrderDateNumber
            orderNo={selectedOrder?.orderNo}
            orderType={selectedOrder?.orderType}
            orderedDatetime={selectedOrderProducts[0].orderedDatetime}
          />
          <SelectedOrderProducts
            products={selectedOrderProducts}
            displayDeselectButton={orderProductType !== 'ALL'}
            onDeselectProduct={deselectProduct}
          />
        </>
      )}
      <Button type="button" onClick={handleClickProductSelect}>
        <span>주문상품 선택</span>
      </Button>
      <SlideModal open={open} onClose={handleCloseModal} css={slideModalCss} disableSwipe showHeader={false}>
        <>
          <InputOrderProductHeader onClose={handleCloseModal} />
          <OrderProductPicker
            searchInfo={searchInfo}
            description="※ 동일 주문번호 내의 상품만 중복으로 선택 가능합니다."
          >
            <OrderProductItemList orders={orders} searchInfo={searchInfo} />
            <InputOrderProductBottom onClick={handleCompleteButtonClicked} active={hasSelected} />
          </OrderProductPicker>
        </>
      </SlideModal>
    </Container>
  );
}
