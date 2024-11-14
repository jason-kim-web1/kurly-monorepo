import { RecipeVariants } from '@vanilla-extract/recipes';
export declare const variants: import('@vanilla-extract/recipes').RuntimeFn<{
    type: {
        primary: (string | {
            selectors: {
                '&:hover, &:active': {
                    backgroundColor: any;
                };
                '&:disabled': {
                    color: any;
                    backgroundColor: "transparent";
                };
            };
        })[];
        secondary: (string | {
            selectors: {
                '&:hover, &:active': {
                    backgroundColor: any;
                };
                '&:disabled': {
                    color: any;
                    backgroundColor: "transparent";
                };
            };
        })[];
        tertiary: (string | {
            selectors: {
                '&:hover, &:active': {
                    backgroundColor: any;
                };
                '&:disabled': {
                    color: any;
                    backgroundColor: "transparent";
                };
            };
        })[];
        quaternary: (string | {
            selectors: {
                '&:hover, &:active': {
                    backgroundColor: any;
                };
                '&:disabled': {
                    color: any;
                    backgroundColor: "transparent";
                };
            };
        })[];
        quinary: (string | {
            selectors: {
                '&:hover, &:active': {
                    backgroundColor: any;
                };
                '&:disabled': {
                    color: any;
                    backgroundColor: "transparent";
                };
            };
        })[];
        inverse: (string | {
            selectors: {
                '&:hover, &:active': {
                    backgroundColor: any;
                };
                '&:disabled': {
                    color: any;
                    backgroundColor: "transparent";
                };
            };
        })[];
        universal: (string | {
            selectors: {
                '&:hover, &:active': {
                    backgroundColor: any;
                };
                '&:disabled': {
                    color: any;
                    backgroundColor: "transparent";
                };
            };
        })[];
        danger: (string | {
            selectors: {
                '&:hover, &:active': {
                    backgroundColor: any;
                };
                '&:disabled': {
                    color: any;
                    backgroundColor: "transparent";
                };
            };
        })[];
        point: (string | {
            selectors: {
                '&:hover, &:active': {
                    backgroundColor: any;
                };
                '&:disabled': {
                    color: any;
                    backgroundColor: "transparent";
                };
            };
        })[];
    };
    style: {
        normal: {};
        underline: {
            textDecoration: "underline";
        };
    };
    size: {
        large: (string | {
            height: "42px";
        })[];
        medium: (string | {
            height: "38px";
        })[];
        small: (string | {
            height: "36px";
        })[];
    };
}>;
export type Variants = RecipeVariants<typeof variants>;
