import { useRouter } from 'next/router';
import { eq, get, isUndefined } from 'lodash';
import { useContext, createContext } from 'react';

import { ParsedUrlQuery } from 'querystring';

type TabState = number;

type TabDispatch = (nextTabIndex: number) => void;

interface Props {
  tabIndex: TabState;
  setTabIndex: TabDispatch;
}

interface TabProviderProps {
  children(props: Props): JSX.Element;
}

const TabStateContext = createContext<TabState | undefined>(undefined);

const TabDispatchContext = createContext<TabDispatch | undefined>(undefined);

const getTabIndexFromQuery = (query: ParsedUrlQuery) => {
  const value = get(query, 'tabIndex');
  if (isUndefined(value) || value !== '1') {
    return 0;
  }
  return 1;
};

const TabProvider = ({ children }: TabProviderProps) => {
  const { isReady, query, pathname, replace } = useRouter();
  const tabIndex = getTabIndexFromQuery(query);
  const setTabIndex = (nextTabIndex: number) => {
    if (eq(tabIndex, nextTabIndex)) {
      return;
    }
    replace(`${pathname}?tabIndex=${nextTabIndex}`, undefined, { scroll: false });
  };

  if (!isReady) {
    return null;
  }

  return (
    <TabStateContext.Provider value={tabIndex}>
      <TabDispatchContext.Provider value={setTabIndex}>
        {children({ tabIndex, setTabIndex })}
      </TabDispatchContext.Provider>
    </TabStateContext.Provider>
  );
};

const useTabState = () => {
  const context = useContext(TabStateContext);
  if (typeof context === 'undefined') {
    throw new Error('useTabState must be used within the TabProvider');
  }
  return context;
};

export { TabProvider, useTabState };
