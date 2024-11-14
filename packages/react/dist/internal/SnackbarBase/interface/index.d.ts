import { SnackbarButtonOrientation, SnackbarType } from '../constants';
export interface SnackbarBaseProps {
    type?: SnackbarType;
    message: string;
    button?: {
        text: string;
        orientation: SnackbarButtonOrientation;
        onClick: () => void;
    };
    duration?: number;
    isPC?: boolean;
    onClose: () => void;
}
