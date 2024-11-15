import { SnackbarBaseStyles } from '@thefarmersfront/kpds-css';
import { TextButton } from '@/components/TextButton';
import { SnackbarBaseProps } from '@/internal/SnackbarBase/interface';

export default function SnackbarBaseButton({ button }: Pick<SnackbarBaseProps, 'button'>) {
  if (!button) {
    return null;
  }

  const { text, onClick } = button;

  return (
    <div className={SnackbarBaseStyles.snackbarButton}>
      <TextButton _type={'inverse'} _style={'normal'} size={'medium'} weight={'semibold'} onClick={onClick}>
        {text}
      </TextButton>
    </div>
  );
}
