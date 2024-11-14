import { CloseOverlayProps, OverlayProps } from '../internal/Overlay/interface';
export default function useOverlay(): {
    openOverlay: ({ id, ...props }: OverlayProps) => Promise<boolean>;
    closeOverlay: ({ resolveStatus }: CloseOverlayProps) => void;
    closeAllOverlay: (type?: string) => void;
};
