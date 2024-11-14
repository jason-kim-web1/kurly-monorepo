import { ComponentProps } from 'react';
import { TextVariants } from '@thefarmersfront/kpds-css';
export type Props = {
    ellipsis?: boolean;
    type?: 'box' | 'line';
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    className?: string;
    onChange?(checked: boolean): void;
    inputProps?: Omit<ComponentProps<'input'>, 'onChange'>;
    textProps?: TextVariants;
};
export declare const Checkbox: import('react').ForwardRefExoticComponent<Props & import('react').RefAttributes<HTMLInputElement>>;
