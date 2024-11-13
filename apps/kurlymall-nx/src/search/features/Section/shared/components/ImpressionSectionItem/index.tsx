import type { CSSProperties } from 'react';
import { PropsWithChildren } from 'react';

import type { SectionItemViewModel, UnSpecifiedSection } from '../../../factory';
import { useLogger } from '../../../../../contexts/LogSearchContext';
import { ImpressionPolicy } from '../../../../../../shared/context/ImpressionPolicyContext';

type ImpressionSectionProps = {
  section: UnSpecifiedSection;
  item: SectionItemViewModel;
  className?: string;
  style?: CSSProperties;
};

const ImpressionSectionItem = ({ section, item, children }: PropsWithChildren<ImpressionSectionProps>) => {
  const { logImpressionSectionItem } = useLogger();

  const handleImpressionInView = () => {
    logImpressionSectionItem(section, item);
  };

  return <ImpressionPolicy onInView={handleImpressionInView}>{children}</ImpressionPolicy>;
};

export { ImpressionSectionItem };
