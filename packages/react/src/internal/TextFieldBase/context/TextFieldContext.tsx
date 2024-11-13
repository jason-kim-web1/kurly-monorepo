import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface TextFieldContextInterface {
  focused: boolean;
  disabled: boolean;
  required: boolean;
  error: boolean;
  count: number;
  setFocused: (isFocused: boolean) => void;
  setCount: (count: number) => void;
}

type TextFieldContextProps = Pick<TextFieldContextInterface, 'disabled' | 'required' | 'error'>;

const initialContextState: TextFieldContextInterface = {
  focused: false,
  disabled: false,
  required: false,
  error: false,
  count: 0,
  setFocused: (isFocused: boolean) => {},
  setCount: (count: number) => {},
};

const TextFieldContext = createContext<TextFieldContextInterface>(initialContextState);

export const TextFieldContextProvider = ({
  children,
  required,
  error,
  disabled,
}: PropsWithChildren<TextFieldContextProps>) => {
  const [focused, setFocused] = useState(false);
  const [count, setCount] = useState(0);

  const contextValue = useMemo(
    () => ({
      required,
      error,
      disabled,
      focused,
      count,
      setFocused,
      setCount,
    }),
    [required, error, disabled, focused, count],
  );

  return <TextFieldContext.Provider value={contextValue}>{children}</TextFieldContext.Provider>;
};

export const useTextFieldContext = () => {
  const value = useContext(TextFieldContext);
  if (value === undefined) {
    throw new Error('useTextFieldContext 는 TextFieldContextProvider 와 함께 사용되어야 합니다.');
  }
  return value;
};
