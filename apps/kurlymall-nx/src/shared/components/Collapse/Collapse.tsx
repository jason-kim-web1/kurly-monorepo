import { ReactNode } from 'react';

import SlideToggleWrapper from '../motion/SlideToggleWrapper';
import CollapseHead from './CollapseHead';

interface Props {
  title: string | ReactNode;
  summary: ReactNode;
  opened: boolean;
  isSummaryKeepOpen?: boolean;
  onClick: () => void;
  children?: ReactNode;
}

export default function Collapse({ title, summary, opened = false, onClick, children, isSummaryKeepOpen }: Props) {
  return (
    <>
      <CollapseHead
        title={title}
        summary={summary}
        isSummaryKeepOpen={isSummaryKeepOpen}
        opened={opened}
        onClick={onClick}
      />
      <SlideToggleWrapper opened={opened}>{children}</SlideToggleWrapper>
    </>
  );
}
