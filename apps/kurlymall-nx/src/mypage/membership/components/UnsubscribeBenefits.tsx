import { useMemo } from 'react';

import { ContentWrapper, CouponGrid, FreeTicketInfo, Section, Title } from '../shared/styled';
import { useAppSelector } from '../../../shared/store';
import Coupon from './Coupon';
import { Benefit } from '../shared/type';
import getDuplicateCoupons from '../../../shared/utils/getDuplicateCoupons';
import AffiliateBenefitList from './AffiliateBenefitList';
import { CLASS_NAME_DEVICE } from '../shared/constants';

export default function UnsubscribeBenefits() {
  const { benefits, usingFreeTicket } = useAppSelector(({ myMembership }) => ({
    benefits: myMembership.benefits,
    usingFreeTicket: myMembership.usingFreeTicket,
  }));

  const benefitList = useMemo(
    () =>
      getDuplicateCoupons<Benefit>({
        coupons: benefits,
        keyProperty: ['condition', 'couponType', 'isUsed'],
        typeProperty: 'couponType',
      }),
    [benefits],
  );

  const { userName } = useAppSelector(({ member }) => ({
    userName: member.info?.name,
  }));

  return (
    <Section>
      {usingFreeTicket ? (
        <>
          <Title>
            <span className="main">{userName} 님의 무료이용권이 사라져요!</span>
          </Title>
          <FreeTicketInfo>
            <div className="title">컬리멤버스 무료이용권</div>
            <div className="text">{`${usingFreeTicket.endedAt}까지 무료 이용가능`}</div>
            <div className="usage-amount">
              <div>이용금액</div>
              <div className="amount">
                <span className="dimmed">1,900W</span> 무료
              </div>
            </div>
          </FreeTicketInfo>
        </>
      ) : null}
      <Title>
        <span className="main">지금 해지하면 다음 혜택이 사라져요!</span>
      </Title>
      <ContentWrapper className={CLASS_NAME_DEVICE}>
        <AffiliateBenefitList />
      </ContentWrapper>
      <CouponGrid>
        {benefitList.map(({ type, value, isUsed, condition, duplicateCoupons }, index) => (
          <Coupon
            type={type}
            value={value}
            isUsed={isUsed}
            condition={condition}
            key={value + condition + index}
            duplicateCoupons={duplicateCoupons}
          />
        ))}
      </CouponGrid>
    </Section>
  );
}
