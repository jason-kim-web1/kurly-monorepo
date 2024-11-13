import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

export const calculateWidth = (value: number) => `calc(${value} / var(--width) * 100vw)`;

const bgDarkPurple = '#1e0133';
const purple = '#57247d';
const bgLightPurple = '#D7C9E1';

const fontWhite = '#f3f2ee';
const bgWhite = '#fbfaf7';

const btnDarkPurple = '#431664';
const textWhite = '#ffffff';

const pcMinWidth = '1050px';

export const WrappedGiftDelivery = styled.div`
  width: 100%;

  background-color: ${bgDarkPurple};

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  .privacy-agreement {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 ${calculateWidth(50)} ${calculateWidth(60)};

    button {
      background: url('https://res.kurly.com/images/member-lounges/0701/m/VVIP_mo_02-3.png') 0 0 no-repeat;
      background-size: contain;

      width: 100%;
      height: ${calculateWidth(90)};

      color: ${COLOR.kurlyBlack};
      font-size: ${calculateWidth(29)};
    }
  }

  .register-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 ${calculateWidth(50)} ${calculateWidth(100)};

    .title {
      background-color: ${purple};
      height: ${calculateWidth(88)};
      width: 100%;

      color: ${fontWhite};
      font-size: ${calculateWidth(30)};
      font-weight: 600;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .form {
      background-color: ${bgWhite};
      padding: 0 ${calculateWidth(40)};

      .div-title {
        display: flex;
        align-self: flex-start;
        width: ${calculateWidth(286)};

        &__03 {
          width: ${calculateWidth(338)};
        }
      }

      .div-saved-data {
        font-size: ${calculateWidth(28)};
        line-height: ${calculateWidth(38)};
        font-weight: 400;

        width: 100%;
        padding: ${calculateWidth(13)} 0 ${calculateWidth(40)} ${calculateWidth(72)};
      }

      .section-submit {
        padding: ${calculateWidth(20)} 0 ${calculateWidth(70)} 0;
        border-bottom: 1px solid ${purple};

        button {
          border-radius: 6px;
          background: ${btnDarkPurple};

          width: 100%;
          height: ${calculateWidth(90)};

          color: ${textWhite};
          text-align: center;
          font-size: ${calculateWidth(31)};
          font-weight: 500;
        }
      }
    }

    .notice > div {
      padding: 0 0 0;
      margin: ${calculateWidth(30)} auto ${calculateWidth(83)};
      &:before {
        height: 0;
      }
    }
  }

  &.pc {
    .privacy-agreement {
      width: ${pcMinWidth};
      margin: 0 auto;
      padding-bottom: 50px;

      button {
        width: 800px;
        height: 60px;
        margin: 0 auto;
        font-size: 20px;
        background-image: url('https://res.kurly.com/images/member-lounges/0701/pc/VVIP_pc_02-3.png');
        background-size: auto;
      }
    }

    .register-form {
      width: ${pcMinWidth};
      margin: 0 auto;
      padding-bottom: 100px;

      .title {
        width: 800px;
        height: 54px;
        margin: 0 auto;
        font-size: 21px;
        line-height: 30px;
      }

      .form {
        width: 800px;
        margin: 0 auto;
        padding: 0 57px;

        section:not(:first-of-type) .div-saved-data {
          padding-bottom: 28px;
        }

        .div-saved-data {
          padding: 6px 0 23px 0;
          font-weight: 300;
          font-size: 20px;
          line-height: 30px;
        }

        .div-title {
          width: 200px;
          margin: 0 0 4px -47.5px;
          &__03 {
            width: 235px;
          }
        }

        .section-submit {
          padding: 3px 0 51px 78px;

          button {
            height: 68px;

            font-size: 20px;
            font-weight: 400;
          }
        }
      }

      .notice > div {
        width: 100%;
        margin: 30px auto 50px;
      }
    }
  }
`;

