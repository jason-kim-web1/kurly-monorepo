import { ComponentProps, ReactNode } from 'react';
import { ButtonVariants } from '@thefarmersfront/kpds-css';
export type Props = Omit<NonNullable<ButtonVariants>, 'type' | 'style'> & Omit<ComponentProps<'button'>, 'className' | 'children' | 'color' | 'ref'> & {
    _type?: NonNullable<ButtonVariants>['type'];
    _style?: NonNullable<ButtonVariants>['style'];
    className?: string;
    children?: string | ReactNode | Element;
};
export declare const Button: import('react').ForwardRefExoticComponent<Pick<Omit<any, "type" | "style"> & Omit<import('react').DetailedHTMLProps<import('react').ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "className" | "color" | "children" | "ref"> & {
    _type?: NonNullable<ButtonVariants>["type"];
    _style?: NonNullable<ButtonVariants>["style"];
    className?: string;
    children?: string | ReactNode | Element;
}, string | number | symbol> & import('react').RefAttributes<HTMLButtonElement>>;
