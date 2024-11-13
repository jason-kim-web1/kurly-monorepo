import { ReactNode } from 'react';

import PanelHeader from './PanelHeader';

const style = {
  panel: {
    backgroundColor: '#fff',
    padding: '18px 20px 20px',
  },
};

interface Props {
  title?: string;
  headerContent?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function Panel({ title = '', headerContent, children, className }: Props) {
  return (
    <div css={style.panel} className={className}>
      {title && <PanelHeader title={title} headerContent={headerContent} />}
      {children}
    </div>
  );
}
