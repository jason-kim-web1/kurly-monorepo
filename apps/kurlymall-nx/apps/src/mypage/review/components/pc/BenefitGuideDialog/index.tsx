import { eq } from 'lodash';
import { css } from '@emotion/react';

import { Modal } from '../../../../../product/board/review/pc/ReviewModal/styled-components';
import ReviewBenefitGuide from '../../../../../product/board/review/pc/ReviewBenefits/ReviewBenefitGuide';
import { useReviewDialogState, DIALOG_TYPES, useReviewDialogActions } from '../../../contexts/ReviewDialogContext';

const modalStyle = css`
  .MuiPaper-root {
    border-radius: 12px;
    max-width: 440px;
    max-height: 533px;
  }
`;

export const BenefitGuideDialog = () => {
  const { open, dialogType } = useReviewDialogState();
  const { closeDialog } = useReviewDialogActions();
  const isActualOpen = eq(open, true) && eq(dialogType, DIALOG_TYPES.BENEFIT_GUIDE);
  return (
    <Modal open={isActualOpen} onBackdropClick={closeDialog} css={modalStyle}>
      <ReviewBenefitGuide onDismiss={closeDialog} />
    </Modal>
  );
};
