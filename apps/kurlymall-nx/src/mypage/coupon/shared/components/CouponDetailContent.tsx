import { useEffect, useRef, useState } from 'react';

import CouponDetailOrderCondition from '../components/CouponDetailOrderCondition';
import { isPC } from '../../../../../util/window/getDevice';
import { CouponDetailSection } from '../styled/common';
import DetailTargetList from '../components/DetailTargetList';
import { TargetList } from '../types/conditionTextType';

export default function CouponDetailContent() {
  const couponDetailSectionRef = useRef<HTMLDivElement>(null);
  const [showCouponDetail, setShowCouponDetail] = useState(true);

  useEffect(() => {
    if (couponDetailSectionRef?.current?.children.length === 0) {
      setShowCouponDetail(false);
    }
  }, []);

  if (!showCouponDetail) {
    return null;
  }

  return (
    <CouponDetailSection ref={couponDetailSectionRef} className={isPC ? 'pc' : 'mobile'}>
      <CouponDetailOrderCondition />
      <DetailTargetList title="적용 대상" targetList={TargetList.ALLOWED} />
      <DetailTargetList title="제외 대상" targetList={TargetList.DISALLOWED} />
    </CouponDetailSection>
  );
}
