import useOverlay from '@/hooks/useOverlay';
import { Overlay } from '@/internal/Overlay/interface';
import { AlertBaseContentsProps } from '@/internal/AlertBase/interface';
import CustomDialogBase from '@/internal/CustomDialogBase/component';

const OVERLAY_TYPE = 'CUSTOM_DIALOG';

export const useCustomDialog = () => {
  const { openOverlay, closeOverlay, closeAllOverlay } = useOverlay();

  const openCustomDialog = ({ id, ...customDialogProps }: Partial<Pick<Overlay, 'id'>> & AlertBaseContentsProps) => {
    return openOverlay({
      id,
      type: OVERLAY_TYPE,
      contents: <CustomDialogBase {...customDialogProps} />,
    });
  };

  return {
    openCustomDialog,
    closeCustomDialog: closeOverlay,
    closeAllCustomDialog: () => closeAllOverlay(OVERLAY_TYPE),
  };
};
