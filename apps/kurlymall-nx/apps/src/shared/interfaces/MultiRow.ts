import { ReactNode } from 'react';

export interface Row {
  subject: string;
  contents: ReactNode;
  className?: string;
}

export type MultiRowBase = Row[];
