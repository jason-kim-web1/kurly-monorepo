import ReactDOM from 'react-dom';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import BottomSheetDialog from '../components/BottomSheetDialog';

const BOTTOM_SHEET_CONTAINER_ID = 'bottom-sheet-dialog-container';

interface Props {
  title?: string;
  children: ReactNode;
}

const useBottomSheetDialog = () => {
  const router = useRouter();

  const close = () => {
    const existedContainer = document.getElementById(BOTTOM_SHEET_CONTAINER_ID);
    if (!existedContainer) return;
    existedContainer.remove();
    document.body.style.overflow = 'auto';
  };

  const open = (props: Props) => {
    const container = document.createElement('div');
    container.id = BOTTOM_SHEET_CONTAINER_ID;
    document.body.appendChild(container);
    ReactDOM.render(<BottomSheetDialog {...props} isOpen={true} close={close} />, container);
  };

  useEffect(() => {
    const handleRouteChangeStart = () => {
      const existedContainer = document.getElementById(BOTTOM_SHEET_CONTAINER_ID);

      if (existedContainer) {
        ReactDOM.unmountComponentAtNode(existedContainer);
        existedContainer.remove();
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router.events]);

  return {
    open,
    close,
  };
};

export default useBottomSheetDialog;
