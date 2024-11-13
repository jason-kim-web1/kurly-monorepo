import useOverlay from '@/hooks/useOverlay';
import { Overlay } from '@/internal/Overlay/interface';
import DialogPCBase from '@/internal/DialogPCBase/component/DialogPCBase';
import { DialogPCBaseProps } from '@/internal/DialogPCBase/interface';

const OVERLAY_TYPE = 'DIALOG_PC';

export const useDialogPC = () => {
  const { openOverlay, closeOverlay, closeAllOverlay } = useOverlay();

  const openDialogPC = ({
    id,
    ...dialogPCProps
  }: Partial<Pick<Overlay, 'id'>> & Omit<DialogPCBaseProps, 'onClickConfirmButton'>) => {
    return openOverlay({
      id,
      type: OVERLAY_TYPE,
      contents: <DialogPCBase {...dialogPCProps} onClickConfirmButton={() => closeOverlay({ resolveStatus: false })} />,
    });
  };

  return {
    openDialogPC,
    closeDialogPC: closeOverlay,
    closeAllDialogPC: () => closeAllOverlay(OVERLAY_TYPE),
  };
};
