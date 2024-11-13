import styled from '@emotion/styled';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

import { css } from '@emotion/react';

import PersonalInquiryAgreeTermContent from './PersonalInquiryAgreeTermContent';

const dialog = css`
  .MuiPaper-root {
    width: calc(100% - 1.5rem);
    height: calc(100vh - 128px);
    margin: 0;
    border-radius: 12px;
  }
`;

const content = css`
  &.MuiDialogContent-root {
    padding: 1.525rem;
  }
`;

const actions = css`
  &.MuiDialogActions-root {
    padding: 0;
  }
`;

const Button = styled.button`
  height: 4rem;
  font-size: 16px;
  color: #5f0080;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 0 1.5rem;
`;

interface Props {
  open: boolean;
  onClose(): void;
}

export default function PersonalInquiryAgreeTermsModal({ open, onClose }: Props) {
  if (!open) {
    return null;
  }

  return (
    <Dialog css={dialog} open={open} fullWidth>
      <DialogContent css={content}>
        <PersonalInquiryAgreeTermContent />
      </DialogContent>
      <DialogActions css={actions}>
        <Button onClick={onClose} type="button">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
