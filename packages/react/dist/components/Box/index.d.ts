import { AllHTMLAttributes } from 'react';
type HTMLProperties = Omit<AllHTMLAttributes<HTMLElement>, 'className'>;
export type Props = HTMLProperties & {
    className?: string;
};
export declare const Box: import('react').ForwardRefExoticComponent<HTMLProperties & {
    className?: string;
} & import('react').RefAttributes<HTMLDivElement>>;
export {};
