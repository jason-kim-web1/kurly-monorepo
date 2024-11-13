import { useRouter } from 'next/router';
import { isNull } from 'lodash';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

interface State {
  previousRoutePath: string | null;
}

const initialState: State = {
  previousRoutePath: null,
};

const PreviousRoutePathContext = createContext(initialState);

interface PreviousRoutePathProviderProps {
  children: ReactNode;
}

export const PreviousRoutePathProvider = ({ children }: PreviousRoutePathProviderProps) => {
  const { asPath, isReady } = useRouter();
  const [previousRoutePath, setPreviousRoutePath] = useState<string | null>(null);
  const value = useMemo(() => ({ previousRoutePath }), [previousRoutePath]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    return () => {
      setPreviousRoutePath(asPath);
    };
  }, [isReady, asPath]);

  return <PreviousRoutePathContext.Provider value={value}>{children}</PreviousRoutePathContext.Provider>;
};

export const usePreviousRoutePath = () => {
  const value = useContext(PreviousRoutePathContext);
  if (value === undefined) {
    throw new Error('usePreviousRoutePath 는 PreviousRoutePathContext 와 함께 사용되어야 합니다.');
  }

  return value;
};

const checkPreviousRoute = (pathname: State['previousRoutePath'], targetPathname: string) => {
  if (isNull(pathname)) {
    return false;
  }
  return pathname.startsWith(targetPathname);
};

export const usePreviousRouteFromGoodsDetail = (): boolean => {
  const value = useContext(PreviousRoutePathContext);
  if (value === undefined) {
    throw new Error('usePreviousRoutePath 는 PreviousRoutePathContext 와 함께 사용되어야 합니다.');
  }
  const { previousRoutePath } = value;
  return checkPreviousRoute(previousRoutePath, '/goods/');
};

export const usePreviousRouteFromCPSGoodsDetail = (): boolean => {
  const value = useContext(PreviousRoutePathContext);
  if (value === undefined) {
    throw new Error('usePreviousRoutePath 는 PreviousRoutePathContext 와 함께 사용되어야 합니다.');
  }
  const { previousRoutePath } = value;
  return checkPreviousRoute(previousRoutePath, '/redirect');
};
