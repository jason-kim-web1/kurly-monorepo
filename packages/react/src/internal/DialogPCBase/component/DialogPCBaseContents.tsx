import { DialogPCBaseStyles } from '@thefarmersfront/kpds-css';
import { DialogPCBaseContentsInterface } from '@/internal/DialogPCBase/interface';

const DialogPCBaseContents = ({ contents }: DialogPCBaseContentsInterface) => {
  return (
    <div className={DialogPCBaseStyles.contents}>
      <div>{contents}</div>
    </div>
  );
};

export default DialogPCBaseContents;
