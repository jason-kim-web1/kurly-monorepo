import { useMemo } from 'react';
import { Typography } from '@/components/Typography';
import clsx from 'clsx';
import { AlertBaseStyles } from '@thefarmersfront/kpds-css';
import { AlertBaseContentsProps } from '@/internal/AlertBase/interface';

const AlertBaseContents = ({ contents }: AlertBaseContentsProps) => {
  const isTextContent = useMemo(() => typeof contents === 'string', [contents]);

  if (isTextContent) {
    return (
      <Typography variant={'$xlargeRegular'} className={clsx(AlertBaseStyles.contentText)}>
        {contents}
      </Typography>
    );
  }

  return <div className={clsx(AlertBaseStyles.contentComponent)}>{contents}</div>;
};

export default AlertBaseContents;
