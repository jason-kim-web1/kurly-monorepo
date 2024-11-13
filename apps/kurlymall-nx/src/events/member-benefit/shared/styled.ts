import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../shared/constant/colorset';

const arrowIconStyle = (isSlideToggle: boolean) => css`
  transition: transform 0.3s ease-out;
  transform: rotate(${isSlideToggle ? '-180deg' : 0});
`;

const Section = styled.section`
  .sub-title {
    padding: 16px 0;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    color: ${COLOR.benefitGray};
  }

  .description {
    margin-bottom: 16px;
    font-weight: 400;
    line-height: 20px;
    color: ${COLOR.benefitTextGray};
  }

  .emph-txt {
    font-weight: 600;
  }

  .list-caution {
    margin-bottom: 28px;

    li {
      display: flex;
      gap: 8px;
      margin-bottom: 4px;
      line-height: 20px;
      color: ${COLOR.benefitTextGray};

      &::before {
        width: 4px;
        height: 4px;
        margin-top: 7px;
        border-radius: 100%;
        background-color: #cbd1d7;
        content: '';
      }
    }
  }

  &.mobile {
    padding: 0 20px;

    .coupon {
      flex-direction: column;
    }
  }

  &.pc {
    .coupon-list {
      height: calc(100% - 62px);
    }

    .sub-title,
    .emph-txt {
      font-weight: 500;
    }
  }
`;

const ShareArea = styled.div`
  padding: 40px 0;
  background-color: #e8f7fa;

  .title {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
  }
  .button-wrap {
    display: flex;
    justify-content: center;
    gap: 6px;

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      width: 80px;
      font-weight: 400;
      line-height: 20px;
      color: ${COLOR.benefitGray};
    }
  }

  &.pc {
    padding-bottom: 116px;
    border-radius: 16px;

    .title {
      font-weight: 500;
    }
  }
`;

const BottomArea = styled.div`
  position: sticky;
  bottom: 0;
  margin-bottom: -8px;
  padding: 8px 12px 0;
  background-color: ${COLOR.kurlyWhite};

  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: calc(8px + constant(safe-area-inset-bottom));
  }
  @supports (bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
  }

  button {
    display: block;
    width: 100%;
    height: 56px;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    border-radius: 12px;
    background-color: ${COLOR.benefitGray};
    color: ${COLOR.kurlyWhite};
  }

  &.pc {
    margin-top: -76px;
    padding: 0 20px 20px;
    background: none;

    button {
      font-weight: 500;
    }
  }
`;

const TabInfoList = styled.ul`
  margin: 0 16px 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: #f2f5f8;

  li {
    position: relative;
    margin-bottom: 10px;
    padding-left: 12px;
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    color: ${COLOR.mainSecondary};

    &:last-of-type {
      margin-bottom: 0;
    }
    &::before {
      position: absolute;
      top: 7px;
      left: 0;
      min-width: 4px;
      height: 4px;
      background-color: #a7b2bc;
      border-radius: 100%;
      content: '';
    }

    p {
      padding-top: 4px;
      font-size: 12px;
      line-height: 16px;
      color: ${COLOR.benefitTextGray};
    }

    .sub-list li {
      margin-bottom: 4px;

      &:first-of-type {
        margin-top: 4px;
      }
    }
  }
`;

export { Section, ShareArea, BottomArea, arrowIconStyle, TabInfoList };
