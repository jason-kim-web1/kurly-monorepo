import { css } from '@emotion/react';

import Button from '../../../../shared/components/Button/Button';
import COLOR from '../../../../shared/constant/colorset';
import { isPC } from '../../../../../util/window/getDevice';

const styles = {
  button: css`
    color: ${COLOR.kurlyPurple};
    border-color: ${COLOR.bgLightGray};
    border-width: 1px 0 0 0;
    margin-top: 16px;
    ${!isPC &&
    css`
      padding: 0 24px;
      border: none;
      text-align: right;
      margin: 0;
    `};
  `,
};

export default function DialogAction({ close }: { close: () => void }) {
  return <Button theme="tertiary" text="확인" height={57} radius={0} onClick={close} css={styles.button} />;
}
