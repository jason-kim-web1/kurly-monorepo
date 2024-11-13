import { Dismiss } from 'src/internal/AlertBaseLegacy';
import { ReactNode } from 'react';
import { ButtonProps } from '@/index';

export interface AlertResponse {
  isConfirmed: boolean;
  isDismissed: boolean;
  dismiss?: Dismiss;
}

export type AlertProps = AlertTitleProps &
  AlertContentsProps &
  Omit<AlertButtonWrapperProps, 'onCloseReturnPromise'> &
  Omit<AlertBaseProps, 'onCloseReturnPromise'>;

export interface AlertBaseProps {
  className?: string;
  allowOutsideClick?: boolean;
  onCloseReturnPromise: (resolveObject: AlertResponse) => void;
}

export interface AlertTitleProps {
  title?: string;
}

export interface AlertContentsProps {
  contents: string | ReactNode | null;
}

export const BUTTON_LAYOUT = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
} as const;

type ButtonLayout = (typeof BUTTON_LAYOUT)[keyof typeof BUTTON_LAYOUT];

export interface AlertButtonWrapperProps {
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  buttonLayout?: ButtonLayout;
  confirmButtonTitle?: string;
  cancelButtonTitle?: string;
  onClickConfirmButton?: () => void;
  onClickCancelButton?: () => void;
  onCloseReturnPromise: (resolveObject: AlertResponse) => void;
}

export interface AlertButtonProps {
  isGroupButton: boolean;
  onCloseReturnPromise: (resolveObject: AlertResponse) => void;
}
