import { RecipeVariants } from '@vanilla-extract/recipes';
export declare const item: string;
export declare const header: string;
export declare const headerIconVariants: import('@vanilla-extract/recipes').RuntimeFn<{
    open: {
        true: {
            transform: "rotate(180deg)";
        };
        false: {
            transform: "rotate(0deg)";
        };
    };
}>;
export type AccordionHeaderIconVariants = RecipeVariants<typeof headerIconVariants>;
