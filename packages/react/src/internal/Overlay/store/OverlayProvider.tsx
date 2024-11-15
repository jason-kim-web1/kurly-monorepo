import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { Overlay } from '@/internal/Overlay/interface';
import { KPDS_PORTAL_ELEMENT_ID } from '@/components/ThemeProvider';
import { createPortal } from 'react-dom';

interface OverlayContextState {
  stacks?: Overlay[];
  pushOverlay(overlay: Overlay): void;
  deleteOverlay(overlayID: string): void;
  deleteAllOverlay(type?: string): void;
}

const initialState: OverlayContextState = {
  stacks: [],
  pushOverlay: () => {},
  deleteOverlay: () => {},
  deleteAllOverlay: () => {},
};

interface Props {}

export const OverlayContext = createContext(initialState);
export const OverlayProvider = ({ children }: PropsWithChildren<Props>) => {
  const [stacks, setStacks] = useState<Overlay[]>([]);
  const [portalEle, setPortalEle] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalEle(document.getElementById(KPDS_PORTAL_ELEMENT_ID) ?? document.body);
  }, []);

  const handlePushOverlay = (overlay: Overlay) => {
    setStacks((prevStates) => [...prevStates, overlay]);
  };

  const handleDeleteOverlay = (overlayID: string) => {
    setStacks((prevStates) => prevStates.filter(({ id }) => id !== overlayID));
  };

  const handleDeleteAllOverlay = (type?: string) => {
    if (type) {
      setStacks((prevStates) => prevStates.filter(({ type: overlayType }) => overlayType !== type));
      return;
    }

    setStacks([]);
  };

  const value = useMemo(
    () => ({
      stacks,
      pushOverlay: handlePushOverlay,
      deleteOverlay: handleDeleteOverlay,
      deleteAllOverlay: handleDeleteAllOverlay,
    }),
    [stacks],
  );

  return (
    <OverlayContext.Provider value={value}>
      {portalEle &&
        stacks.map(({ contents }) => {
          return createPortal(contents, portalEle);
        })}
      {children}
    </OverlayContext.Provider>
  );
};

export default function useOverlayContext() {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw Error('useOverlayContext 는 OverlayContext 와 함께 사용되어야 합니다.');
  }

  return context;
}
