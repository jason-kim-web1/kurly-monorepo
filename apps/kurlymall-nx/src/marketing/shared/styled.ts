import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { CallIconBlack } from '../../shared/images';
import COLOR from '../../shared/constant/colorset';
import { ContentBody } from './type';

export const calculateWidth = (value: number) => `calc(${value} / var(--width) * 100vw)`;
const pcMinWidth = '1050px';

export const StyledContainer = styled.div<{ width: number }>`
  --width: ${(props) => props.width};
  & * {
    font-family: ${vars.font.body};
  }
`;

export const StyledBlindTextWrapper = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  border: 0;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
`;

export const StyledVocHotlineButtonWrapper = styled.a`
  display: block;
  width: 100%;
  padding: ${calculateWidth(40)} ${calculateWidth(50)} ${calculateWidth(45)};
  margin-bottom: ${calculateWidth(110)};
  border-radius: ${calculateWidth(8)};
  font-size: ${calculateWidth(28)};
  line-height: ${calculateWidth(36)};
  color: rgba(0, 0, 0, 0.5);
  background: #d7c9e1 url(${CallIconBlack}) no-repeat ${`calc(100% - ${calculateWidth(60)})`} 50%;
  background-size: ${calculateWidth(56)} ${calculateWidth(54)};
  cursor: auto;
  strong {
    display: block;
    margin-bottom: ${calculateWidth(5)};
    font-weight: 600;
    font-size: ${calculateWidth(36)};
    line-height: ${calculateWidth(46)};
    color: ${COLOR.kurlyBlack};
  }

  .pc & {
    width: 480px;
    padding: 32px 40px;
    margin: 0 auto 100px;
    border-radius: 5px;
    font-size: 16px;
    line-height: 20px;
    background-position: calc(100% - 40px) 50%;
    background-size: 40px 38px;
    strong {
      margin-bottom: 6px;
      font-size: 26px;
      line-height: 33px;
    }
  }
`;

export const StyledButtonWrapper = styled.div`
  width: 100%;
  padding: 0 ${calculateWidth(50)};
  button {
    height: ${calculateWidth(109)};
    border-radius: ${calculateWidth(8)};
    span {
      font-size: ${calculateWidth(34)};
      line-height: ${calculateWidth(44)};
      font-weight: 500;
    }
  }

  &.pc {
    width: ${pcMinWidth};
    padding: 0;
    margin: 0 auto;
    button {
      width: 480px;
      height: 72px;
      margin: 0 auto;
      border-radius: 5px;
      box-sizing: border-box;
      span {
        font-size: 22px;
        line-height: 28.5px;
        font-weight: 400;
      }
    }
  }
`;

export const StyledTopBannerWrapper = styled.div<{
  hasBanner: boolean;
  isSubTab: boolean;
  isWebview: boolean;
  backgroundColor?: string;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: ${({ isSubTab, isWebview }) => (isSubTab && !isWebview ? '44px' : '')};
  overflow: hidden;

  background-color: ${({ backgroundColor }) => backgroundColor ?? ''};

  .lottie {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

export const StyledImagesWrapper = styled.button`
  width: 100%;
  display: block;
  margin: 0 auto;
  cursor: auto;

  img {
    width: 100%;
  }

  &.pc {
    width: ${pcMinWidth};
    img {
      width: ${pcMinWidth};
    }
  }
`;

export const WrappedSummary = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  text-align: center;
  background: ${({ backgroundColor }) => backgroundColor ?? ''};
`;

