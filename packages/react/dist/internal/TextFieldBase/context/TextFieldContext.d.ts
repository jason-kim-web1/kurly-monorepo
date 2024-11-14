import { PropsWithChildren } from 'react';
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
export declare const TextFieldContextProvider: ({ children, required, error, disabled, }: PropsWithChildren<TextFieldContextProps>) => JSX.Element;
export declare const useTextFieldContext: () => TextFieldContextInterface;
export {};
