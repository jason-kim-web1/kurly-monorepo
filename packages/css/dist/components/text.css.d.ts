import { RecipeVariants } from '@vanilla-extract/recipes';
export declare const variants: import('@vanilla-extract/recipes').RuntimeFn<{
    size: {
        $64: string;
        $36: string;
        $28: string;
        $24: string;
        $20: string;
        $18: string;
        $16: string;
        $14: string;
        $13: string;
        $12: string;
        $10: string;
    };
    weight: {
        bold: string;
        semibold: string;
        regular: string;
    };
    lineHeight: {
        $72: string;
        $44: string;
        $36: string;
        $32: string;
        $28: string;
        $26: string;
        $22: string;
        $20: string;
        $18: string;
        $16: string;
        $14: string;
    };
}>;
export type Variants = RecipeVariants<typeof variants>;
