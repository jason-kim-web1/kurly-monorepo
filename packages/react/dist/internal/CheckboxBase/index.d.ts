import { ComponentProps, PropsWithChildren, Ref } from 'react';
import { TextVariants } from '@thefarmersfront/kpds-css';
export type CheckboxBaseProps = {
    className?: string;
};
export declare const CheckboxBase: {
    ({ children, className }: PropsWithChildren<CheckboxBaseProps>): JSX.Element;
    Icon: ({ type, checked: checkState, defaultChecked, disabled, ref, inputProps, onChange, }: CheckboxIconProps) => JSX.Element;
    Label: ({ className, label, ellipsis, disabled, textProps }: CheckboxLabelProps) => JSX.Element;
};
export type CheckboxIconProps = {
    type?: 'box' | 'line';
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    ref?: Ref<HTMLInputElement>;
    inputProps?: Omit<ComponentProps<'input'>, 'onChange'>;
    onChange?(checked: boolean): void;
};
export type CheckboxLabelProps = {
    ellipsis?: boolean;
    disabled?: boolean;
    label?: string;
    className?: string;
    textProps?: TextVariants;
};
