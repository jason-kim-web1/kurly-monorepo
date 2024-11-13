import { CouponCard } from '../shared/styled';
import { Benefit, MembershipBenefitType } from '../shared/type';
import { CLASS_NAME_DEVICE } from '../shared/constants';

type CouponProps = {
  type: MembershipBenefitType;
  isUsed: boolean;
  value: string;
  condition: string;
  duplicateCoupons: Benefit[];
};

export default function Coupon({ type, isUsed, value, condition, duplicateCoupons }: CouponProps) {
  const isBenefitTypePoint = type === MembershipBenefitType.POINT;

  const badgeText = () => {
    if (isUsed) return '사용완료';
    return isBenefitTypePoint ? '적립금' : '쿠폰';
  };
  const priceText = () => `${value}${duplicateCoupons.length > 0 ? ` ${duplicateCoupons.length + 1}장` : ''}`;

  return (
    <CouponCard isUsed={isUsed} type={type} className={CLASS_NAME_DEVICE}>
      <div className="badge">{badgeText()}</div>
      <div className="price">{priceText()}</div>
      {!isBenefitTypePoint && <div className="condition">{condition}</div>}
    </CouponCard>
  );
}
