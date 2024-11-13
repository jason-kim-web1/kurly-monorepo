import { createContext, PropsWithChildren, useContext } from 'react';

interface ContextProps {
  mapProductName: (productName: string) => string;
}

// 초기값
const defaultValue: ContextProps = {
  mapProductName: (productName: string) => productName,
};

const context = createContext<ContextProps>(defaultValue);

const ProductCollectionPolicyProvider = ({ mapProductName, children }: PropsWithChildren<ContextProps>) => {
  return <context.Provider value={{ mapProductName }}>{children}</context.Provider>;
};

const useProductCollectionPolicy = () => {
  const ctx = useContext(context);

  if (ctx === undefined) {
    return defaultValue;
  }

  return ctx;
};

export { ProductCollectionPolicyProvider, useProductCollectionPolicy };
