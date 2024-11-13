import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Dialog, DialogContent } from '@mui/material';

import COLOR from '../../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../../shared/utils';

export const Modal = styled(Dialog)`
  .MuiPaper-root {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    max-width: none;
    width: 954px;
    background: transparent;
  }
  .MuiPaper-elevation24 {
    box-shadow: none;
  }
`;

export const ModalInner = styled.div`
  width: 800px;
  margin: 0 auto;
  background-color: ${COLOR.kurlyWhite};
  border-radius: 12px;
`;

export const ModalContent = styled(DialogContent)`
  padding: 0 30px 30px 30px;
  overflow: hidden;
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  margin: 29px 30px 20px;
  border-bottom: 1px solid ${COLOR.bg};
  letter-spacing: -1px;
  vertical-align: middle;
`;

export const ModalTitle = styled.span`
  display: inline;
  padding: 0;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.5px;
  color: ${COLOR.kurlyGray800};
  vertical-align: baseline;
`;

export const ProductName = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
  ${multiMaxLineText(1)}
`;

export const reviewImageFrame = css`
  width: 375px;
  height: 488px;
  border-radius: 6px;
  object-fit: scale-down;
  background-color: ${COLOR.bg};
`;

export const ReviewImageList = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2px;
  max-width: 375px;
`;

export const ReviewImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ContentsProductName = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray450};
  ${multiMaxLineText(1)}
`;

export const DismissButton = styled.button`
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-top: 1px;
`;
export const Wrapper = styled.div`
  position: relative;
`;

export const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 0%, 0.4);
`;

export const ReviewImageItem = styled.button`
  position: relative;
  flex-shrink: 0;
  width: 45px;
  height: 45px;
  overflow: hidden;

  :first-of-type {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  :last-of-type {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;

export const DealProductName = styled.p`
  max-width: 340px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.lightGray};
  ${multiMaxLineText(1)}
`;

export const ReviewContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  gap: 20px;

  > div:nth-of-type(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 1 / span 2;
  }
`;
