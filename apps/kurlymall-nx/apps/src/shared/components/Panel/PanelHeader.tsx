import { ReactNode } from 'react';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 600,
    position: 'relative' as const,
    fontSize: '16px',
  },
  title: {
    fontSize: '18px',
  },
};

interface Props {
  title: string;
  headerContent?: ReactNode;
}

export default function PanelHeader({ title, headerContent }: Props) {
  return (
    <div css={styles.header}>
      {title}
      {headerContent}
    </div>
  );
}
