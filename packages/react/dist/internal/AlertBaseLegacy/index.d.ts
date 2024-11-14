import { PropsWithChildren } from 'react';
import { AlertBaseProps, AlertButtonWrapperProps, AlertContentsProps, AlertTitleProps } from './interface';
declare const ALERT_CONTAINER_ID = "kpds-alert-container";
declare const DISMISS: {
    readonly BACKDROP: "backdrop";
    readonly CANCEL: "cancel";
};
type Dismiss = (typeof DISMISS)[keyof typeof DISMISS];
/**
 * KPDS Alert이 화면에 노출중인지 확인
 */
declare const isShownAlert: () => boolean;
/**
 * KPDS Alert 닫기
 */
declare const closeAlert: () => false | undefined;
export declare const AlertBase: {
    ({ children, className, allowOutsideClick, onCloseReturnPromise, }: PropsWithChildren<AlertBaseProps>): JSX.Element;
    Buttons: ({ showConfirmButton, showCancelButton, confirmButtonTitle, cancelButtonTitle, confirmButtonProps, cancelButtonProps, buttonLayout, onCloseReturnPromise, }: AlertButtonWrapperProps) => JSX.Element | null;
    Title: ({ title }: AlertTitleProps) => JSX.Element | null;
    Contents: ({ contents }: AlertContentsProps) => JSX.Element;
};
export type { Dismiss };
export { ALERT_CONTAINER_ID, isShownAlert, closeAlert };
