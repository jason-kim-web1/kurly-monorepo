import { makeBenefitText, makeExpirationDate } from '../utils/conditionText';
import { BenefitType, ConditionWrapper, CouponBadge, CouponDetailSection, TitleText } from '../styled/common';
import { isPC } from '../../../../../util/window/getDevice';
import ConditionItem from './ConditionItem';
import useCouponDetailQuery from '../queries/useCouponDetailQuery';

export default function CouponDetailHead() {
  const { data } = useCouponDetailQuery();

  if (!data) {
    return null;
  }

  const {
    name,
    description,
    effectivePeriod: { endAt },
    benefitInfo,
    hurdle: { isOnlyApp },
  } = data;

  const benefitType = makeBenefitText({
    benefitInfo,
  });

  const expirationDate = makeExpirationDate({ endAt });

  return (
    <CouponDetailSection className={`${isPC ? 'pc' : 'mobile'} head`}>
      <BenefitType variant="$accessibility1Semibold">
        {benefitType}
        {isOnlyApp && (
          <CouponBadge variant="$xsmallSemibold" as="span">
            앱 전용
          </CouponBadge>
        )}
      </BenefitType>
      <TitleText variant="$xxlargeSemibold" className="coupon-name">
        {name}
      </TitleText>
      <ConditionWrapper>
        <ConditionItem text={description} />
        <ConditionItem text={expirationDate} className="date" />
      </ConditionWrapper>
    </CouponDetailSection>
  );
}
