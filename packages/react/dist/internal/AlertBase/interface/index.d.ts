import { ReactNode } from 'react';
import { ButtonProps } from '../../../index';
import { ButtonLayout } from '../constants';
export interface AlertBaseTitleProps {
    title?: string;
}
export interface AlertBaseContentsProps {
    contents: string | ReactNode | null;
}
export interface AlertBaseButtonWrapperProps {
    showConfirmButton?: boolean;
    showCancelButton?: boolean;
    confirmButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    confirmButtonTitle?: string;
    cancelButtonTitle?: string;
    buttonLayout?: ButtonLayout;
    allowOutsideClick?: boolean;
    onClickConfirmButton: () => void;
    onClickCancelButton: () => void;
}
export interface AlertBaseButtonProps {
    isGroupButton: boolean;
}
export type AlertBaseProps = AlertBaseTitleProps & AlertBaseContentsProps & AlertBaseButtonWrapperProps;
