import useOverlay from '@/hooks/useOverlay';
import { Overlay } from '@/internal/Overlay/interface';
import SnackbarBase from '@/internal/SnackbarBase/component/SnackbarBase';
import { SnackbarBaseProps } from '@/internal/SnackbarBase/interface';

const OVERLAY_TYPE = 'SNACKBAR';

export const useSnackbar = () => {
  const { openOverlay, closeOverlay, closeAllOverlay } = useOverlay();

  const openSnackbar = ({ id, ...snackbarProps }: Partial<Pick<Overlay, 'id'>> & SnackbarBaseProps) => {
    return openOverlay({
      id,
      type: OVERLAY_TYPE,
      contents: <SnackbarBase {...snackbarProps} />,
    });
  };

  return {
    openSnackbar,
    closeSnackbar: closeOverlay,
    closeAllSnackbar: () => closeAllOverlay(OVERLAY_TYPE),
  };
};