export const StyledDeliveryMethod = styled.section`
  width: 100%;
  padding: ${calculateWidth(59)} 0 0 0;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  border-bottom: 1px solid ${purple};

  .div-method-buttons {
    display: flex;
    align-items: items;
    justify-content: space-between;

    width: 100%;
    padding: ${calculateWidth(35)} 0 ${calculateWidth(39)} 0;

    button {
      border-radius: ${calculateWidth(6)};
      background: ${bgLightPurple};

      color: ${purple};
      font-size: ${calculateWidth(30)};
      font-weight: 400;
      width: ${calculateWidth(176)};
      height: ${calculateWidth(90)};

      &.selected {
        background-color: ${btnDarkPurple};
        color: ${textWhite};
      }

      .bold {
        font-weight: 600;
      }
    }
  }

  .div-guide {
    width: 100%;
    display: flex;
    flex-direction: column;

    padding-bottom: ${calculateWidth(81)};

    .div-guide-title {
      color: ${purple};
      font-size: ${calculateWidth(26)};
      line-height: ${calculateWidth(38)};
      font-weight: 700;

      padding-bottom: ${calculateWidth(21)};
    }

    .div-guide-content {
      display: flex;
      flex-direction: row;
      align-items: flex-start;

      & > div {
        font-size: ${calculateWidth(24)};
        line-height: ${calculateWidth(36)};
        font-weight: 400;
        letter-spacing: -0.3px;

        &:first-of-type {
          color: ${purple};
          font-size: ${calculateWidth(25)};
          font-weight: 600;
          letter-spacing: -0.75px;

          flex: 0 0 ${calculateWidth(89)};
        }
      }
    }
  }

  &.pc {
    padding: 32px 0 0 79px;

    .div-method-buttons {
      padding: 18px 0 28px;

      button {
        width: 191px;
        height: 57px;
        font-size: 20px;
        line-height: 30px;
      }
    }

    .div-guide {
      padding: 17px 0 32px;
      border-top: 1px solid rgba(67, 22, 100, 0.2);

      .div-guide-title {
        padding: 0;
        font-weight: 600;
        font-size: 18px;
        line-height: 30px;
        letter-spacing: -0.7px;
      }

      .div-guide-content {
        margin-top: 2px;
        & > div {
          font-size: 16px;
          line-height: 30px;
          letter-spacing: -0.5px;
          font-weight: 300;

          &:first-of-type {
            font-weight: 600;

            flex: 0 0 61px;
          }
        }
      }
    }
  }
`;

