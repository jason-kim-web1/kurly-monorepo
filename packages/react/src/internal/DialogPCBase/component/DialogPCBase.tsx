import { DialogPCBaseStyles } from '@thefarmersfront/kpds-css';
import { useEffect } from 'react';
import clsx from 'clsx';
import DialogPCBaseHeader from '@/internal/DialogPCBase/component/DialogPCBaseHeader';
import DialogPCBaseContents from '@/internal/DialogPCBase/component/DialogPCBaseContents';
import { DialogPCBaseProps } from '@/internal/DialogPCBase/interface';
import useOverlayEvent from '@/internal/Overlay/hooks/useOverlayEvent';

/** base component */
export default function DialogPCBase({
  title,
  description,
  contents,
  allowOutsideClick = true,
  onClickConfirmButton,
}: DialogPCBaseProps) {
  const { handleClickOutside, handleEscapeKeyDown, handleStopPropagation } = useOverlayEvent({
    allowOutsideClick,
    handleCloseButton: onClickConfirmButton,
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
    <div className={DialogPCBaseStyles.backdrop} onClick={handleClickOutside}>
      <div className={clsx(DialogPCBaseStyles.container)} onClick={handleStopPropagation}>
        <DialogPCBaseHeader title={title} description={description} onClickConfirmButton={onClickConfirmButton} />
        <DialogPCBaseContents contents={contents} />
      </div>
    </div>
  );
}
