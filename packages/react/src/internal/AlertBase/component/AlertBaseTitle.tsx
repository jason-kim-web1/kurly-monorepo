import { Typography } from '@/components/Typography';
import clsx from 'clsx';
import { AlertBaseStyles } from '@thefarmersfront/kpds-css';
import { AlertBaseTitleProps } from '@/internal/AlertBase/interface';

const AlertBaseTitle = ({ title }: AlertBaseTitleProps) => {
  if (!title) {
    return null;
  }

  return (
    <Typography variant={'$xxlargeSemibold'} className={clsx(AlertBaseStyles.title)}>
      {title}
    </Typography>
  );
};

export default AlertBaseTitle;
