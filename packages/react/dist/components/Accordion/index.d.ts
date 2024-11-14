import { PropsWithChildren } from 'react';
type AccordionProps = PropsWithChildren<{
    value: string[];
    onValueChange: (nextValue: string[]) => void;
}>;
export declare const Accordion: {
    ({ value, onValueChange, children }: AccordionProps): JSX.Element;
    Item: ({ value, children, title }: AccordionItemProps) => JSX.Element;
};
type AccordionItemProps = PropsWithChildren<{
    value: string;
    title: string;
}>;
export {};
