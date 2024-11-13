import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogActions, createStyles, makeStyles } from '@material-ui/core';
import styled from '@emotion/styled';

import { CheckoutCoupon } from '../../../../../../shared/interfaces';

import CouponRadio from './CouponRadio';
import Radio from '../../../../../../shared/components/Input/Radio';
import Button from '../../../../../../shared/components/Button/Button';
import COLOR from '../../../../../../shared/constant/colorset';
import { MEMBERS_BANNER } from '../../../../shared/constants/kurly-members-banner';
import useMembersBanner from '../../../../../shared/shared/hooks/useMembersBanner';
import { KurlyMembersBanner } from '../../../../shared/components/KurlyMembersBanner';
import { SortCouponType } from '../../../../../../shared/utils/getDuplicateCoupons';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      borderRadius: '12px',
      boxShadow: 'none',
    },
    paperScrollPaper: {
      margin: '24px',
      width: 'calc(100% - 48px)',
    },
    body: {
      padding: '24px 24px 6px !important',
    },
    footer: {
      padding: '8px 16px 16px',
    },
  }),
);

const buttonStyles = {
  button: {
    '> span': {
      fontWeight: 600,
    },
  },
};

const Label = styled.div`
  padding: 6px 0;
  font-size: 17px;
  color: ${COLOR.kurlyGray800};
`;

const CouponWrapper = styled.div`
  padding-top: 6px;
`;

const DialogTitle = styled.strong`
  display: block;
  padding-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
  color: ${COLOR.kurlyGray800};
`;

const NoCouponLabel = <Label>쿠폰 적용 안함</Label>;

interface Props {
  couponList: CheckoutCoupon[];
  selectedCoupon?: CheckoutCoupon;
  open: boolean;
  onConfirm(coupon?: CheckoutCoupon): void;
  onClose(): void;
}

const BannerWrapper = styled.div`
  margin: 8px 0 4px;
`;

export default function CouponModal({ couponList, selectedCoupon, open, onConfirm, onClose }: Props) {
  const styles = useStyles();
  const [currentCoupon, setCurrentCoupon] = useState(selectedCoupon);
  const { membersBanner, goToMembership } = useMembersBanner({ bannerType: MEMBERS_BANNER.MO_COUPON_LIST });

  const handleConfirmButton = () => {
    onConfirm(currentCoupon);
    onClose();
  };

  const handleChange = (coupon: CheckoutCoupon) => {
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
      <DialogContent className={styles.body}>
        <DialogTitle>쿠폰선택</DialogTitle>
        {membersBanner && (
          <BannerWrapper>
            <KurlyMembersBanner membersBanner={membersBanner} handleClick={goToMembership} />
          </BannerWrapper>
        )}
        <Radio
          value="-1"
          selectedValue={currentCouponCode}
          id="not-using-coupon"
          name="checkout-coupon"
          label={NoCouponLabel}
          onChange={() => setCurrentCoupon(undefined)}
        />
        <CouponWrapper>
          {couponList.map((coupon) => {
            const { couponCode } = coupon;
            return (
              <CouponRadio
                key={couponCode}
                coupon={coupon as SortCouponType<CheckoutCoupon>}
                selectedCouponCode={currentCouponCode}
                onChange={() => handleChange(coupon)}
              />
            );
          })}
        </CouponWrapper>
      </DialogContent>
      <DialogActions className={styles.footer}>
        <Button text="취소" theme="tertiary" onClick={onClose} css={buttonStyles.button} height={48} radius={6} />
        <Button text="확인" onClick={handleConfirmButton} css={buttonStyles.button} height={48} radius={6} />
      </DialogActions>
    </Dialog>
  );
}
