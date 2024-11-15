import { nanoid } from 'nanoid';
import { useRef } from 'react';
import useOverlayContext from '@/internal/Overlay/store/OverlayProvider';
import { CloseOverlayProps, OverlayProps } from '@/internal/Overlay/interface';

export default function useOverlay() {
  const { pushOverlay, deleteOverlay, deleteAllOverlay } = useOverlayContext();
  const overlayIDRef = useRef(nanoid());
  const resolveRef = useRef<(value: boolean | PromiseLike<boolean>) => void>();
  const previousRef = useRef<HTMLElement | null>(null);

  const openOverlay = ({ id, ...props }: OverlayProps) => {
    return new Promise<boolean>((resolve) => {
      if (id) {
        overlayIDRef.current = id;
      }

      resolveRef.current = resolve;
      previousRef.current = document.activeElement as HTMLElement;

      pushOverlay({
        id: overlayIDRef.current,
        ...props,
      });
    });
  };

  const closeOverlay = ({ resolveStatus = false }: CloseOverlayProps) => {
    deleteOverlay(overlayIDRef.current);
    resolveRef.current?.(resolveStatus);
    previousRef.current?.focus();
  };

  return {
    openOverlay,
    closeOverlay,
    closeAllOverlay: deleteAllOverlay,
  };
}
