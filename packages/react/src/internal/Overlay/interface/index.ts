import { ReactNode } from 'react';

export interface Overlay {
  id: string;
  type: string;
  contents: ReactNode;
}

export type OverlayProps = Omit<Overlay, 'id'> & Partial<Pick<Overlay, 'id'>>;

export interface CloseOverlayProps {
  resolveStatus?: boolean;
}
