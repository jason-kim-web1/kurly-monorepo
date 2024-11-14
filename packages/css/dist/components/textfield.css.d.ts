import { RecipeVariants } from '@vanilla-extract/recipes';
export declare const root: import('@vanilla-extract/recipes').RuntimeFn<{
    as: {
        textarea: {
            flexDirection: "column";
        };
        input: {
            flexDirection: "row";
            paddingTop: "13px";
            paddingBottom: "13px";
        };
    };
}>;
export declare const addedTextUL: string;
export declare const infoText: import('@vanilla-extract/recipes').RuntimeFn<{
    dot: {
        true: {
            paddingLeft: any;
        };
    };
}>;
export declare const errorText: import('@vanilla-extract/recipes').RuntimeFn<{
    error: {
        true: {
            color: any;
        };
        false: {
            color: any;
        };
    };
}>;
export declare const infoTextDot: string;
export declare const input: string;
export declare const textFieldInputVariants: import('@vanilla-extract/recipes').RuntimeFn<{
    disabled: {
        true: {
            color: any;
            selectors: {
                '&::placeholder': {
                    color: any;
                };
            };
        };
    };
    error: {
        true: {
            selectors: {
                '&::placeholder': {
                    color: any;
                };
            };
        };
    };
    as: {
        textarea: {
            paddingTop: any;
            selectors: {
                '&:last-child': {
                    paddingBottom: any;
                };
            };
        };
    };
    focused: {
        true: {};
        false: {};
    };
}>;
export declare const textFieldInputBorderVariants: import('@vanilla-extract/recipes').RuntimeFn<{
    as: {
        textarea: {
            borderRadius: any;
        };
    };
    focused: {
        true: {
            borderColor: any;
        };
        false: {
            borderColor: any;
        };
    };
    disabled: {
        true: {
            borderColor: any;
        };
    };
    error: {
        true: {
            borderColor: any;
        };
    };
}>;
export declare const textFieldLabelVariants: string;
export declare const textFieldLabelRequiredVariants: import('@vanilla-extract/recipes').RuntimeFn<{
    disabled: {
        true: string;
        false: string;
    };
}>;
export declare const slot: string;
export declare const textFieldCounterVariants: import('@vanilla-extract/recipes').RuntimeFn<{
    focused: {
        true: {};
        false: {};
    };
    error: {
        true: {
            selectors: {
                '&::placeholder': {
                    color: any;
                };
            };
        };
    };
    as: {
        textarea: {
            width: "100%";
            textAlign: "right";
            marginTop: any;
            marginBottom: any;
            lineHeight: any;
        };
        input: {
            marginLeft: any;
        };
    };
}>;
export declare const textFieldInputCounterVariants: import('@vanilla-extract/recipes').RuntimeFn<{
    hasCount: {
        true: {};
        false: string;
    };
    error: {
        true: {};
    };
}>;
export declare const textFieldInputMaxLengthVariants: import('@vanilla-extract/recipes').RuntimeFn<{
    focused: {
        true: {};
        false: string;
    };
    error: {
        true: {};
    };
}>;
export type TextFieldInputVariants = RecipeVariants<typeof textFieldInputVariants>;
export type TextFieldInputBorderVariants = RecipeVariants<typeof textFieldInputBorderVariants>;
export type TextFieldLabelRequireVariants = RecipeVariants<typeof textFieldLabelRequiredVariants>;
export type TextFieldCounterVariants = RecipeVariants<typeof textFieldCounterVariants>;
export type TextFieldInputCounterVariants = RecipeVariants<typeof textFieldInputCounterVariants>;
export type textFieldInputMaxLengthVariants = RecipeVariants<typeof textFieldInputMaxLengthVariants>;
