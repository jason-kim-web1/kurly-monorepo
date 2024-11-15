import { ChangeEvent, createContext, PropsWithChildren, useMemo } from 'react';

import useControlled from '@/hooks/useControlled';

interface State {
  selectedValue?: unknown;
  name: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  setValue(value: unknown): void;
}

const initialState: State = {
  selectedValue: '',
  name: '',
  onChange(_: ChangeEvent<HTMLInputElement>) {},
  setValue(_: unknown) {},
};

export const RadioGroupContext = createContext<State>(initialState);

export type RadioGroupBaseProps = {
  name: string;
  selected?: unknown;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
};

export const RadioGroupBase = ({ children, name, selected, onChange }: PropsWithChildren<RadioGroupBaseProps>) => {
  const [value, setValue] = useControlled({
    controlled: selected,
    default: '',
    name: 'RadioGroup',
  });

  const contextValue = useMemo(
    () => ({
      name,
      selectedValue: value,
      onChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
        if (onChange) {
          onChange(event);
        }
      },
      setValue,
    }),
    [name, value, onChange, setValue],
  );

  return <RadioGroupContext.Provider value={contextValue}>{children}</RadioGroupContext.Provider>;
};
