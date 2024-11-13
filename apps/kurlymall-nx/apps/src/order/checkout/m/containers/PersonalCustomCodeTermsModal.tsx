import { css } from '@emotion/react';

import { memo } from 'react';

import { PERSONAL_CUSTOM_CODE_TERMS } from '../../../../shared/constant/checkout-terms';
import Dialog from '../../../shared/shared/components/Dialog';
import { TableTermsContent } from '../../../shared/shared/components/TableTermsContent';
import DialogAction from '../../../shared/shared/components/DialogAction';
import { PersonalCustomCodeTermsTableContent } from '../components/PersonalCustomsCodeDetail/PersonalCustomCodeTermsTableContent';
import { isPC } from '../../../../../util/window/getDevice';

interface Props {
  open: boolean;
  onClose: () => void;
}

const styles = {
  dialog: css`
    > div {
      overflow-y: auto;

      > p {
        font-weight: ${isPC ? 500 : 600};
      }
    }
  `,
  content: css`
    ${!isPC &&
    `
    > div {
        padding-top: 16px;
      }
  `}
  `,
};

function PersonalCustomsCodeTermsModal({ open, onClose }: Props) {
  const { title } = PERSONAL_CUSTOM_CODE_TERMS;

  return (
    <Dialog
      isOpen={open}
      contents={
        <TableTermsContent
          terms={PERSONAL_CUSTOM_CODE_TERMS}
          contents={<PersonalCustomCodeTermsTableContent />}
          styles={styles.content}
        />
      }
      title={title}
      actions={<DialogAction close={onClose} />}
      styles={styles.dialog}
    />
  );
}

export default memo(PersonalCustomsCodeTermsModal);
