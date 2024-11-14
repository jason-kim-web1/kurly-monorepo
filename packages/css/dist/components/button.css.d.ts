import { RecipeVariants } from '@vanilla-extract/recipes';
export declare const variants: import('@vanilla-extract/recipes').RuntimeFn<{
    type: {
        primary: {};
        secondary: {};
        tertiary: {};
        danger: {};
        kakao: {};
    };
    size: {
        small: string;
        medium: string;
        large: string;
        extraLarge: string;
    };
    shape: {
        capsule: {};
        square: {};
    };
    style: {
        fill: {};
        stroke: {
            borderWidth: "1px";
            borderStyle: "solid";
        };
    };
    color: {
        regular: {};
        light: {};
    };
    weight: {
        semibold: string;
        regular: string;
    };
}>;
export type Variants = RecipeVariants<typeof variants>;
