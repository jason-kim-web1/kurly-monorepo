import { Overlay } from '../internal/Overlay/interface';
import { SnackbarBaseProps } from '../internal/SnackbarBase/interface';
export declare const useSnackbar: () => {
    openSnackbar: ({ id, ...snackbarProps }: Partial<Pick<Overlay, "id">> & SnackbarBaseProps) => Promise<boolean>;
    closeSnackbar: ({ resolveStatus }: import('../internal/Overlay/interface').CloseOverlayProps) => void;
    closeAllSnackbar: () => void;
};
