import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { useMemo } from 'react';

import { Coupon, CouponPack, KurlyMembersCouponPackCodeType } from '../interfaces/KurlyMembersProduct.interface';

import Radio from '../../../shared/components/Input/Radio';

import useToggle from '../../checkout/shared/hooks/useToggle';
import { ArrowDown } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

import KurlyMembersCouponList from './KurlyMembersCouponList';
import { HandleChangeCouponParams } from './KurlyMembersCoupon';
import getDuplicateCoupons from '../../../shared/utils/getDuplicateCoupons';

const CouponWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RadioTouchWrapper = styled.div`
  flex: 1;
  margin-right: 12px;
`;

const DropdownTouchWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 44px;
  min-height: 44px;
  cursor: pointer;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg) scaleX(-1);
    `};
`;

const CouponLabel = styled.div`
  display: flex;
  align-items: center;
  margin-left: -2px;
`;

const CouponPackName = styled.span`
  color: ${COLOR.kurlyGray800};
  font-size: 16px;
  font-weight: 600;
`;

const CouponPackDescription = styled.span`
  color: ${COLOR.kurlymembers};
  font-size: 13px;
  font-weight: 600;
  padding-left: 10px;
`;

const style = {
  radio: css`
    cursor: pointer;

    > span {
      font-size: 14px;
    }

    padding: 12px 0;
  `,
};

interface Props {
  coupons: CouponPack;
  selectedCouponCode: KurlyMembersCouponPackCodeType;
  handleChange: ({ couponPackId, couponPackCode }: HandleChangeCouponParams) => void;
}

export default function KurlyMembersCouponPack({ coupons, selectedCouponCode, handleChange }: Props) {
  const { couponPackId, couponPackCode, couponPackName, couponPackDescription, couponList } = coupons;
  const { isOpen, toggle } = useToggle(true);

  const duplicateCoupons = useMemo(
    () =>
      getDuplicateCoupons<Coupon>({
        coupons: couponList,
        keyProperty: ['couponType', 'couponDescription', 'couponValue'],
        typeProperty: 'couponType',
      }),
    [couponList],
  );

  return (
    <div>
      <CouponWrapper>
        <RadioTouchWrapper>
          <Radio
            label={
              <CouponLabel>
                <CouponPackName>{couponPackName}</CouponPackName>
                <CouponPackDescription>{couponPackDescription}</CouponPackDescription>
              </CouponLabel>
            }
            value={couponPackCode}
            name="couponPackType"
            id={couponPackId}
            onChange={() => handleChange({ couponPackId, couponPackCode })}
            selectedValue={selectedCouponCode}
            css={style.radio}
          />
        </RadioTouchWrapper>
        <DropdownTouchWrapper onClick={toggle} isOpen={isOpen}>
          <ArrowDown
            stroke={COLOR.kurlyGray450}
            height={24}
            width={24}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.3}
          />
        </DropdownTouchWrapper>
      </CouponWrapper>
      {isOpen && <KurlyMembersCouponList couponList={duplicateCoupons} />}
    </div>
  );
}
