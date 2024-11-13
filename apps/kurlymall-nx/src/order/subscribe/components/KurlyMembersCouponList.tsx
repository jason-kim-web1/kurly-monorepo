import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { Coupon } from '../interfaces/KurlyMembersProduct.interface';
import { SortCouponType } from '../../../shared/utils/getDuplicateCoupons';
import { makeBenefitText } from '../../../mypage/coupon/shared/utils/conditionText';

const Wrapper = styled.div`
  margin: 0 0 16px 36px;
  border-radius: 8px;
  background-color: ${COLOR.kurlyGray100};
  padding: 12px 14px;
`;

const CouponList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 0;
  font-size: 12px;
  border-bottom: 1px solid ${COLOR.kurlyGray150};

  :first-of-type {
    padding-top: 0;
  }

  :last-of-type {
    padding-bottom: 0;
    border-bottom: 0;
  }
`;

const CouponListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const CouponName = styled.span`
  line-height: 16px;
  font-weight: 400;
  color: ${COLOR.kurlyGray800};
  padding-right: 6px;
`;

const CouponCondition = styled.span`
  line-height: 16px;
  font-weight: 400;
  color: ${COLOR.kurlyGray450};
  work-break: keep-all;
  text-align: right;
`;

const CouponTagWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
`;

const CouponTag = styled.span`
  font-size: 10px;
  font-weight: 600;
  padding: 3px 4px;
  color: ${COLOR.kurlyWhite};
  background-color: ${COLOR.benefitGray};
  border-radius: 4px;
  margin-right: 6px;
`;

interface Props {
  couponList: SortCouponType<Coupon>[];
}

export default function KurlyMembersCouponList({ couponList }: Props) {
  return (
    <Wrapper>
      {couponList.map(({ couponType, couponDescription, couponValue, couponTagList, duplicateCoupons }, index) => (
        <CouponList key={`coupon-${couponDescription}-${index}}`}>
          <CouponListWrapper>
            <CouponName>
              {makeBenefitText({
                benefitInfo: {
                  type: couponType,
                  value: couponValue,
                },
              })}
              {duplicateCoupons.length > 0 && ` ${duplicateCoupons.length + 1}장`}
            </CouponName>
            <CouponTagWrapper>
              {couponTagList.map((tag) => (
                <CouponTag key={`coupon-${couponDescription}-${tag}-${index}}`}>{tag}</CouponTag>
              ))}
            </CouponTagWrapper>
          </CouponListWrapper>
          <CouponCondition>{couponDescription}</CouponCondition>
        </CouponList>
      ))}
    </Wrapper>
  );
}
