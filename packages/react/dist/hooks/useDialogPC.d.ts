import { Overlay } from '../internal/Overlay/interface';
import { DialogPCBaseProps } from '../internal/DialogPCBase/interface';
export declare const useDialogPC: () => {
    openDialogPC: ({ id, ...dialogPCProps }: Partial<Pick<Overlay, "id">> & Omit<DialogPCBaseProps, "onClickConfirmButton">) => Promise<boolean>;
    closeDialogPC: ({ resolveStatus }: import('../internal/Overlay/interface').CloseOverlayProps) => void;
    closeAllDialogPC: () => void;
};