export const StyledNoticeWrapper = styled.div<{
  styles?: ContentBody['styles'];
  hasFolding?: boolean;
  isFolding: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: ${calculateWidth(60)} 0 ${calculateWidth(110)};
  padding: ${calculateWidth(33)} ${calculateWidth(50)} 0;
  box-sizing: border-box;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    width: ${`calc(100% - ${calculateWidth(100)})`};
    height: ${calculateWidth(1)};
    background-color: ${COLOR.kurlyBlack};
  }

  .notice-title {
    display: flex;
    justify-content: space-between;
    padding: 0 ${calculateWidth(8)} ${calculateWidth(15)} ${calculateWidth(2)};
    font-size: ${calculateWidth(26)};
    line-height: ${calculateWidth(31)};
    font-weight: 600;
    word-break: keep-all;
    text-align: left;
  }
  .notices {
    font-size: ${calculateWidth(24)};
    line-height: ${calculateWidth(40)};
    transition: 0.3s;
    overflow: hidden;
    li {
      position: relative;
      padding-left: 14px;
      word-break: keep-all;
      &:before {
        position: absolute;
        left: 0;
        content: '•';
      }
    }
    .sub > li {
      padding-left: 25px;
      &:before {
        left: 14px;
      }
    }
  }

  &.pc {
    flex-direction: row;
    width: ${pcMinWidth};
    padding: 31px 105px 0;
    margin: 50px auto 85px;
    &:before {
      left: 105px;
      width: calc(100% - 210px);
      height: 1px;
    }
    .notice-title {
      width: 180px;
      padding: 0 0 0 16px;
      font-size: 17px;
      line-height: 22px;
      font-weight: 400;
      cursor: default;
      &:after {
        display: none;
      }
    }
    .notices {
      font-size: 16px;
      line-height: 26px;
      font-weight: 300;
    }
  }

  ${({ styles, hasFolding, isFolding }) => ({
    '&:before': { backgroundColor: styles?.textColor },
    '& .notice-title': {
      color: styles?.textColor,
      ...(hasFolding
        ? {
            '&:after': {
              content: '""',
              display: 'inline-block',
              width: calculateWidth(12),
              height: calculateWidth(12),
              marginTop: isFolding ? 0 : '3px',
              border: `1px solid ${styles?.textColor}`,
              borderWidth: `${calculateWidth(2)} ${calculateWidth(2)} 0 0`,
              transform: `rotateZ(${isFolding ? '135deg' : '-45deg'})`,
            },
          }
        : {}),
    },
    '& .notices': {
      color: styles?.subTextColor,
    },
    '&.pc .notices': {
      color: styles?.textColor,
    },
    '&.mobile .notices': {
      maxHeight: isFolding && hasFolding ? 0 : 600,
    },
  })};
`;

export const StyledTabsWrapper = styled.div<{
  rowLength: number;
  styles?: ContentBody['styles'];
  top: number;
}>`
  position: sticky;
  top: ${({ top }) => `${top}px`};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 100;

  ${({ styles }) => ({ backgroundColor: styles?.backgroundColor, color: styles?.textColor })};

  .tab-wrap {
    width: 100%;
  }
  .tab {
    padding: ${calculateWidth(32)} 0;
    font-size: ${calculateWidth(28)};
    line-height: ${calculateWidth(19)};
    color: inherit;
    &.top {
      width: calc(100% / ${(props) => props.rowLength});
    }
    &.bottom {
      width: calc(100% / ${(props) => props.rowLength - 1});
    }
    .badge {
      display: inline-block;
      margin: -7px -8px 0 2px;
      font-weight: 400;
      font-size: ${calculateWidth(16)};
      letter-spacing: -0.48px;
      color: #ff3300;
      vertical-align: top;
    }
  }
  .top + .top:before,
  .bottom + .bottom:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: ${calculateWidth(1)};
    height: ${calculateWidth(36)};
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.3);
  }

  &.pc {
    min-width: ${pcMinWidth};
    .tab-wrap {
      width: ${pcMinWidth};
    }
    .tab {
      position: relative;
      padding: 18px 0;
      font-weight: 400;
      font-size: 20px;
      line-height: 20px;
      &:before {
        width: 1px;
        height: 25px;
      }

      .badge {
        font-size: 12px;
        letter-spacing: -0.36px;
      }
    }
  }
`;
