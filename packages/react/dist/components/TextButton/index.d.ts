import { ComponentProps, ReactNode } from 'react';
import { TextButtonVariants } from '@thefarmersfront/kpds-css';
export type Props = Omit<NonNullable<TextButtonVariants>, 'type' | 'style'> & Omit<ComponentProps<'button'>, 'className' | 'children' | 'color' | 'ref'> & {
    _type?: NonNullable<TextButtonVariants>['type'];
    _style?: NonNullable<TextButtonVariants>['style'];
    weight?: 'semibold' | 'regular';
    className?: string;
    children?: string | ReactNode | Element;
};
export declare const TextButton: import('react').ForwardRefExoticComponent<Pick<Omit<any, "type" | "style"> & Omit<import('react').DetailedHTMLProps<import('react').ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "className" | "color" | "children" | "ref"> & {
    _type?: NonNullable<TextButtonVariants>["type"];
    _style?: NonNullable<TextButtonVariants>["style"];
    weight?: "semibold" | "regular";
    className?: string;
    children?: string | ReactNode | Element;
}, string | number | symbol> & import('react').RefAttributes<HTMLButtonElement>>;
