import { Overlay } from '../internal/Overlay/interface';
import { AlertBaseProps } from '../internal/AlertBase/interface';
export declare const useAlert: () => {
    openAlert: ({ id, ...alertProps }: Partial<Pick<Overlay, "id">> & Partial<Pick<AlertBaseProps, "onClickCancelButton" | "onClickConfirmButton">> & Omit<AlertBaseProps, "onClickCancelButton" | "onClickConfirmButton">) => Promise<boolean>;
    closeAlert: ({ resolveStatus }: import('../internal/Overlay/interface').CloseOverlayProps) => void;
    closeAllAlert: () => void;
};
