import { RecipeVariants } from '@vanilla-extract/recipes';
export declare const root: string;
export declare const toggleSwitchLabelVariants: import('@vanilla-extract/recipes').RuntimeFn<{
    disabled: {
        true: {
            color: "#BCC4CC";
        };
        false: {};
    };
}>;
export declare const toggleSwitchTrackVariants: import('@vanilla-extract/recipes').RuntimeFn<{
    isChecked: {
        true: string[];
        false: string[];
    };
    disabled: {
        true: {};
        false: {};
    };
}>;
export declare const toggleSwitchThumbVariants: import('@vanilla-extract/recipes').RuntimeFn<{
    isChecked: {
        true: {
            transform: "translateX(14px)";
        };
        false: {
            transform: "translateX(0px)";
        };
    };
}>;
export type ToggleSwitchLabelVariants = RecipeVariants<typeof toggleSwitchLabelVariants>;
export type ToggleSwitchTrackVariants = RecipeVariants<typeof toggleSwitchTrackVariants>;
export type ToggleSwitchThumbVariants = RecipeVariants<typeof toggleSwitchThumbVariants>;
