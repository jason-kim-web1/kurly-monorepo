import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import InputBox from '../../../../shared/components/Input/InputBox';
import Button from '../../../../shared/components/Button/Button';
import useCouponRegister from '../hooks/useCouponRegister';
import { isPC } from '../../../../../util/window/getDevice';

const CouponRegisterWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;

  .inner-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100% - 48px);
    margin: 0 auto;
    padding: 19px 17px 16px;
    border-radius: 12px;
    background: ${COLOR.kurlyWhite};
    transform: translate(-50%, -50%);
  }
  .title {
    margin-bottom: 13px;
    padding: 0 7px;
    font-weight: 500;
    line-height: 1.6;
    font-size: 22px;
  }
  .input-wrapper {
    padding: 0 7px;
  }
  .input-guide {
    font-size: 12px;
    line-height: 1.5;
    color: ${COLOR.kurlyGray450};
  }
  .button-wrapper {
    margin-top: 25px;
    display: flex;

    button {
      height: 48px;
      font-weight: 600;
      font-size: 16px;
      border-radius: 6px;
      border: 1px solid ${COLOR.lightGray};
      background-color: ${COLOR.kurlyWhite};
      color: ${COLOR.kurlyGray800};
      width: 100%;
    }

    button + button {
      border-color: ${COLOR.kurlyPurple};
      background-color: ${COLOR.kurlyPurple};
      color: ${COLOR.kurlyWhite};
      margin-left: 8px;
    }
  }

  &.pc {
    .inner-wrapper {
      width: 320px;
    }
  }
`;

interface Props {
  closeCouponModal: () => void;
}

export default function CouponRegisterModal({ closeCouponModal }: Props) {
  const { couponKey, onChangeCouponKey, addCoupon } = useCouponRegister();

  return (
    <CouponRegisterWrapper className={isPC ? 'pc' : 'mobile'}>
      <div className="inner-wrapper">
        <div className="title">쿠폰 등록</div>
        <div className="input-wrapper">
          <InputBox placeholder="발급된 쿠폰번호를 입력해 주세요" onChange={onChangeCouponKey} value={couponKey} />
        </div>
        <p className="input-guide">{"쿠폰에 하이픈 '-'이 포함되어 있을 경우, 하이픈 '-'을 반드시 입력해주세요."}</p>
        <div className="button-wrapper">
          <Button text="취소" onClick={closeCouponModal} />
          <Button text="확인" onClick={() => addCoupon(closeCouponModal)} />
        </div>
      </div>
    </CouponRegisterWrapper>
  );
}
