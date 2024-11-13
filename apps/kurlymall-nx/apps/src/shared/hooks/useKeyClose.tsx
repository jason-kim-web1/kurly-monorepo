import { useCallback, useEffect } from 'react';

interface Props {
  close: () => void;
}

export const useKeyEscClose = ({ close }: Props) => {
  const escKeyModalClose = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        close();
        return;
      }

      event.preventDefault();
    },
    [close],
  );

  useEffect(() => {
    window.addEventListener('keyup', escKeyModalClose);
    return () => window.removeEventListener('keyup', escKeyModalClose);
  }, []);
};
