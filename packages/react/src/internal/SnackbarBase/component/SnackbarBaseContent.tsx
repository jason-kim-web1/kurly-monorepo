import { SnackbarBaseStyles } from '@thefarmersfront/kpds-css';
import { Typography } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { SNACKBAR_TYPE } from '@/internal/SnackbarBase/constants';
import { SnackbarBaseProps } from '@/internal/SnackbarBase/interface';

export default function SnackbarBaseContent({
  type = SNACKBAR_TYPE.NORMAL,
  message,
}: Pick<SnackbarBaseProps, 'type' | 'message'>) {
  return (
    <div className={SnackbarBaseStyles.snackbarContent}>
      {type !== SNACKBAR_TYPE.NORMAL && (
        <div className={SnackbarBaseStyles.snackbarIcon}>
          {type === SNACKBAR_TYPE.SUCCESS && <Icon type={'CheckCircle'} ratio={'1:1'} size={24} />}
          {type === SNACKBAR_TYPE.ERROR && <Icon type={'ErrorCircle_red'} ratio={'1:1'} size={24} />}
        </div>
      )}
      <Typography variant={'$xlargeRegular'} className={SnackbarBaseStyles.snackbarText}>
        {message}
      </Typography>
    </div>
  );
}
