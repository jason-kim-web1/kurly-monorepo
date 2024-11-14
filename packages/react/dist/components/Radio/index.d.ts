import { ComponentProps } from 'react';
import { TextVariants } from '@thefarmersfront/kpds-css';
export type Props = {
    className?: string;
    label?: string;
    ellipsis?: boolean;
    value: string | number;
    disabled?: boolean;
    inputProps?: Omit<ComponentProps<'input'>, 'className' | 'defaultChecked' | 'checked' | 'disabled'>;
    textProps?: TextVariants;
};
export declare const Radio: import('react').ForwardRefExoticComponent<Props & import('react').RefAttributes<HTMLInputElement>>;
