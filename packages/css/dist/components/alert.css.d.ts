import { RecipeVariants } from '@vanilla-extract/recipes';
export declare const wrapper: string;
export declare const innerWrapper: string;
export declare const title: string;
export declare const contentComponent: string;
export declare const contentText: string;
export declare const buttonWrapper: import('@vanilla-extract/recipes').RuntimeFn<{
    buttonLayout: {
        vertical: {
            flexDirection: "column-reverse";
        };
        horizontal: {
            flexDirection: "row";
        };
    };
}>;
export declare const alertButton: import('@vanilla-extract/recipes').RuntimeFn<{
    buttonLayout: {
        vertical: {};
        horizontal: {};
    };
    isGroupButton: {
        true: {
            width: "50%";
            selectors: {
                '&:first-of-type': {
                    marginRight: any;
                };
            };
        };
    };
}>;
export type AlertButtonVariants = RecipeVariants<typeof alertButton>;
