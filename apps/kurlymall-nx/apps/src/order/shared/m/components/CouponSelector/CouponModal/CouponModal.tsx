import { Dialog, DialogContent, DialogActions, createStyles, makeStyles } from '@material-ui/core';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import CouponRadio from './CouponRadio';
import Radio from '../../../../../../shared/components/Input/Radio';
import Button from '../../../../../../shared/components/Button/Button';

import { CheckoutCoupon } from '../../../../../../shared/interfaces';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      borderRadius: '12px',
    },
    paperScrollPaper: {
      margin: '24px',
      width: 'calc(100% - 48px)',
    },
    body: {
      height: 314,
      padding: '0 24px',
    },
    footer: {
      padding: '16px',
    },
  }),
);

const Label = styled.div`
  padding: 4px 0;
  font-size: 16px;
`;

const CouponWrapper = styled.div`
  padding-top: 6px;
`;

const DialogTitle = styled.strong`
  padding: 24px 24px 20px;
  font-size: 18px;
  font-weight: bold;
`;

const NoCouponLabel = <Label>쿠폰 적용 안함</Label>;

interface Props {
  couponList: CheckoutCoupon[];
  selectedCoupon?: CheckoutCoupon;
  open: boolean;
  onConfirm(coupon?: CheckoutCoupon): void;
  onClose(): void;
}

export default function CouponModal({ couponList, selectedCoupon, open, onConfirm, onClose }: Props) {
  const styles = useStyles();
  const [currentCoupon, setCurrentCoupon] = useState(selectedCoupon);

  const handleConfirmButton = () => {
    onConfirm(currentCoupon);
    onClose();
  };

  const handleChange = (code: string) => {
    const coupon = couponList.find((it) => it.couponCode === code);
    setCurrentCoupon(coupon);
  };

  const currentCouponCode = currentCoupon?.couponCode ?? '-1';

  useEffect(() => {
    setCurrentCoupon(selectedCoupon);
  }, [open]);

  return (
    <Dialog
      open={open}
      transitionDuration={0}
      classes={{
        paper: styles.paper,
        paperScrollPaper: styles.paperScrollPaper,
      }}
    >
      <DialogTitle>쿠폰선택</DialogTitle>
      <DialogContent className={styles.body}>
        <Radio
          value="-1"
          selectedValue={currentCouponCode}
          id="not-using-coupon"
          name="checkout-cart-coupon"
          label={NoCouponLabel}
          onChange={() => setCurrentCoupon(undefined)}
        />
        <CouponWrapper>
          {couponList.map((coupon) => {
            const { couponCode } = coupon;
            return (
              <CouponRadio
                key={couponCode}
                coupon={coupon}
                selectedCouponCode={currentCouponCode}
                onChange={handleChange}
              />
            );
          })}
        </CouponWrapper>
      </DialogContent>
      <DialogActions className={styles.footer}>
        <Button text="취소" theme="tertiary" onClick={onClose} />
        <Button text="확인" onClick={handleConfirmButton} />
      </DialogActions>
    </Dialog>
  );
}
