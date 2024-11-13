import { useEffect } from 'react';

import { checkBrowserEnvironment } from '../../../../shared/utils/checkBrowserEnvironment';

export const useBlockContextMenu = () => {
  const handleContextMenu = (event: MouseEvent) => event.preventDefault();
  useEffect(() => {
    if (checkBrowserEnvironment()) {
      window.addEventListener('contextmenu', handleContextMenu);
    }
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);
};
