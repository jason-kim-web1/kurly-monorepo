import { AlertBaseStyles } from '@thefarmersfront/kpds-css';
import { AlertBaseProps } from '@/internal/AlertBase/interface';
import AlertBaseButtons from '@/internal/AlertBase/component/AlertBaseButtons';
import AlertBaseContents from '@/internal/AlertBase/component/AlertBaseContents';
import AlertBaseTitle from '@/internal/AlertBase/component/AlertBaseTitle';
import { useEffect } from 'react';
import clsx from 'clsx';
import useOverlayEvent from '@/internal/Overlay/hooks/useOverlayEvent';

/** base component */
export default function AlertBase({ title, contents, allowOutsideClick = true, ...buttonProps }: AlertBaseProps) {
  const { handleClickOutside, handleEscapeKeyDown, handleStopPropagation } = useOverlayEvent({
    allowOutsideClick,
    handleCloseButton: buttonProps.onClickCancelButton,
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscapeKeyDown);
    return () => {
      window.removeEventListener('keydown', handleEscapeKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={AlertBaseStyles.backdrop} onClick={handleClickOutside}>
      <div className={clsx(AlertBaseStyles.container, AlertBaseStyles.mobileContainer)} onClick={handleStopPropagation}>
        <AlertBaseTitle title={title} />
        <AlertBaseContents contents={contents} />
        <AlertBaseButtons {...buttonProps} />
      </div>
    </div>
  );
}
