import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';

import { PurpleArrowRight } from '../../../../shared/images';
import COLOR from '../../../../shared/constant/colorset';

import ProductCouponBannerModal from './ProductCouponBannerModal';

import { postCouponAccessKey } from '../../../../shared/api/product/coupon';
import { useAppSelector } from '../../../../shared/store';
import { redirectToLogin } from '../../../../shared/reducers/page';
import Alert from '../../../../shared/components/Alert/Alert';
import { CouponBannerType, ProductCouponBannerExtraInfo } from '../../../../../libs/coupon/banner/types';
import { isPC } from '../../../../../util/window/getDevice';

const Button = styled.button`
  width: 350px;
  height: 44px;
  margin-top: ${isPC ? '20px' : '16px'};
  border: 1px solid ${COLOR.loversLavender};
  border-radius: 4px;
`;

const Text = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLOR.kurlyPurple};
  font-size: 15px;
  font-weight: 500;

  &:after {
    content: '';
    background: url(${PurpleArrowRight}) 0 0 no-repeat;
    background-size: 9px 18px;
    width: 9px;
    height: 18px;
    margin-left: 4px;
  }
`;

const pcCouponBannerStyle = css`
  .modal-container {
    width: 440px;
    .title {
      color: ${COLOR.kurlyGray800};
      line-height: 32px;
      margin-bottom: 18px;
      padding: 30px 30px 0;
    }
    .coupon-name {
      letter-spacing: -0.5px;
    }
    .expiration-text {
      letter-spacing: -0.5px;
    }
    .benefit-list {
      font-size: 13px;
    }
  }
`;

const mobileCouponBannerStyle = css`
  .MuiDialog-paper {
    width: 100%;
    margin: 24px;
  }
  .MuiDialogContent-root {
    overflow: hidden;
  }
  .modal-container {
    padding: 23px 24px 0;
    .title {
      font-weight: 600;
      font-size: 18px;
      line-height: 23px;
      letter-spacing: 0;
      margin-bottom: 16px;
    }
    .coupon-wrap {
      width: 100%;
      padding: 16px 20px 11px;
      .discount-benefit-text {
        font-weight: 300;
      }
      .coupon-name {
        font-weight: 600;
      }
      .expiration-text {
        font-weight: 400;
      }
    }
    .benefit-list {
      font-size: 13px;
    }
    .confirm-button {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 56px;
      padding: 0;
      font-size: 18px;
      font-weight: 600;
    }
  }
`;

interface Props {
  type: CouponBannerType;
  bannerName: string;
  bannerLink: string | null;
  couponAccessKey: string | null;
  extraInfo: ProductCouponBannerExtraInfo | null;
}

export default function ProductCouponBanner({ type, bannerName, bannerLink, couponAccessKey, extraInfo }: Props) {
  const { isGuest } = useAppSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [couponModalMessage, setCouponModalMessage] = useState('쿠폰이 다운로드 되었습니다.');

  const handleClickBanner = async () => {
    switch (type) {
      case 'DOWNLOAD_COUPON': {
        if (isGuest) {
          dispatch(redirectToLogin());
          return;
        }

        if (!couponAccessKey) {
          return;
        }

        try {
          const { message } = await postCouponAccessKey(couponAccessKey);

          if (message === '유효하지 않은 쿠폰 링크입니다.') {
            await Alert({ text: message });
            return;
          }

          setOpen(true);
          setCouponModalMessage(message);
        } catch (err) {
          await Alert({ text: err.message });
        }
        break;
      }
      case 'DIRECT': {
        if (!bannerLink) {
          return;
        }
        window.location.assign(bannerLink);
        break;
      }
    }
  };

  const handleClickModalConfirm = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Button className="coupon-banner-button" onClick={handleClickBanner}>
        <Text>{bannerName}</Text>
      </Button>
      {type === 'DOWNLOAD_COUPON' && extraInfo && (
        <ProductCouponBannerModal
          style={isPC ? pcCouponBannerStyle : mobileCouponBannerStyle}
          open={open}
          couponModalMessage={couponModalMessage}
          extraInfo={extraInfo}
          onClickConfirm={handleClickModalConfirm}
        />
      )}
    </>
  );
}
