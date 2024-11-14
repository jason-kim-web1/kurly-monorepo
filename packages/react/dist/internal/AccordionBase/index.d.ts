import { PropsWithChildren } from 'react';
export interface AccordionBaseContext {
    value: string[];
    checkIsOpen(nextValue: string): boolean;
    onChangeValue(nextValue: string): void;
}
type AccordionBaseProps = PropsWithChildren<{
    value: string[];
    onValueChange: (nextValue: string[]) => void;
}>;
export declare const AccordionBase: {
    ({ children, value, onValueChange }: AccordionBaseProps): JSX.Element;
    Item: ({ children, className, value }: PropsWithChildren<AccordionBaseItemProps>) => JSX.Element;
    Header: ({ children, className }: PropsWithChildren<AccordionBaseHeaderProps>) => JSX.Element;
    Content: ({ className, children }: PropsWithChildren<AccordionBaseContentProps>) => JSX.Element | null;
};
type AccordionBaseItemProps = PropsWithChildren<{
    className?: string;
    value: string;
}>;
type AccordionBaseHeaderProps = {
    className?: string;
};
type AccordionBaseContentProps = {
    className?: string;
};
export type { AccordionBaseItemProps, AccordionBaseHeaderProps, AccordionBaseContentProps };
