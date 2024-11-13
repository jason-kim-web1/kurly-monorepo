import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { Typography } from '@thefarmersfront/kpds-react';
import { vars } from '@thefarmersfront/kpds-css';

import { ParsedUrlQuery } from 'querystring';

import MobileFooter from '../../../../shared/components/layouts/MobileFooter';

import { isPC, isWebview } from '../../../../../util/window/getDevice';
import AddButton from '../../../common/AddButton';
import CouponRegisterModal from './CouponRegisterModal';
import useToggle from '../../../../order/checkout/shared/hooks/useToggle';
import PlusIcon from '../../../../shared/icons/PlusIcon';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectCouponRegisterButton } from '../../../../shared/amplitude/events/coupon';

const ButtonWrap = styled.div`
  position: absolute;
  top: -46px;
  right: 0;
`;

const MobileAddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 12px 20px;
  border: 1px solid ${vars.color.$purple900};
  border-radius: ${vars.spacing.$12};
  background-color: ${vars.color.$white};
  color: ${vars.color.$purple900};

  > svg {
    margin-right: 6px;
  }
`;

export default function CouponRegister() {
  const { query } = useRouter();

  const { isOpen, open, close } = useToggle();

  const { couponNo } = query as ParsedUrlQuery & { couponNo?: string };

  const handleClickRegister = () => {
    open();
    amplitudeService.logEvent(new SelectCouponRegisterButton());
  };

  useEffect(() => {
    if (couponNo) {
      open();
    }
  }, [couponNo, open]);

  return (
    <>
      {isPC ? (
        <ButtonWrap>
          <AddButton name="쿠폰 등록" onClick={handleClickRegister} />
        </ButtonWrap>
      ) : (
        <MobileFooter hasUserMenu={!isWebview()} transparent>
          <MobileAddButton onClick={handleClickRegister}>
            <PlusIcon fill={vars.color.$purple900} />
            <Typography variant="$xxlargeSemibold">쿠폰 등록</Typography>
          </MobileAddButton>
        </MobileFooter>
      )}
      {isOpen && <CouponRegisterModal closeCouponModal={close} />}
    </>
  );
}
