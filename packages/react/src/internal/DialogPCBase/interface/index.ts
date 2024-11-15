import { ReactNode } from 'react';

export interface DialogPCBaseHeaderInterface {
  title?: string;
  description?: string;
}

export interface DialogPCBaseContentsInterface {
  contents: string | ReactNode | null;
}

export interface DialogPCBaseWrapperProps {
  onClickConfirmButton: () => void;
  allowOutsideClick?: boolean;
}

export type DialogPCBaseProps = DialogPCBaseHeaderInterface & DialogPCBaseContentsInterface & DialogPCBaseWrapperProps;
