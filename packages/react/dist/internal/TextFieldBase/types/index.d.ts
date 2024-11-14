import { ChangeEvent, ComponentProps, FocusEvent, MouseEvent } from 'react';
export interface TextFieldProps {
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    infoText?: {
        isDot?: boolean;
        text: string[];
    };
    errorText?: {
        isError: boolean;
        text: string;
    }[];
    label?: string;
    placeholder?: string;
    value?: string;
    maxLength?: number;
    minLength?: number;
    autoHeight?: boolean;
    inputProps?: ComponentProps<'input' | 'textarea'>;
    as?: 'input' | 'textarea';
    onFocus?(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
    onBlur?(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
    onChange?(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
    onClick?(event: MouseEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}
