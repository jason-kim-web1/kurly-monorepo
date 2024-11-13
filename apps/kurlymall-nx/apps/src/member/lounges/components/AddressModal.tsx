import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { css } from '@emotion/react';

import Address from '../../../shared/components/Address/Address';
import { Close } from '../../../shared/icons';
import { isPC } from '../../../../util/window/getDevice';
import { DeliveryProps } from '../../../shared/interfaces/ShippingAddress';

const dialogStyle = (pc: boolean) => css`
  .MuiPaper-root {
    border-radius: 12px;
    box-shadow: none !important;
    padding: 10px;

    ${pc
      ? `
      width: 440px;
      margin: 0;
      height: 522px;
    `
      : `
      width: calc(100% - 48px);
      height: 455px;
      margin: 0 20px;
      @media (max-width: 320px) {
        max-width: 280px;
      }
    `}
  }
`;

const contentStyle = (pc: boolean) => css`
  &.MuiDialogContent-root {
    padding: 0;

    ${pc && 'overflow: hidden;'}
  }
`;

const actionStyle = (pc: boolean) => css`
  &.MuiDialogActions-root {
    padding: 0;

    ${pc && 'border-top: 1px solid #f7f7f7;'}
  }
`;

type AddressModalProps = {
  onClose: () => void;
  open: boolean;
  onSubmit: (result: DeliveryProps) => void;
};

function AddressModal({ onClose, open, onSubmit }: AddressModalProps) {
  return (
    <Dialog css={dialogStyle(isPC)} open={open} onClose={onClose}>
      <DialogActions css={actionStyle(isPC)}>
        <button onClick={onClose}>
          <Close />
        </button>
      </DialogActions>
      <DialogContent css={contentStyle(isPC)}>
        <Address onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}

export default AddressModal;
