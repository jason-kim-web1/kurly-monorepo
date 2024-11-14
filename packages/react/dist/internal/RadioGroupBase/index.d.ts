import { ChangeEvent, PropsWithChildren } from 'react';
interface State {
    selectedValue?: unknown;
    name: string;
    onChange(event: ChangeEvent<HTMLInputElement>): void;
    setValue(value: unknown): void;
}
export declare const RadioGroupContext: import('react').Context<State>;
export type RadioGroupBaseProps = {
    name: string;
    selected?: unknown;
    onChange?(event: ChangeEvent<HTMLInputElement>): void;
};
export declare const RadioGroupBase: ({ children, name, selected, onChange }: PropsWithChildren<RadioGroupBaseProps>) => JSX.Element;
export {};
