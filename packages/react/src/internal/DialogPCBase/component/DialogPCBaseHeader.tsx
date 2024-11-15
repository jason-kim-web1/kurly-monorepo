import { DialogPCBaseStyles } from '@thefarmersfront/kpds-css';
import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';
import { DialogPCBaseHeaderInterface, DialogPCBaseWrapperProps } from '@/internal/DialogPCBase/interface';
import { IconButton } from '@/components/IconButton';

const DialogPCBaseHeader = ({
  title,
  description,
  onClickConfirmButton,
}: DialogPCBaseHeaderInterface & Pick<DialogPCBaseWrapperProps, 'onClickConfirmButton'>) => {
  return (
    <div className={DialogPCBaseStyles.header}>
      <div className={DialogPCBaseStyles.headerContainer}>
        {(title || description) && (
          <div className={DialogPCBaseStyles.headerContent}>
            <>
              {title && (
                <Typography variant={'$xxlargeSemibold'} className={DialogPCBaseStyles.headerTitle}>
                  {title}
                </Typography>
              )}
              {description && (
                <Typography variant={'$largeRegular'} className={DialogPCBaseStyles.headerDescription}>
                  {description}
                </Typography>
              )}
            </>
          </div>
        )}
      </div>
      <div>
        <IconButton _type={'secondary'} size={'medium'} onClick={onClickConfirmButton}>
          <Icon type={'Close'} ratio={'1:1'} size={0} />
        </IconButton>
      </div>
    </div>
  );
};

export default DialogPCBaseHeader;