export const StyledDeliveryCalendar = styled.section`
  width: 100%;

  padding: ${calculateWidth(47)} 0 0;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  .exclude-date {
    position: relative;
  }
  .exclude-date::after {
    position: absolute;
    width: 22px;
    height: 2px;
    background-color: ${COLOR.kurlyPurple};
    content: '';
  }

  &.edit {
    & .div-calendar {
      padding-bottom: ${calculateWidth(60)};
    }

    & + section:not(.section-submit) {
      margin-top: ${calculateWidth(22)};
    }

    & + .section-submit {
      padding-top: 0 !important;
    }
  }

  .div-calendar {
    padding: ${calculateWidth(47)} 0 ${calculateWidth(40)} 0;
    &,
    & * {
      font-family: 'Noto Sans KR', 'malgun gothic', '맑은 고딕', sans-serif;
    }
  }

  .react-datepicker {
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: ${textWhite};
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    width: ${calculateWidth(570)};
    height: ${calculateWidth(634)};

    &__header {
      width: 100%;
    }

    &__current-month {
      color: ${purple};
      font-size: ${calculateWidth(36)};
      font-weight: 500;
      letter-spacing: -1.08px;

      height: auto;
      margin: ${calculateWidth(41)} 0 ${calculateWidth(48)} 0;
    }

    &__navigation {
      width: ${calculateWidth(20)};
      height: ${calculateWidth(20)};

      top: ${calculateWidth(54)};

      &--previous {
        left: ${calculateWidth(177)};
      }

      &--next {
        right: ${calculateWidth(177)};
      }
    }

    &__day {
      height: ${calculateWidth(43)};
      width: ${calculateWidth(33)};

      text-align: center;
      font-size: ${calculateWidth(30)};
      font-weight: 400;
      letter-spacing: -0.9px;

      &-names {
        margin: 0;
        margin-bottom: ${calculateWidth(20)};
      }

      &-name {
        color: ${purple};
        text-align: center;
        font-size: ${calculateWidth(28)};
        font-weight: 500;
        letter-spacing: 2.24px;

        height: ${calculateWidth(41)};
        width: ${calculateWidth(33)};
      }

      &--selected {
        &::after {
          border-radius: ${calculateWidth(45)} ${calculateWidth(45)} 0 0;
          background: ${purple};
          width: ${calculateWidth(56)};
          height: ${calculateWidth(66)};
        }
      }

      &--disabled {
        color: rgba(0, 0, 0, 0.3);

        &.react-datepicker__day--selected {
          color: ${textWhite};
        }
      }
    }

    &__month {
      padding: 0;
      width: 100%;

      &-container {
        padding: 0 ${calculateWidth(48)};
      }
    }

    &__week {
      margin-bottom: ${calculateWidth(41)};
    }
  }

  &.pc {
    padding: 32px 0 0 79px;

    &.edit {
      & + section:not(.section-submit) {
        margin-top: 0;
      }
    }

    .div-calendar {
      padding: 27px 0 50px 0;
    }

    .react-datepicker {
      width: 600px;
      height: 540px;

      &__current-month {
        margin: 48px 0 34px 0;
        font-size: 26px;
        line-height: 30px;
      }

      &__navigation {
        width: 13px;
        height: 13px;
        top: 59px;

        &--previous {
          left: 220px;
        }

        &--next {
          right: 220px;
        }
      }

      &__day {
        width: 20px;
        height: 31px;
        font-size: 21px;
        line-height: 30px;

        &-names {
          margin-bottom: 21px;
        }

        &-name {
          width: 20px;
          height: 31px;
          font-size: 21px;
          line-height: 30px;
        }

        &--selected {
          &::after {
            width: 40px;
            height: 46px;
          }
        }
      }

      &__month {
        &-container {
          padding: 0 60px;
        }
      }
      &__week {
        margin-bottom: 41px;
      }
    }
  }
`;

export const StyledDeliveryAddress = styled.section`
  width: 100%;
  padding: ${calculateWidth(48)} 0 0;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  border-top: 1px solid ${purple};

  .div-address-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${calculateWidth(20)};

    padding: ${calculateWidth(30)} 0 ${calculateWidth(27)} 0;

    .div-address-input {
      height: ${calculateWidth(90)};

      display: flex;

      border-radius: 6px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: ${textWhite};
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);

      input {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 6px;
        padding-left: ${calculateWidth(48)};

        &::placeholder {
          color: rgba(0, 0, 0, 0.2);
          font-size: ${calculateWidth(28)};
          font-weight: 400;
          letter-spacing: -0.84px;
        }

        &:focus {
          outline: none;
        }
      }

      .search-button {
        img {
          width: ${calculateWidth(35)};
          height: ${calculateWidth(35)};
        }

        padding-right: ${calculateWidth(27)};
      }
    }
  }

  &.pc {
    padding: 33px 0 0 79px;

    .div-address-form {
      gap: 19px;
      padding: 20px 0 30px 0;

      .div-address-input {
        height: 68px;

        input {
          padding-left: 28px;

          &::placeholder {
            font-size: 19px;
          }
        }

        .search-button {
          img {
            width: 25px;
            height: 25px;
          }

          padding-right: 29px;
        }
      }
    }
  }
`;

export const StyledDeliveryNotices = styled.section`
  width: 100%;

  padding: ${calculateWidth(30)} 0 ${calculateWidth(83)} 0;

  .notice-title {
    font-size: ${calculateWidth(26)};
    font-weight: 600;
  }

  ul {
    margin-top: ${calculateWidth(15)};

    li {
      color: rgba(40, 40, 40, 0.4);
      font-size: ${calculateWidth(24)};
      font-weight: 300;

      list-style: disc;
      margin-left: ${calculateWidth(24)};
      line-height: 168%;
      letter-spacing: -0.72px;
    }
  }

  &.pc {
    padding: ${calculateWidth(31)} 0 ${calculateWidth(50)} 0;

    .notice-title {
      font-size: ${calculateWidth(17)};
    }

    ul {
      li {
        font-size: ${calculateWidth(16)};
      }
    }
  }
`;

