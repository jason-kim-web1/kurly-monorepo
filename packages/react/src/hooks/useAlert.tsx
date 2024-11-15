import useOverlay from '@/hooks/useOverlay';
import { Overlay } from '@/internal/Overlay/interface';
import { AlertBaseProps } from '@/internal/AlertBase/interface';
import AlertBase from '@/internal/AlertBase/component/AlertBase';

const OVERLAY_TYPE = 'ALERT';

export const useAlert = () => {
  const { openOverlay, closeOverlay, closeAllOverlay } = useOverlay();

  const openAlert = ({
    id,
    ...alertProps
  }: Partial<Pick<Overlay, 'id'>> &
    Partial<Pick<AlertBaseProps, 'onClickCancelButton' | 'onClickConfirmButton'>> &
    Omit<AlertBaseProps, 'onClickCancelButton' | 'onClickConfirmButton'>) => {
    const onClickConfirmButton = () => {
      if (alertProps.onClickConfirmButton) {
        alertProps.onClickConfirmButton();
        return;
      }
      closeOverlay({ resolveStatus: true });
    };

    const onClickCancelButton = () => {
      if (alertProps.onClickCancelButton) {
        alertProps.onClickCancelButton();
        return;
      }
      closeOverlay({ resolveStatus: false });
    };

    return openOverlay({
      id,
      type: OVERLAY_TYPE,
      contents: (
        <AlertBase
          {...alertProps}
          onClickConfirmButton={onClickConfirmButton}
          onClickCancelButton={onClickCancelButton}
        />
      ),
    });
  };

  return {
    openAlert,
    closeAlert: closeOverlay,
    closeAllAlert: () => closeAllOverlay(OVERLAY_TYPE),
  };
};
