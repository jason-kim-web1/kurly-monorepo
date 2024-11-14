export declare const container: import('@vanilla-extract/recipes').RuntimeFn<{
    isHide: {
        true: {
            opacity: number;
        };
        false: {
            opacity: number;
        };
    };
    type: {
        normal: {
            paddingLeft: any;
        };
        error: {};
        success: {};
    };
    hasButton: {
        true: {};
    };
    buttonOrientation: {
        horizontal: {};
        vertical: {};
    };
    isPC: {
        true: {
            top: number;
        };
        false: {
            bottom: number;
        };
    };
}>;
export declare const snackbarContent: string;
export declare const snackbarText: string;
export declare const snackbarIcon: string;
export declare const snackbarButton: string;
