import { useRouter } from 'next/router';
import ReactDOM from 'react-dom';
import { ReactNode, useEffect, useState } from 'react';

import FullTypeBottomSheetComponent from '../../../shared/components/KPDS/FullTypeBottomSheet';
import { isPC } from '../../../../util/window/getDevice';

const BOTTOM_SHEET_CONTAINER_ID = 'full-type-bottom-sheet-container';

interface componentProps {
  title?: string;
  children: ReactNode;
  fixedBottomContent?: ReactNode;
}

const useFullTypeBottomSheet = () => {
  const router = useRouter();
  const [componentProps, setComponentProps] = useState<componentProps>({ children: <></> });
  const [isOpen, setIsOpen] = useState(false);

  const open = (state: componentProps) => {
    setComponentProps(state);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isPC) return;

    const existedContainer = document.getElementById(BOTTOM_SHEET_CONTAINER_ID);

    if (!existedContainer) {
      const container = document.createElement('div');
      container.id = BOTTOM_SHEET_CONTAINER_ID;
      document.body.appendChild(container);
      // MEMO: react18 에서는 createRoot로 변경 되어야 합니다.
      ReactDOM.render(<FullTypeBottomSheetComponent {...componentProps} isOpen={isOpen} close={close} />, container);
    } else {
      ReactDOM.render(
        <FullTypeBottomSheetComponent {...componentProps} isOpen={isOpen} close={close} />,
        existedContainer,
      );
    }
  }, [isOpen, componentProps]);

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

export default useFullTypeBottomSheet;