export const WrappedAssociation = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledAssociationNumberCopy = styled.section`
  width: 100%;

  padding: 0 ${calculateWidth(50)} 0;
  margin-bottom: ${calculateWidth(60)};

  .div-coupon-area {
    padding: 0 ${calculateWidth(40)} ${calculateWidth(78)};
    background-color: ${bgWhite};

    p {
      color: ${purple};
      font-size: ${calculateWidth(34)};
      font-weight: 600;

      width: 100%;
      text-align: center;

      padding-bottom: ${calculateWidth(26)};
    }

    .div-coupon-list {
      display: flex;
      flex-direction: column;
      gap: ${calculateWidth(40)};
    }

    .div-coupon-item {
      display: flex;
      flex-direction: column;
      gap: ${calculateWidth(22)};

      &__title {
        color: ${COLOR.kurlyBlack};
        font-size: ${calculateWidth(30)};
        font-weight: 600;
      }

      &__input {
        width: ${calculateWidth(570)};
        height: ${calculateWidth(90)};

        border-radius: 6px;
        background: ${COLOR.kurlyWhite};

        box-shadow: 0px 0px 8px 0px #eeede8;

        display: flex;

        span {
          font-size: ${calculateWidth(29)};
          color: rgba(0, 0, 0, 0.15);
          width: 100%;
          font-weight: 400;
          letter-spacing: 1.45px;

          padding: 0 ${calculateWidth(40)};
          display: flex;
          align-items: center;
        }

        button {
          flex: 0 0 ${calculateWidth(105)};

          background: ${bgLightPurple};
          color: ${purple};
          font-size: ${calculateWidth(28)};
          font-weight: 600;
          border-radius: 0px 6px 6px 0px;
        }
      }
    }
  }

  &.pc {
    width: ${pcMinWidth};
    margin: 0 auto 50px;

    .div-coupon-area {
      width: 560px;
      margin: 0 auto;
      padding: 0 45px 56px;

      p {
        padding-bottom: 26px;
        font-size: 23px;
        line-height: 30px;
      }

      .div-coupon-list {
        gap: 27px;
      }

      .div-coupon-item {
        gap: 17px;

        &__title {
          font-size: 21px;
          line-height: 25px;
        }

        &__input {
          width: 100%;
          height: 67px;

          span {
            padding: 0 36px;
            font-size: 22px;
            line-height: 26px;
          }

          button {
            flex: 0 0 85px;
            font-size: 20px;
            line-height: 24px;
          }
        }
      }
    }
  }
`;

export const StyledAssociationCouponPopup = styled.section`
  width: 100%;
  padding: 0 ${calculateWidth(50)} 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .btn-coupon-open {
    width: 100%;
    border-radius: ${calculateWidth(8)};
    background: ${btnDarkPurple};

    height: ${calculateWidth(110)};

    color: ${textWhite};

    text-align: center;
    font-size: ${calculateWidth(34)};
    font-weight: 500;

    &:disabled {
      background-color: ${COLOR.kurlyGray350};
      color: ${COLOR.kurlyBlack};
    }
  }

  &.pc {
    width: ${pcMinWidth};
    margin: 0 auto;
    padding: 0;
    .btn-coupon-open {
      width: 480px;
      height: 72px;
      border-radius: 4px;
      font-size: 22px;
      line-height: 28.5px;
      font-weight: 400;
    }
  }
`;

export const StyledCouponAlert = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    height: 50px;

    display: flex;

    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);

    padding: 0 10px;

    &:focus {
      outline: none;
    }
  }

  .error {
    color: ${COLOR.invalidRed};
    display: none;
  }

  .div-buttons {
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    button {
      width: 60px;

      &.btn-confirm {
        color: ${purple};
      }
    }
  }
`;
