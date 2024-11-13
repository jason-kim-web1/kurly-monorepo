import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import InquiryQnaWrapper from './InquiryQnaWrapper';
import InquiryOrderInfo from './InquiryOrderInfo';
import InquiryProducts from './InquiryProducts';

import { InquiryContentType } from '../../../../form/types';
import { UserInquiryContentImageData } from '../../../types';
import { MemberOrderProductData } from '../../../../shared/types';
import COLOR from '../../../../../../shared/constant/colorset';
import { OrderType } from '../../../../../../shared/constant/order';

const OrderWrap = styled.div`
  overflow: hidden;
  border: 1px solid ${COLOR.bg};
  padding: 14px 20px 4px;
  margin-bottom: 20px;
  background: ${COLOR.kurlyWhite};
  border-radius: 6px;
`;

interface Props {
  text: string;
  type: InquiryContentType;
  date?: string;
  orderNo?: number | null;
  orderProducts?: MemberOrderProductData[];
  images?: UserInquiryContentImageData[];
  orderType: OrderType;
}

export default function InquiryQnaContent({ text, type, orderNo, orderProducts, date, images, orderType }: Props) {
  return (
    <InquiryQnaWrapper
      type={type}
      text={text}
      images={images}
      createdAt={date}
      orderNo={isEmpty(orderProducts) ? orderNo : null}
    >
      {!!orderNo && orderProducts && !isEmpty(orderProducts) && (
        <OrderWrap>
          <InquiryOrderInfo date={orderProducts[0].orderedDatetime} orderNumber={orderNo} orderType={orderType} />
          <InquiryProducts products={orderProducts} />
        </OrderWrap>
      )}
    </InquiryQnaWrapper>
  );
}
