import { css } from '@emotion/react';

import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

import { isPC } from '../../../util/window/getDevice';

import Button from '../components/Button/Button';
import TermsContents from './TermsContents';

const styles = {
  button: {
    border: 0,
    fontWeight: 700,
  },
  mobileButton: {
    display: 'inline-block',
    border: 0,
    fontWeight: 600,
    width: '60px',
    height: '39px',
    margin: '8px',
    span: {
      fontWeight: 600,
    },
  },
};

const dialogStyle = (pc: boolean) => css`
  .MuiPaper-root {
    border-radius: 12px;
    box-shadow: none !important;
    ${pc
      ? `
      width: 440px;
      margin: 0;
      max-height: 600px;
    `
      : `
      width: calc(100% - 48px);
      min-height: 474px;
      max-height: 549px;
      margin: 0 20px;
      @media (max-width: 320px) {
        max-width: 280px;
      }
    `}
  }
`;

const contentStyle = (pc: boolean) => css`
  &.MuiDialogContent-root {
    .wrapper {
      padding: 0;
    }
    ${pc
      ? `
      padding: 0 !important;
      overflow: hidden;
      .wrapper h1 {
        padding: 30px 30px 24px;
      }

      .wrapper .scroll_wrapper {
        padding: 0 30px;
        overflow-y: auto;
        max-height: 464px;
      }
    `
      : `
      padding: 24px 24px 0 !important;
      .wrapper h1 {
        font-size: 18px;
        line-height: 23px;
        font-weight: 600;
      }
    `}
  }
`;

const actionStyle = (pc: boolean) => css`
  &.MuiDialogActions-root {
    ${pc && 'border-top: 1px solid #f7f7f7;'}
    padding: 0;
  }
`;

interface Props {
  html?: string;
  open: boolean;
  onClose: () => void;
}

export default function TermsModal({ html, open, onClose }: Props) {
  const buttonStyle = isPC ? styles.button : styles.mobileButton;

  return (
    <Dialog css={dialogStyle(isPC)} open={open} fullWidth>
      <DialogContent css={contentStyle(isPC)}>
        <TermsContents html={html} />
      </DialogContent>
      <DialogActions css={actionStyle(isPC)}>
        <Button theme="secondary" text="확인" height={56} radius={0} css={buttonStyle} onClick={onClose} />
      </DialogActions>
    </Dialog>
  );
}
