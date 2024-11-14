import { MouseEvent } from 'react';
export default function useOverlayEvent({ allowOutsideClick, handleCloseButton, }: {
    allowOutsideClick: boolean;
    handleCloseButton?: () => void;
}): {
    handleEscapeKeyDown: (event: KeyboardEvent) => void;
    handleClickOutside: () => false | undefined;
    handleStopPropagation: (event: MouseEvent<HTMLDivElement>) => void;
};
