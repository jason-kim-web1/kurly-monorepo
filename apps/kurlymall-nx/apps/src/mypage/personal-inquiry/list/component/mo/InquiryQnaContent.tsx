import styled from '@emotion/styled';

import { head } from 'lodash';

import { InquiryContentType } from '../../../form/types';
import { UserInquiryContentImageData } from '../../types';
import { MemberOrderProductData } from '../../../shared/types';

import InquiryQnaWrapper from './InquiryQnaWrapper';
import InquiryQnaImages from './InquiryQnaImages';
import InquiryOrderInfo from './InquiryOrderInfo';
import InquiryProducts from './InquiryProducts';
import { OrderType } from '../../../../../shared/constant/order';

const ImageWrap = styled.div({
  marginTop: '13px',
  height: '20rem',
});

const OrderWrap = styled.div({
  marginTop: '20px',
});

interface Props {
  text: string;
  type: InquiryContentType;
  date?: string;
  orderNo?: number | null;
  orderType?: OrderType;
  orderProducts?: MemberOrderProductData[];
  images?: UserInquiryContentImageData[];
}

export default function InquiryQnaContent({ text, type, orderNo, orderType, orderProducts, date, images }: Props) {
  const orderProduct = head(orderProducts);

  return (
    <InquiryQnaWrapper type={type} text={text} createdAt={date}>
      {images && images.length > 0 && (
        <ImageWrap>
          <InquiryQnaImages images={images} />
        </ImageWrap>
      )}
      <OrderWrap>
        {!!orderNo && (
          <InquiryOrderInfo date={orderProduct?.orderedDatetime} orderNumber={orderNo} orderType={orderType} />
        )}
        {orderProducts && <InquiryProducts products={orderProducts} />}
      </OrderWrap>
    </InquiryQnaWrapper>
  );
}
