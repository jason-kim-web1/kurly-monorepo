import { RecipeVariants } from '@vanilla-extract/recipes';
export declare const root: string;
export declare const variants: import('@vanilla-extract/recipes').RuntimeFn<{
    type: {
        next: {
            transform: "rotate(180deg)";
        };
        prev: {};
    };
    disabled: {
        true: {
            backgroundImage: "url(../icon/ic_arrow_left_inactive.svg)";
        };
        false: {
            backgroundImage: "url(../icon/ic_arrow_left_active.svg)";
        };
    };
    defaultVariants: {
        type: string;
    };
}>;
export type Variants = RecipeVariants<typeof variants>;
