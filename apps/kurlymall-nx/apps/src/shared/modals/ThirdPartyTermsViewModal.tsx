import { css } from '@emotion/react';

import { memo } from 'react';

import Dialog from '../../order/shared/shared/components/Dialog';
import { isPC } from '../../../util/window/getDevice';
import { TermsInfo } from '../interfaces/UserTerms';
import { TableTermsContent } from '../../order/shared/shared/components/TableTermsContent';
import { ThirdPartyTableContent } from '../../order/shared/shared/components/ThirdPartyTableContent';

import { THIRD_PARTY_DYNAMIC_TERMS } from '../constant/checkout-terms';
import DialogAction from '../../order/shared/shared/components/DialogAction';

interface Props {
  open: boolean;
  onClose: () => void;
  personalInfo: TermsInfo[];
  isPickupOrder: boolean;
}

const styles = {
  dialog: css`
    > div {
      overflow-y: auto;

      > p {
        ${!isPC && `font-weight: 600;`}
      }
    }
  `,
};

function ThirdPartyTermsViewModal({ open, onClose, personalInfo, isPickupOrder }: Props) {
  const { title } = THIRD_PARTY_DYNAMIC_TERMS;

  return (
    <Dialog
      isOpen={open}
      contents={
        <TableTermsContent
          terms={THIRD_PARTY_DYNAMIC_TERMS}
          contents={<ThirdPartyTableContent personalInfo={personalInfo} isPickupOrder={isPickupOrder} />}
        />
      }
      title={title}
      actions={<DialogAction close={onClose} />}
      styles={styles.dialog}
    />
  );
}

export default memo(ThirdPartyTermsViewModal);
