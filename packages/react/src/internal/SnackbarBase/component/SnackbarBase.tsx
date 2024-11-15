import { SnackbarBaseStyles } from '@thefarmersfront/kpds-css';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { SNACKBAR_BUTTON_ORIENTATION, SNACKBAR_TYPE } from '@/internal/SnackbarBase/constants';
import { SnackbarBaseProps } from '@/internal/SnackbarBase/interface';
import SnackbarBaseContent from '@/internal/SnackbarBase/component/SnackbarBaseContent';
import SnackbarBaseButton from '@/internal/SnackbarBase/component/SnackbarBaseButton';

const SNACKBAR_DURATION = 3000;

export default function SnackbarBase({
  type = SNACKBAR_TYPE.NORMAL,
  duration = SNACKBAR_DURATION,
  message,
  button,
  isPC = false,
  onClose,
}: SnackbarBaseProps) {
  const [showState, setShowState] = useState(false);

  useEffect(() => {
    setShowState(true);
    const timer = setTimeout(() => {
      setShowState(false);
      setTimeout(() => onClose(), 1000);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={clsx(
        SnackbarBaseStyles.container({
          type,
          hasButton: !!button,
          buttonOrientation: button?.orientation ?? SNACKBAR_BUTTON_ORIENTATION.HORIZONTAL,
          isHide: !showState,
          isPC,
        }),
      )}
    >
      <SnackbarBaseContent type={type} message={message} />
      <SnackbarBaseButton button={button} />
    </div>
  );
}
