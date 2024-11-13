import styled from '@emotion/styled';

import { useState } from 'react';

import Modal from '@material-ui/core/Modal';

import { useAppSelector } from '../../../../../../shared/store';

import { InquiryOrderProductType } from '../../../types';
import FormInputRow from './FormInputRow';
import OrderProductPicker from '../product/OrderProductPicker';
import InputOrderProductHeader from './InputOrderProductHeader';
import useOrderProductPicker from '../../../../hook/useOrderProductPicker';
import { MemberOrderProduct } from '../../../../shared/types';
import InputOrderProductBottom from './InputOrderProductBottom';
import OrderProductItemList from './OrderProductItemList';
import OrderProductItemListPagination from './OrderProductItemListPagination';
import SelectedOrderProducts from '../product/SelectedOrderProducts';
import { CUSTOM_DATE_SELECTOR_TAB_NUMBER } from '../../shared/input/product/search/OrderProductSearchDateTab';

const SCROLL_HEIGHT = {
  basic: 450,
  search: 398,
};

const Button = styled.button({
  width: '100%',
  height: 44,
  borderRadius: 3,
  border: 'solid 1px #dddddd',
  backgroundColor: 'white',
  color: '#333333',
  fontSize: 14,
});

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const ModalInner = styled.div`
  display: flex;
  align-items: center;
  min-width: 570px;
  height: 100%;
  min-height: 780px;
  padding: 20px;
  margin: 0 auto;
`;

const InnerWrap = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  width: 530px;
  height: 740px;
  background-color: white;
  border-radius: 12px;
`;

const OrderProductPickerWrap = styled.div`
  padding: 0 10px;
`;

const OrderContainer = styled.div<{ scrollHeight: number }>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  width: 530px;
  padding-top: 8px;
  box-sizing: border-box;
  height: ${({ scrollHeight }) => `${scrollHeight}px`};
`;

const SearchResultWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 510px;
`;

interface Props {
  orderProductType: InquiryOrderProductType;
}

export default function InputOrderProduct({ orderProductType }: Props) {
  const [open, setOpen] = useState(false);

  const { searchInfo, orders } = useAppSelector(({ personalInquiryForm }) => personalInquiryForm.orderProductPicker);

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

  const scrollHeight: number =
    searchInfo.dateSelectorTabNumber === CUSTOM_DATE_SELECTOR_TAB_NUMBER ? SCROLL_HEIGHT.search : SCROLL_HEIGHT.basic;

  return (
    <FormInputRow label="상품" required={orderProductType !== 'OPTIONAL_EACH'}>
      {selectedOrder && (
        <SelectedOrderProducts
          products={selectedOrderProducts}
          displayDeselectButton={orderProductType !== 'ALL'}
          onDeselectProduct={deselectProduct}
          orderType={selectedOrder.orderType}
        />
      )}
      <Button type="button" onClick={handleClickProductSelect}>
        주문상품 선택
      </Button>
      <Modal open={open} onClose={handleCloseModal}>
        <ModalWrap>
          <ModalInner>
            <InnerWrap>
              <OrderProductPickerWrap>
                <InputOrderProductHeader onClose={handleCloseModal} />
                <OrderProductPicker searchInfo={searchInfo} />
                <OrderContainer scrollHeight={scrollHeight}>
                  <SearchResultWrapper>
                    <OrderProductItemList orders={orders} searchInfo={searchInfo} />
                  </SearchResultWrapper>
                  <OrderProductItemListPagination searchInfo={searchInfo} />
                </OrderContainer>
                <InputOrderProductBottom onClick={handleCompleteButtonClicked} active={hasSelected} />
              </OrderProductPickerWrap>
            </InnerWrap>
          </ModalInner>
        </ModalWrap>
      </Modal>
    </FormInputRow>
  );
}
