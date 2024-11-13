import { ReactElement, ReactNode } from 'react';

import { MainSection } from '../../../interfaces/MainSection.interface';
import Contents from '../../shared/section/SectionContents';

interface Props {
  section: MainSection<unknown>;
  loadingLayer?: ReactElement;
  children?: ReactNode;
  className?: string;
}

export default function SectionContents({ section, children, loadingLayer, className }: Props) {
  const { isLoading, isError } = section;

  if (isError) {
    return null;
  }

  if (isLoading && loadingLayer) {
    return <>{loadingLayer}</>;
  }

  return (
    <Contents className={className} section={section} loadingLayer={loadingLayer}>
      {children}
    </Contents>
  );
}
