import { CSSProperties, ReactNode } from 'react';

import Dialog, { DialogProps } from '@mui/material/Dialog';
import { SerializedStyles } from '@emotion/react';

interface Props extends DialogProps {
  children: ReactNode;
  open: boolean;
  onHandleClose(): void;
  dialogStyle?: CSSProperties | SerializedStyles;
}

export default function SimpleDialog({ children, open, onHandleClose, dialogStyle, ...dialogOptions }: Props) {
  return (
    <Dialog
      onClose={onHandleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'center',
        },
        '& .MuiDialog-paper': {
          borderRadius: '3px',
          position: 'relative',
          margin: '20px 20px 0',
          height: 'calc(100% - 40px)',
          ...dialogStyle,
        },
      }}
      {...dialogOptions}
    >
      {children}
    </Dialog>
  );
}
