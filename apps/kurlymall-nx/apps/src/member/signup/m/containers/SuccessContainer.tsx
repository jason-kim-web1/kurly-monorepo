import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { vars } from '@thefarmersfront/kpds-css';

import Button from '../../../../shared/components/Button/Button';
import { useAppSelector } from '../../../../shared/store';
import useSuccessSignup from '../../hook/useSuccessSignup';
import NextImage from '../../../../shared/components/NextImage';
import { CartCoupon } from '../../../../shared/images';
import Alert from '../../../../shared/components/Alert/Alert';
import { redirectTo } from '../../../../shared/reducers/page';
import { CART_PATH, USER_MENU_PATH } from '../../../../shared/constant';
import { BTN_TEXT } from '../../constants';
import {
  BtnTextType,
  Landing_Type,
  logSelectSignUpSuccessButton,
  logSelectSignUpSuccessPopup,
} from '../../shared/utils/amplitude';
import COLOR from '../../../../shared/constant/colorset';
import Loading from '../../../../shared/components/Loading/Loading';
import useCartRefreshQuery from '../../../../order/cart/queries/useCartRefreshQuery';

const Buttons = styled.div`
  display: flex;
  gap: 8px;

  button {
    &.black {
      background-color: ${vars.color.$black};
      color: ${vars.color.$white};
    }
    &.gray {
      background-color: #eceff3;
      color: ${vars.color.$black};
    }
    &.white {
      color: ${vars.color.$black};
      background-color: ${vars.color.$white};
    }
  }
`;

const SignUpSuccessContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 48px 20px 16px;
  display: flex;
  flex-direction: column;
  position: relative;

  .header-text {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__title {
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      color: ${COLOR.benefitGray};

      &__name {
        color: ${COLOR.loversLavender};
      }
    }

    &__description {
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      color: ${COLOR.benefitTextGray};
    }
  }

  .cart-coupon {
    margin-top: 32px;
    padding: 32px 16px 24px;

    border-radius: 12px;
    background-color: #f2f5f8;

    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;

    &__notice {
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      color: ${COLOR.benefitTextGray};

      li {
        position: relative;
        padding-left: 6px;

        &::after {
          content: '';
          position: absolute;
          left: -6px;
          top: 9px;
          height: 4px;
          width: 4px;
          background-color: #cbd1d7;
          border-radius: 50%;
        }
      }

      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__bold {
      font-weight: 600;
    }
  }

  .benefit-buttons {
    position: fixed;
    width: calc(100vw - 32px);
    bottom: calc(44px + 16px + env(safe-area-inset-bottom));
    margin-left: -4px;

    &__btn {
      font-size: 18px;
      font-weight: 600;
      line-height: 26px;
    }
  }
`;

const PopupCouponDownload = styled.div`
  display: flex;
  flex-direction: column;

  .pop-coupon-download {
    &__msg {
      display: flex;
      flex-direction: column;
      gap: 8px;

      margin-top: 8px;
      padding-bottom: 20px;
    }
    &__title {
      font-size: 18px;
      font-weight: 600;
      line-height: 26px;
      color: ${COLOR.benefitGray};
    }

    &__description {
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      color: ${COLOR.mainSecondary};
    }

    &__btns {
      flex-direction: column;

      margin: 8px -8px 16px;
    }

    &__btn {
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      color: ${COLOR.benefitTextGray};
    }
  }
`;

const SuccessContainer = () => {
  const { name } = useAppSelector(({ member }) => ({
    name: member.info?.name,
  }));

  const { data: cartItems } = useCartRefreshQuery();

  const dispatch = useDispatch();

  const { isReady } = useRouter();

  const { handleClickEventButton, handleClickCouponDownload } = useSuccessSignup();

  const handleLogAmplitude = (type: 'button' | 'popup', message: BtnTextType, callback: () => void) => () => {
    const params: { message: BtnTextType; landing_type: Landing_Type } = {
      message,
      landing_type: null,
    };

    switch (message) {
      case BTN_TEXT.CONTINUE_SHOPPING:
        params.landing_type = cartItems.length > 0 ? 'cart' : 'home';
        break;
      case BTN_TEXT.CHECK_BENEFITS:
        params.landing_type = type === 'popup' ? 'event_page' : null;
        break;
      default:
    }

    if (type === 'button') {
      logSelectSignUpSuccessButton(params);
    } else if (params.landing_type) {
      logSelectSignUpSuccessPopup(params);
    }

    callback?.();
  };

  const handleContinueShopping = () => {
    let url = USER_MENU_PATH.home.uri;
    if (cartItems.length > 0) {
      url = CART_PATH.cart.uri;
    }

    dispatch(redirectTo({ url }));
  };

  const handleCouponDownload = async () => {
    try {
      const { type, message } = await handleClickCouponDownload();

      if (type !== 'success') {
        await Alert({ text: message });
        return;
      }

      await Alert({
        contentsStyle: `
          .swal2-popup {
            width: 280px;
          }
        `,
        contents: (
          <PopupCouponDownload>
            <div className="pop-coupon-download__msg">
              <div className="pop-coupon-download__title">쿠폰받기 완료</div>
              <div className="pop-coupon-download__description">
                모든 쿠폰을 다운 받았습니다.
                <br />
                즐거운 쇼핑되세요!
              </div>
            </div>
            <Buttons className="pop-coupon-download__btns">
              <Button
                text={BTN_TEXT.CONTINUE_SHOPPING}
                onClick={handleLogAmplitude('popup', BTN_TEXT.CONTINUE_SHOPPING, handleContinueShopping)}
                className="pop-coupon-download__btn black"
                radius={12}
                height={48}
              />
              <Button
                text={BTN_TEXT.CHECK_BENEFITS}
                onClick={handleLogAmplitude('popup', BTN_TEXT.CHECK_BENEFITS, handleClickEventButton)}
                className="pop-coupon-download__btn white"
                radius={12}
                height={48}
              />
            </Buttons>
          </PopupCouponDownload>
        ),
        showCancelButton: false,
        showConfirmButton: false,
      });
    } catch (err) {
      await Alert({ text: (err as { type: string; message: string }).message });
    }
  };

  if (!isReady) {
    return <Loading />;
  }

  return (
    <SignUpSuccessContainer>
      <div className="header-text">
        {name && (
          <div className="header-text__title">
            <span className="header-text__title__name">{name}님</span>
            <br />
            컬리에 오신 것을 환영합니다!
          </div>
        )}
        <div className="header-text__description">컬리의 다양한 혜택을 이용해보세요!</div>
      </div>
      <div className="cart-coupon">
        <button
          className="cart-coupon__download"
          onClick={handleLogAmplitude('button', '쿠폰다운로드', handleCouponDownload)}
        >
          <NextImage className="cart-coupon__image" src={CartCoupon} width={191} height={117} />
        </button>
        <ul className="cart-coupon__notice">
          <li>
            컬리가 처음인 고객님께만 드리는 1만원 쿠폰 <br />
            (단, 쿠폰 다운로드 후 3일이내 사용)
          </li>
          <li>자세한 내용은 이벤트 상세에서 확인해주세요.</li>
        </ul>
      </div>
      <Buttons className="benefit-buttons">
        <Button
          text={BTN_TEXT.CHECK_BENEFITS}
          onClick={handleLogAmplitude('button', BTN_TEXT.CHECK_BENEFITS, handleClickEventButton)}
          className="benefit-buttons__btn black"
          radius={12}
          height={56}
        />
      </Buttons>
    </SignUpSuccessContainer>
  );
};

export default SuccessContainer;
