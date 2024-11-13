import { eq } from 'lodash';

import ReviewModal from '../ReviewModal';
import ReviewInstructionContent from '../ReviewModal/ReviewInstructionContent';
import { useReviewDialogActions, useReviewDialogState, DIALOG_TYPES } from '../../../contexts/ReviewDialogContext';

export const ReviewInstructionDialog = () => {
  const { open, dialogType } = useReviewDialogState();
  const { closeDialog } = useReviewDialogActions();
  const isActualOpen = eq(open, true) && eq(dialogType, DIALOG_TYPES.INSTRUCTION);
  return (
    <ReviewModal title="후기 작성 시 유의사항" isOpen={isActualOpen}>
      <ReviewInstructionContent onClick={closeDialog} />
    </ReviewModal>
  );
};
