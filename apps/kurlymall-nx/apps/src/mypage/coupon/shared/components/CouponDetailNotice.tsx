import styled from '@emotion/styled';

import { ConditionWrapper, CouponDetailSection, TitleText } from '../styled/common';
import { COUPON_DETAIL_NOTICE } from '../constants';
import ConditionItem from './ConditionItem';
import { isPC } from '../../../../../util/window/getDevice';

const NoticeItem = styled.div`
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export default function CouponDetailNotice() {
  return (
    <CouponDetailSection className={isPC ? 'pc' : 'mobile notice'}>
      <TitleText variant="$xxlargeSemibold" className="notice-title">
        유의사항
      </TitleText>
      {COUPON_DETAIL_NOTICE.map(({ title, list }) => (
        <NoticeItem key={title}>
          <TitleText variant="$largeSemibold" className="notice-sub">
            {title}
          </TitleText>
          <ConditionWrapper>
            {list.map((text) => (
              <ConditionItem text={text} key={text} className="notice" />
            ))}
          </ConditionWrapper>
        </NoticeItem>
      ))}
    </CouponDetailSection>
  );
}
