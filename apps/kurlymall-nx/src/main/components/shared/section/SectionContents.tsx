import { ReactElement, ReactNode } from 'react';

import { MainSection } from '../../../interfaces/MainSection.interface';

interface Props {
  section: MainSection<unknown>;
  children?: ReactNode;
  loadingLayer?: ReactElement;
  className?: string;
}

export default function SectionContents({ section, children, loadingLayer, className }: Props) {
  const { isLoading, isError } = section;

  if (isError) {
    return null;
  }

  if (isLoading && loadingLayer) {
    return <div className={className}>{loadingLayer}</div>;
  }

  return <div className={className}>{children}</div>;
}
