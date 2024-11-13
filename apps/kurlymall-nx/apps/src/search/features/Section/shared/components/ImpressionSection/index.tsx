import type { CSSProperties } from 'react';
import { PropsWithChildren } from 'react';

import type { UnSpecifiedSection } from '../../../factory';
import { useLogger } from '../../../../../contexts/LogSearchContext';
import { ImpressionPolicy } from '../../../../../../shared/context/ImpressionPolicyContext';
import { Section } from '../Section';

type ImpressionSectionProps = {
  section: UnSpecifiedSection;
  className?: string;
  style?: CSSProperties;
};

const ImpressionSection = ({ section, className, style, children }: PropsWithChildren<ImpressionSectionProps>) => {
  const { _type } = section;
  const { logImpressionSection } = useLogger();

  const handleImpressionInView = () => logImpressionSection(section);

  return (
    <ImpressionPolicy onInView={handleImpressionInView}>
      <Section type={_type} className={className} style={style}>
        {children}
      </Section>
    </ImpressionPolicy>
  );
};

export { ImpressionSection };
