import { ComponentProps, ReactElement } from 'react';
import { IconButtonVariants } from '@thefarmersfront/kpds-css';
declare const SIZE: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};
type Size = (typeof SIZE)[keyof typeof SIZE];
export type Props = Omit<NonNullable<IconButtonVariants>, 'type'> & Omit<ComponentProps<'button'>, 'className' | 'children' | 'ref'> & {
    _type?: NonNullable<IconButtonVariants>['type'];
    className?: string;
    size: Size;
    children: ReactElement;
};
/**
 * TODO
 * - size는 children으로 받고 있어서 children에서 사이즈 넣어줘도 오버라이딩 되고 있음
 *  - icon 타입만 받고 내부에서 처리하는 형태가 좋긴하나, icon 프로퍼티가 각자 달라서 어려움
 * - disable 컬러에 대해서 따로 작업 되어져 있지 않음 (figma에도 없음)
 */
export declare const IconButton: import('react').ForwardRefExoticComponent<Pick<Omit<any, "type"> & Omit<import('react').DetailedHTMLProps<import('react').ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "className" | "children" | "ref"> & {
    _type?: NonNullable<IconButtonVariants>["type"];
    className?: string;
    size: Size;
    children: ReactElement;
}, string | number | symbol> & import('react').RefAttributes<HTMLButtonElement>>;
export {};
