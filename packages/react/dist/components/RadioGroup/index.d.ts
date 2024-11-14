import { ChangeEvent, ReactNode } from 'react';
type Props = {
    children: ReactNode;
    name: string;
    selected?: unknown;
    onChange?(event: ChangeEvent<HTMLInputElement>): void;
};
export declare const RadioGroup: ({ children, name, selected, onChange }: Props) => JSX.Element;
export {};
