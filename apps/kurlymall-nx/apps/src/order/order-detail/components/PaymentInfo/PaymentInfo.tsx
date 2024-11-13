import { Typography } from '@thefarmersfront/kpds-react';
import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import Accordion from '../../../common/components/Accordion';
import BaseWrapper from '../../../common/components/BaseWrapper';
import { OrderDetail } from '../../interface/OrderDetail';
import RegularDetailRow from '../DetailRow/RegularDetailRow';
import SubDetailRow from '../DetailRow/SubDetailRow';
import BoldDetailRow from '../DetailRow/BoldDetailRow';
import generatePriceText from '../../../common/utils/generatePriceText';
import usePaymentInfo from '../../hooks/usePaymentInfo';
import PaymentReceipt from './PaymentReceipt';

const Wrapper = styled(BaseWrapper)`
  padding: ${vars.spacing.$20} ${vars.spacing.$16};
`;

const Row = styled.div`
  display: flex;
`;

const RefundGuideButton = styled.button`
  margin-left: auto;
`;

const RefundGuideButtonText = styled(Typography)`
  color: ${vars.color.text.$secondary};
  line-height: ${vars.lineHeight.$22};
  text-decoration-line: underline;
`;

interface Props {
  groupOrderNo: OrderDetail['groupOrderNo'];
  payment: OrderDetail['payment'];
  receipt: OrderDetail['receipt'];
}

const TITLE = '결제정보';

const PaymentInfo = ({ groupOrderNo, payment, receipt }: Props) => {
  const {
    isOpen,
    toggleWithAmplitude,
    totalUsedPoint,
    paymentMethodText,
    isAllOrdersCanceled,
    shouldShowRefundGuideButton,
    handleClickRefundGuideButton,
  } = usePaymentInfo({ groupOrderNo, payment });

  const {
    totalDisplayProductsPrice,
    totalDisplayProductsDiscountPrice,
    deliveryPrice,
    totalCardInstantDiscountPrice,
    totalCouponDiscountPrice,
    totalUsedFreePoint,
    totalUsedPaidPoint,
    totalPaymentPrice,
    totalAccruedPoint,
    totalRefundedPrice,
    totalRefundRequestedPrice,
    totalRemainPaymentPrice,
  } = payment;

  return (
    <Accordion title={TITLE} isOpen={isOpen} onClick={() => toggleWithAmplitude(TITLE)}>
      <Wrapper>
        <BoldDetailRow
          title="상품금액"
          content={generatePriceText({ price: totalDisplayProductsPrice, isAllOrdersCanceled })}
        />
        {totalDisplayProductsDiscountPrice > 0 && (
          <RegularDetailRow
            title="상품할인금액"
            content={generatePriceText({
              price: totalDisplayProductsDiscountPrice,
              prefix: 'minus',
              isAllOrdersCanceled,
            })}
          />
        )}
        <RegularDetailRow
          title="배송비"
          content={generatePriceText({ price: deliveryPrice, prefix: 'plus', isAllOrdersCanceled })}
        />
        <RegularDetailRow
          title="카드즉시할인"
          content={generatePriceText({ price: totalCardInstantDiscountPrice, prefix: 'plus', isAllOrdersCanceled })}
        />
        <RegularDetailRow
          title="쿠폰할인"
          content={generatePriceText({ price: totalCouponDiscountPrice, prefix: 'minus', isAllOrdersCanceled })}
        />
        <RegularDetailRow
          title="적립금 · 컬리캐시"
          content={generatePriceText({ price: totalUsedPoint, prefix: 'minus', isAllOrdersCanceled })}
        />
        <SubDetailRow
          title="적립금"
          content={generatePriceText({ price: totalUsedFreePoint, prefix: 'minus', isAllOrdersCanceled })}
          margin={`${vars.spacing.$0} ${vars.spacing.$0} ${vars.spacing.$4} ${vars.spacing.$0}`}
        />
        <SubDetailRow
          title="컬리캐시"
          content={generatePriceText({ price: totalUsedPaidPoint, prefix: 'minus', isAllOrdersCanceled })}
          margin={`${vars.spacing.$0} ${vars.spacing.$0} ${vars.spacing.$12} ${vars.spacing.$0}`}
        />
        <RegularDetailRow title="결제금액" content={generatePriceText({ price: totalPaymentPrice })} />
        {!isAllOrdersCanceled && totalAccruedPoint > 0 && (
          <RegularDetailRow
            title="적립금액"
            description="배송완료 다음날 적립"
            content={generatePriceText({ price: totalAccruedPoint })}
          />
        )}
        {totalRefundedPrice > 0 && (
          <RegularDetailRow title="환불완료금액" content={generatePriceText({ price: totalRefundedPrice })} />
        )}
        {totalRefundRequestedPrice > 0 && (
          <RegularDetailRow title="취소접수금액" content={generatePriceText({ price: totalRefundRequestedPrice })} />
        )}
        {totalRefundRequestedPrice > 0 && totalRemainPaymentPrice > 0 && (
          <RegularDetailRow title="취소시 결제금액" content={generatePriceText({ price: totalRemainPaymentPrice })} />
        )}
        <RegularDetailRow title="결제방법" content={paymentMethodText} />
        {shouldShowRefundGuideButton && (
          <Row>
            <RefundGuideButton onClick={handleClickRefundGuideButton}>
              <RefundGuideButtonText variant="$largeRegular">환불안내</RefundGuideButtonText>
            </RefundGuideButton>
          </Row>
        )}
        <PaymentReceipt receipt={receipt} />
      </Wrapper>
    </Accordion>
  );
};

export default PaymentInfo;
