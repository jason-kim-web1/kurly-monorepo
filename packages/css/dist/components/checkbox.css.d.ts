import { RecipeVariants } from '@vanilla-extract/recipes';
export declare const root: string;
export declare const input: string;
export declare const label: import('@vanilla-extract/recipes').RuntimeFn<{
    ellipsis: {
        true: {
            overflow: "hidden";
            whiteSpace: "nowrap";
            textOverflow: "ellipsis";
            wordBreak: "break-all";
        };
    };
    disabled: {
        true: string;
        false: {};
    };
    label: {
        true: string;
    };
}>;
export declare const icon: import('@vanilla-extract/recipes').RuntimeFn<{
    type: {
        box: (string | {
            borderWidth: "2px";
            borderStyle: "solid";
        })[];
        line: string;
    };
    disabled: {
        true: {};
        false: {};
    };
    checked: {
        true: {};
        false: string;
    };
}>;
export type LabelVariants = RecipeVariants<typeof label>;
export type IconVariants = RecipeVariants<typeof icon>;
