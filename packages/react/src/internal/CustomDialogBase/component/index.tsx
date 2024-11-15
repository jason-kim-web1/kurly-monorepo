import { AlertBaseStyles } from '@thefarmersfront/kpds-css';
import { AlertBaseContentsProps } from '@/internal/AlertBase/interface';
import { useEffect } from 'react';

/** base component */
export default function CustomDialogBase({ contents }: AlertBaseContentsProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={AlertBaseStyles.backdrop}>
      <div className={AlertBaseStyles.container}>{contents}</div>
    </div>
  );
}
