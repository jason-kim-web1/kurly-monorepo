import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { isPC } from '../../../../../util/window/getDevice';

import { PaymentPrice, ReservesPrice } from './PriceFields';
import CopyButton from '../../../../shared/components/Button/CopyButton';
import { ORDER_NO_SUCCESS_MESSAGE } from '../constants/copy-alert-message';

const styles = {
  reserves: {
    color: COLOR.kurlyPurple,
  },
};

const ContentWrapper = styled.div`
  border-radius: 6px;
  padding: ${isPC ? '20px 20px 17px' : '16px 20px'};
  text-align: center;
  background-color: ${COLOR.kurlyGray100};
`;

const OrderNoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const PriceWrapper = styled.div`
  border-top: 1px solid ${COLOR.bg};
  margin-top: 32px;
  padding-top: ${isPC ? 16 : 6}px;
  text-align: left;
`;

const AddressField = styled.div`
  padding-bottom: 12px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
`;

const Divider = styled.div`
  margin: 0 auto 15px;
  width: 90%;
  height: 1px;
  background-color: ${COLOR.btnGray};
`;

const Head = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: ${COLOR.kurlyGray600};
`;

const OrderNo = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${COLOR.kurlyGray600};
`;

interface Props {
  orderNo: string;
  address: string;
  addressDetail: string;
  price: number;
  expectedPoint: number;
  description: string;
  showReservesPrice: boolean;
  isDeliveryOrder: boolean;
}

export default function PaymentResult({
  orderNo,
  address,
  addressDetail,
  price,
  expectedPoint,
  description,
  showReservesPrice,
  isDeliveryOrder,
}: Props) {
  return (
    <>
      <ContentWrapper>
        {isDeliveryOrder && (
          <>
            <AddressField>
              {address} {addressDetail}
            </AddressField>
            {isPC && <Divider />}
          </>
        )}
        <OrderNoWrapper>
          <Head>주문번호</Head>
          <OrderNo>{orderNo}</OrderNo>
          <CopyButton copyString={orderNo} message={ORDER_NO_SUCCESS_MESSAGE} />
        </OrderNoWrapper>
      </ContentWrapper>
      <PriceWrapper>
        <PaymentPrice price={price} />
        {showReservesPrice && (
          <ReservesPrice showPlusSign price={expectedPoint} description={description} css={styles.reserves} />
        )}
      </PriceWrapper>
    </>
  );
}
