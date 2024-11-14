import { PropsWithChildren } from 'react';
type Mode = 'light' | 'dark';
type ThemeContextState = {
    themeMode: Mode;
    setThemeMode(mode: Mode): void;
};
export type ThemeProviderProps = {
    defaultMode?: Mode;
};
export declare const KPDS_PORTAL_ELEMENT_ID = "kpds-portal";
export declare const ThemeProvider: ({ children, defaultMode }: PropsWithChildren<ThemeProviderProps>) => JSX.Element;
export declare const useTheme: () => ThemeContextState;
export {};
