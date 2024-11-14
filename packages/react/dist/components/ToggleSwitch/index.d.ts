import { PropsWithChildren, ComponentProps } from 'react';
export interface ToggleSwitchContext {
    isChecked: boolean;
    disabled: boolean;
    onChange(nextValue: boolean): void;
}
export interface ToggleSwitchProps extends PropsWithChildren<ToggleSwitchContext> {
    inputProps?: Omit<ComponentProps<'input'>, 'className' | 'checked' | 'children' | 'disabled'>;
}
export declare const ToggleSwitch: {
    ({ children, isChecked, disabled, onChange, inputProps }: ToggleSwitchProps): JSX.Element;
    Label: ({ children, className }: PropsWithChildren<ToggleSwitchLabelProps>) => JSX.Element;
    Track: ({ className, children }: PropsWithChildren<ToggleSwitchTractProps>) => JSX.Element;
    Thumb: ({ className }: ToggleSwitchThumbProps) => JSX.Element;
};
export type ToggleSwitchLabelProps = {
    className?: string;
};
export type ToggleSwitchTractProps = {
    className?: string;
};
export type ToggleSwitchThumbProps = {
    className?: string;
};
