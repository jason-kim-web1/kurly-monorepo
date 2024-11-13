import { Button } from '@thefarmersfront/kpds-react';

import Progress from '../../../../shared/icons/kpds/progress';
import { ButtonStyle } from './ButtonStyle';

export default function CheckoutLoadingButton() {
  return (
    <Button css={ButtonStyle} _type={'primary'}>
      <Progress type="white" />
    </Button>
  );
}
