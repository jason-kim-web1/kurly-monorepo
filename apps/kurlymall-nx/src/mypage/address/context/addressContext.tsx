import { createContext, useMemo, useState } from 'react';

import { PropsWithChildrenOnly } from '../../../shared/interfaces';

interface StateInterface {
  isFullyData: boolean | null;
  iframeUrl: string;
  showIframe: boolean;
  actions: {
    setShowIframe(state: boolean): void;
    setIframeUrl(url: string): void;
    setIsFullyData(state: boolean): void;
  };
}

const initialState: StateInterface = {
  isFullyData: null,
  iframeUrl: '',
  showIframe: false,
  actions: {
    setShowIframe: () => {},
    setIframeUrl: () => {},
    setIsFullyData: () => {},
  },
};

export const AddressContext = createContext(initialState);

export const AddressContextProvider = ({ children }: PropsWithChildrenOnly) => {
  const [showIframe, setShowIframe] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [isFullyData, setIsFullyData] = useState<boolean | null>(null);

  const actions = useMemo(
    () => ({
      setShowIframe: (state: boolean) => setShowIframe(state),
      setIframeUrl: (url: string) => setIframeUrl(url),
      setIsFullyData: (state: boolean | null) => setIsFullyData(state),
    }),
    [],
  );

  const value = useMemo(
    () => ({ showIframe, iframeUrl, isFullyData, actions }),
    [showIframe, iframeUrl, isFullyData, actions],
  );

  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>;
};
