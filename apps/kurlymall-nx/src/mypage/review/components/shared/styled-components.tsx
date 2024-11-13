import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { zIndex } from '../../../../shared/styles';

export const TabList = styled.div<{ isPC: boolean; mobileHeaderHeight: number }>`
  display: flex;

  ${({ mobileHeaderHeight, isPC }) =>
    isPC
      ? css`
          flex-wrap: nowrap;
          height: 60px;
          margin: 20px 20px 0;
          background-color: ${COLOR.kurlyGray100};
        `
      : css`
          flex-direction: row;
          position: fixed;
          top: ${mobileHeaderHeight}px;
          left: 0;
          z-index: ${zIndex.productNavi};
          width: 100%;
          height: 44px;
          background-color: ${COLOR.kurlyWhite};
          padding: 0 16px;
          border-bottom: 1px solid ${COLOR.bg};
          font-size: 15px;
          line-height: 20px;
          color: ${COLOR.kurlyGray600};
        `}
`;

export const TabButton = styled.button<{ isPC: boolean; isActive: boolean }>`
  flex: 1;

  ${({ isPC }) =>
    isPC
      ? css`
          border: 1px solid ${COLOR.bg};
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;
          color: ${COLOR.kurlyGray800};
        `
      : css`
          width: 100%;
          font-size: 15px;
          padding-bottom: 2px;
          outline: none;
        `}

  ${({ isPC, isActive }) =>
    isPC
      ? isActive &&
        css`
          border-bottom-width: 0;
          background-color: ${COLOR.kurlyWhite};
          color: ${COLOR.kurlyPurple};
        `
      : isActive &&
        css`
          padding-bottom: 0;
          border-bottom: 2px solid ${COLOR.kurlyPurple};
          > span {
            font-weight: 600;
            color: ${COLOR.kurlyPurple};
          }
        `};
`;

export const ReviewContentWrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;

  ${({ isActive }) =>
    !isActive &&
    css`
      display: none;
    `};
`;

export const PanelFlex = styled.div<{ isPC: boolean; count?: number }>`
  display: flex;
  flex-direction: column;

  ${({ isPC, count }) =>
    isPC
      ? css``
      : css`
          padding-top: 44px;
          overflow: auto;
          height: ${!!count && count > 0 ? 'auto' : 'calc(100vh - 88px)'};
        `}
`;

export const ReviewList = styled.div<{ isPC: boolean }>`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  flex-direction: column;

  ${({ isPC }) =>
    isPC
      ? css`
          position: relative;
          padding: 17px 20px;
        `
      : css`
          padding: 17px 16px;
        `}
`;

const TotalNumber = styled.p`
  padding-bottom: 4px;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
`;

const Button = styled.button`
  width: 74px;
  height: 32px;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 4px;
  object-fit: cover;
  font-weight: 600;
  font-size: 12px;
`;

export const EmptyListText = styled.p<{ isPC: boolean }>`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: ${COLOR.kurlyGray400};

  ${({ isPC }) =>
    isPC
      ? css`
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 700px;
        `
      : css`
          height: fit-content;
          margin: auto;
        `}
`;

export const Sup = styled.sup`
  color: ${COLOR.pointText};
`;

export const productImageCSS = css`
  flex-shrink: 0;
  border-radius: 3px;
  object-fit: cover;
`;

export const ThumbnailImageWrap = styled.div<{ isPC: boolean }>`
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  border-radius: 3px;

  ${({ isPC }) =>
    isPC
      ? css`
          width: 60px;
          height: 60px;
        `
      : css`
          width: 50px;
          height: 50px;
        `}
`;

export const ReviewGuideWrapper = styled.div<{ isPC: boolean }>`
  ${({ isPC }) =>
    isPC
      ? css`
          padding: 30px;
          border-bottom: 1px solid ${COLOR.bg};
        `
      : css`
          padding: 20px 20px 30px;
          border-bottom: 8px solid ${COLOR.bg};
        `}
`;

export const ReviewGuideTitle = styled.h2<{ isPC: boolean }>`
  font-weight: 600;
  color: ${COLOR.kurlyGray800};

  ${({ isPC }) =>
    isPC
      ? css`
          font-size: 20px;
          line-height: 30px;
          text-align: center;
        `
      : css`
          font-size: 14px;
          line-height: 20px;
        `}
`;

export const ReviewGuideDescription = styled.p<{ isPC: boolean }>`
  font-weight: 400;
  color: ${COLOR.kurlyGray500};
  white-space: pre-line;

  > span {
    color: ${COLOR.loversWhite};
  }

  ${({ isPC }) =>
    isPC
      ? css`
          margin-top: 6px;
          font-size: 14px;
          line-height: 20px;
          text-align: center;

          > span,
          > strong {
            font-weight: 500;
          }
        `
      : css`
          margin-top: 16px;
          font-size: 15px;
          line-height: 22px;

          > span,
          strong {
            font-weight: 600;
            line-height: 20px;
          }
        `}
`;

export const ReviewImageGuideWrapper = styled.div<{ isPC: boolean }>`
  display: flex;
  align-items: center;

  ${({ isPC }) =>
    isPC
      ? css`
          gap: 30px;
          justify-content: center;
          margin-top: 17px;
        `
      : css`
          justify-content: space-between;
          margin-top: 16px;
          font-size: 14px;
          line-height: 20px;
        `}
`;

export const ReviewImageGuideItem = styled.div<{ isPC: boolean }>`
  p {
    text-align: center;
    white-space: pre-line;
    padding-top: 6px;
    font-size: 12px;
    line-height: 16px;
    color: ${COLOR.kurlyGray450};

    ${({ isPC }) =>
      !isPC &&
      css`
        font-weight: 400;
      `}
  }
`;
export { TotalNumber, Button };
