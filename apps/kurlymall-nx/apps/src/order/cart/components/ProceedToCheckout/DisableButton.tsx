import { Button } from '@thefarmersfront/kpds-react';

import { ButtonStyle } from './ButtonStyle';

export default function DisableButton({ text }: { text: string }) {
  return (
    <Button css={ButtonStyle} _type={'primary'} color={'regular'} disabled={true}>
      {text}
    </Button>
  );
}
