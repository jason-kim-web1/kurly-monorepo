import styled from '@emotion/styled';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';

import COLOR from '../../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../../shared/utils';
import { hiddenScrollBar } from '../../../../../shared/utils/hidden-scrollbar';

export const ContentsProductName = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray450};
  ${multiMaxLineText(1)}
`;

export const DealProductName = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: ${COLOR.kurlyGray800};
  ${multiMaxLineText(1)}
`;

export const AboutProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${COLOR.bg};
`;

export const ProductNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DismissButton = styled.button`
  display: inline-block;
  width: 32px;
  height: 32px;
`;

export const Modal = styled(Dialog)`
  .MuiDialogContent-root {
    ${hiddenScrollBar()};
  }

  .MuiPaper-root {
    display: flex;
    flex-direction: column;
    width: 800px;
    max-width: none;
    max-height: 740px;
    border-radius: 12px;
  }

  .MuiPaper-elevation24 {
    box-shadow: none;
  }
`;

export const ModalContent = styled(DialogContent)`
  position: relative;
  padding: 0 30px;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray450};
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-bottom: 10px;
  margin: 30px 30px 0;
  border-bottom: 1px solid ${COLOR.bg};
  letter-spacing: -1px;
`;

export const ModalTitle = styled(DialogTitle)`
  padding: 0;
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.5px;
  color: ${COLOR.kurlyGray800};
`;
