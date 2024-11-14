import { ComponentProps, PropsWithChildren, Ref } from 'react';
import { TextVariants } from '@thefarmersfront/kpds-css';
export type RadioBaseProps = {
    className?: string;
};
export declare const RadioBase: {
    ({ children, className }: PropsWithChildren<RadioBaseProps>): JSX.Element;
    Icon: ({ value, disabled, inputProps, ref }: RadioIconProps) => JSX.Element;
    Label: ({ className, label, ellipsis, disabled, textProps }: RadioLabelProps) => JSX.Element;
};
export type RadioIconProps = {
    value: string | number;
    disabled?: boolean;
    ref?: Ref<HTMLInputElement>;
    inputProps?: Omit<ComponentProps<'input'>, 'className' | 'defaultChecked' | 'disabled'>;
};
export type RadioLabelProps = {
    ellipsis?: boolean;
    disabled?: boolean;
    label?: string;
    className?: string;
    textProps?: TextVariants;
};
