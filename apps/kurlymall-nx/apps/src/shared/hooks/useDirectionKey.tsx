import { useCallback, useEffect } from 'react';

interface Props {
  rightKeyAction?: () => void;
  leftKeyAction?: () => void;
  upKeyAction?: () => void;
  downKeyAction?: () => void;
}

export const useDirectionKey = ({
  rightKeyAction = () => {},
  leftKeyAction = () => {},
  upKeyAction = () => {},
  downKeyAction = () => {},
}: Props) => {
  const handleDirectionKey = useCallback(
    (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowRight':
          rightKeyAction();
          break;
        case 'ArrowLeft':
          leftKeyAction();
          break;
        case 'ArrowUp':
          upKeyAction();
          break;
        case 'ArrowDown':
          downKeyAction();
          break;
        default:
          break;
      }
    },
    [downKeyAction, leftKeyAction, rightKeyAction, upKeyAction],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleDirectionKey);
    return () => window.removeEventListener('keydown', handleDirectionKey);
  }, [handleDirectionKey]);
};
