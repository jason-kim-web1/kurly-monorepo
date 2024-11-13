import { isEmpty } from 'lodash';

import { makePaymentMethodText, makePriceConditionText, makeTargetOrderText } from '../utils/conditionText';
import { ConditionWrapper, ContentWrapper, TitleText } from '../styled/common';
import ConditionItem from './ConditionItem';
import OrderHurdleLanding from './OrderHurdleLanding';
import useCouponDetailQuery from '../queries/useCouponDetailQuery';

export default function CouponDetailOrderCondition() {
  const { data } = useCouponDetailQuery();

  if (!data) {
    return null;
  }

  const {
    hurdle,
    target: { scope },
    displayHurdle,
    displayTarget,
    benefitInfo: { type, maximumDiscountPrice },
  } = data;

  const priceConditionText = makePriceConditionText({
    hurdle,
    maximumDiscountPrice,
    type,
  });

  const paymentConditionText = makePaymentMethodText({ hurdle });

  const targetOrderText = makeTargetOrderText({ displayHurdle, displayTarget, scope });

  const showOrderCondition = () => {
    const hasAllowedCategory = hurdle.type === 'ALLOWED_CATEGORY' && !isEmpty(displayHurdle.allowedCategories);
    const hasAllowedProduct = hurdle.type === 'ALLOWED_PRODUCT' && !isEmpty(displayHurdle.allowedProducts);

    return (
      priceConditionText ||
      paymentConditionText ||
      targetOrderText ||
      hasAllowedCategory ||
      hasAllowedProduct ||
      hurdle.isOnlyApp
    );
  };

  if (!showOrderCondition()) {
    return null;
  }

  return (
    <ContentWrapper>
      <TitleText variant="$xxlargeSemibold">주문 조건</TitleText>
      <ConditionWrapper>
        <ConditionItem text={priceConditionText} />
        <ConditionItem text={paymentConditionText} />
        <ConditionItem text={targetOrderText} />
        <ConditionItem text={hurdle.isOnlyApp ? '앱에서 구매시' : ''} />
      </ConditionWrapper>
      <OrderHurdleLanding
        hurdleType={hurdle.type}
        hurdleCategories={hurdle.allowedCategories ?? []}
        displayHurdle={displayHurdle}
        displayTarget={displayTarget}
      />
    </ContentWrapper>
  );
}
