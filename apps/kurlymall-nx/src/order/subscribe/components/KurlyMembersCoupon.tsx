import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { head, isEmpty } from 'lodash';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import { isPC } from '../../../../util/window/getDevice';
import COLOR from '../../../shared/constant/colorset';

import useKurlyMembersCheckout from '../hooks/useKurlyMembersCheckout';
import KurlyMembersCouponPack from './KurlyMembersCouponPack';

import { setSelectedCouponPack } from '../reducers/subscribeCheckout.slice';
import { KurlyMembersCouponPackCodeType } from '../interfaces/KurlyMembersProduct.interface';
import { useAppSelector } from '../../../shared/store';

const Wrapper = styled.div`
  padding: 18px 18px 0;
  border-bottom: 8px solid ${COLOR.bg};

  ${isPC &&
  css`
    padding: 18px 30px 8px;
    border-bottom-width: 1px;
  `}
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 8px;
`;

const CouponWrapper = styled.div`
  ${!isPC && `padding: 8px 0;`}

  > div:first-of-type {
    border-bottom: 1px solid ${COLOR.bgLightGray};
    padding-bottom: 4px;
  }

  > div:last-of-type {
    padding-top: 4px;
  }
`;

export interface HandleChangeCouponParams {
  couponPackId: number;
  couponPackCode: KurlyMembersCouponPackCodeType;
}

export default function KurlyMembersCoupon() {
  const dispatch = useDispatch();
  const { couponPackList } = useKurlyMembersCheckout();
  const selectedCouponCode = useAppSelector(
    ({ subscribeCheckout }) => subscribeCheckout.selectedCouponPack?.couponPackCode,
  );

  useEffect(() => {
    const defaultCouponPack = head(couponPackList);

    if (defaultCouponPack) {
      dispatch(
        setSelectedCouponPack({
          couponPackId: defaultCouponPack.couponPackId,
          couponPackCode: defaultCouponPack.couponPackCode,
        }),
      );
    }
  }, [couponPackList, dispatch]);

  if (isEmpty(couponPackList) || !selectedCouponCode) {
    return null;
  }

  const handleChange = ({ couponPackId, couponPackCode }: HandleChangeCouponParams) =>
    dispatch(setSelectedCouponPack({ couponPackId, couponPackCode }));

  return (
    <Wrapper>
      <Title>컬리멤버스 쿠폰팩</Title>
      <CouponWrapper>
        {couponPackList.map((coupons) => (
          <KurlyMembersCouponPack
            key={coupons.couponPackId}
            coupons={coupons}
            selectedCouponCode={selectedCouponCode}
            handleChange={handleChange}
          />
        ))}
      </CouponWrapper>
    </Wrapper>
  );
}
