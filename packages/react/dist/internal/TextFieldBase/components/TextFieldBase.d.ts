import { PropsWithChildren, Ref } from 'react';
import { TextFieldProps } from '..';
export type TextFieldBaseProps = Pick<TextFieldProps, 'disabled' | 'required' | 'error' | 'infoText' | 'errorText' | 'label' | 'as'> & {
    className?: string;
    direction?: 'column' | 'row';
};
export declare const TextFieldBase: {
    ({ children, className, infoText, errorText, label, as, }: PropsWithChildren<TextFieldBaseProps>): JSX.Element;
    Input: import('react').MemoExoticComponent<({ as, placeholder, value, maxLength, autoHeight, inputProps, onClick, onFocus, onBlur, onChange, className, ref, }: InputProps) => JSX.Element>;
    Slot: import('react').MemoExoticComponent<({ children, className }: PropsWithChildren<{
        className?: string;
    }>) => JSX.Element>;
    Counter: import('react').MemoExoticComponent<({ maxLength, minLength, className, as }: CounterProps) => JSX.Element | null>;
};
type InputProps = {
    className?: string;
    ref: Ref<HTMLInputElement | HTMLTextAreaElement>;
} & Pick<TextFieldProps, 'placeholder' | 'value' | 'maxLength' | 'as' | 'autoHeight' | 'inputProps' | 'onFocus' | 'onBlur' | 'onClick' | 'onChange'>;
export type CounterProps = {
    className?: string;
} & Pick<TextFieldProps, 'maxLength' | 'minLength' | 'as'>;
export {};
