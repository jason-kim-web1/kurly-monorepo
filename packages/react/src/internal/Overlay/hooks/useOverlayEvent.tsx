import { MouseEvent, useCallback } from 'react';

export default function useOverlayEvent({
  allowOutsideClick,
  handleCloseButton,
}: {
  allowOutsideClick: boolean;
  handleCloseButton?: () => void;
}) {
  const handleEscapeKeyDown = (event: KeyboardEvent) => {
    const key = event.key || event.keyCode;

    if ((key === 'Escape' || key === 27) && handleCloseButton) {
      handleCloseButton();
    }
  };

  const handleClickOutside = useCallback(() => {
    if (!allowOutsideClick) {
      return false;
    }

    if (handleCloseButton) {
      handleCloseButton();
    }
  }, [allowOutsideClick]);

  const handleStopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return { handleEscapeKeyDown, handleClickOutside, handleStopPropagation };
}
