import { PropsWithChildren } from 'react';
import { Overlay } from '../interface';
interface OverlayContextState {
    stacks?: Overlay[];
    pushOverlay(overlay: Overlay): void;
    deleteOverlay(overlayID: string): void;
    deleteAllOverlay(type?: string): void;
}
interface Props {
}
export declare const OverlayContext: import('react').Context<OverlayContextState>;
export declare const OverlayProvider: ({ children }: PropsWithChildren<Props>) => JSX.Element;
export default function useOverlayContext(): OverlayContextState;
export {};
