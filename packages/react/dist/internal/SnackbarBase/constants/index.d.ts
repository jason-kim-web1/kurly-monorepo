export declare const SNACKBAR_TYPE: {
    readonly NORMAL: "normal";
    readonly ERROR: "error";
    readonly SUCCESS: "success";
};
export type SnackbarType = (typeof SNACKBAR_TYPE)[keyof typeof SNACKBAR_TYPE];
export declare const SNACKBAR_BUTTON_ORIENTATION: {
    readonly HORIZONTAL: "horizontal";
    readonly VERTICAL: "vertical";
};
export type SnackbarButtonOrientation = (typeof SNACKBAR_BUTTON_ORIENTATION)[keyof typeof SNACKBAR_BUTTON_ORIENTATION];
