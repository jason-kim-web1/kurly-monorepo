import styled from '@emotion/styled';
import { Dialog, DialogContent } from '@material-ui/core';

import { css, SerializedStyles } from '@emotion/react';

import { isEmpty } from 'lodash';

import { DialogActions } from '@mui/material';

import COLOR from '../../../../shared/constant/colorset';
import { ProductCouponBannerExtraInfo } from '../../../../../libs/coupon/banner/types';
import { isPC } from '../../../../../util/window/getDevice';

const Container = styled.div`
  &.modal-container {
    .confirm-button {
      font-size: 16px;
    }
  }
`;

const DialogTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -1px;
  margin-bottom: 24px;
  color: ${COLOR.kurlyGray800};
`;

const Content = styled.div`
  padding-bottom: 16px;
  ${isPC && 'padding: 0 30px;'}
`;

const CouponWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px 12px;
  width: 380px;
  background-color: ${COLOR.loversWhite};
  border-radius: 3px;
  color: ${COLOR.kurlyWhite};
`;

const DiscountBenefitText = styled.span`
  font-size: 36px;
  font-weight: 300;
  margin-bottom: 10px;
  line-height: 38px;
`;

const CouponName = styled.span`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
  line-height: 20px;
`;

const Separator = styled.div`
  position: relative;
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: -6px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: ${COLOR.kurlyWhite};
  }
  &:before {
    right: -25px;
  }
  &:after {
    left: -25px;
  }
`;

const ExpirationDateTime = styled.span`
  font-size: 13px;
  font-weight: 300;
  margin-top: 10px;
  line-height: 18px;
`;

const BenefitList = styled.ul`
  margin-top: 10px;
`;

const BenefitListItem = styled.li`
  color: ${COLOR.kurlyGray450};
  display: flex;
  align-items: center;
  line-height: 18px;
  &:before {
    content: '';
    width: 3px;
    height: 3px;
    margin-right: 8px;
    border-radius: 100%;
    background-color: ${COLOR.placeholder};
  }
`;

const Button = styled.button`
  height: 57px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.kurlyPurple};
`;

const modalStyle = css`
  .MuiDialogContent-root {
    overflow: hidden;
    padding: 0;
  }
  .MuiPaper-elevation24 {
    box-shadow: none;
  }
  .MuiPaper-rounded {
    border-radius: 12px;
  }
  .MuiDialogActions-root {
    border-top: 1px solid ${COLOR.bgLightGray};
    padding: 0;
  }
`;

interface Props {
  open: boolean;
  couponModalMessage: string;
  extraInfo: ProductCouponBannerExtraInfo;
  onClickConfirm(): void;
  style?: SerializedStyles;
}

export default function ProductCouponBannerModal({
  open,
  couponModalMessage,
  extraInfo,
  onClickConfirm,
  style,
}: Props) {
  const {
    discountPercentage,
    discountPrice,
    benefitText,
    couponName,
    expirationText,
    discountBenefit,
    specificBenefits,
  } = extraInfo;

  const getDiscountBenefitText = (): string => {
    if (discountPercentage) {
      return `${discountPercentage}%`;
    }
    if (discountPrice) {
      return `${discountPrice}원`;
    }
    return benefitText ?? '';
  };

  return (
    <Dialog open={open} css={[style, modalStyle]}>
      <Container className="modal-container">
        <DialogTitle className="title">{couponModalMessage}</DialogTitle>
        <DialogContent>
          <Content>
            <CouponWrap className="coupon-wrap">
              <DiscountBenefitText className="discount-benefit-text">{getDiscountBenefitText()}</DiscountBenefitText>
              <CouponName className="coupon-name">{couponName}</CouponName>
              <Separator />
              <ExpirationDateTime className="expiration-text">{expirationText}</ExpirationDateTime>
            </CouponWrap>
            {(discountBenefit || !isEmpty(specificBenefits)) && (
              <BenefitList className="benefit-list">
                {discountBenefit && <BenefitListItem>{discountBenefit}</BenefitListItem>}
                {!isEmpty(specificBenefits) && <BenefitListItem>{specificBenefits.join(' ,')}</BenefitListItem>}
              </BenefitList>
            )}
          </Content>
        </DialogContent>
        <DialogActions>
          <Button className="confirm-button" type="button" onClick={onClickConfirm}>
            확인
          </Button>
        </DialogActions>
      </Container>
    </Dialog>
  );
}
