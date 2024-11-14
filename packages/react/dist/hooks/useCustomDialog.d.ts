import { Overlay } from '../internal/Overlay/interface';
import { AlertBaseContentsProps } from '../internal/AlertBase/interface';
export declare const useCustomDialog: () => {
    openCustomDialog: ({ id, ...customDialogProps }: Partial<Pick<Overlay, "id">> & AlertBaseContentsProps) => Promise<boolean>;
    closeCustomDialog: ({ resolveStatus }: import('../internal/Overlay/interface').CloseOverlayProps) => void;
    closeAllCustomDialog: () => void;
};
