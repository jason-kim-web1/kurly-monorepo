import { eq, isNull } from 'lodash';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';

import ReviewModal from '../ReviewModal';
import {
  DIALOG_TYPES,
  RegistrationFormDialogData,
  useReviewDialogActions,
  useReviewDialogState,
} from '../../../contexts/ReviewDialogContext';
import { DialogContent } from './DialogContent';
import { amplitudeService, ScreenName } from '../../../../../shared/amplitude';
import { QueryKeys } from '../../../queries';
import Alert from '../../../../../shared/components/Alert/Alert';
import { ALERT_MESSAGES } from '../../../constants';
import { useMyKurlyStyleProfile } from '../../../hooks/useMyKurlyStyleProfile';

export const RegistrationFormDialog = () => {
  const { open, dialogType, dialogData } = useReviewDialogState();
  const { closeDialog } = useReviewDialogActions();
  const isActualOpen = eq(open, true) && eq(dialogType, DIALOG_TYPES.REGISTRATION_FORM);
  const prevIsActualOpenRef = useRef(isActualOpen);
  const { hasProfile } = useMyKurlyStyleProfile();
  const [isReviewFormChanged, setIsReviewFormChanged] = useState(false);
  const queryClient = useQueryClient();
  // TODO: DATA Validation
  const isValidDialogData = !isNull(dialogData);

  const handleCloseDialog = () => {
    closeDialog();
    amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_WRITING);
  };

  const handleCheckFormChangeAndCloseDialog = async () => {
    if (!isReviewFormChanged) {
      handleCloseDialog();
      return;
    }
    const { isDismissed } = await Alert({
      text: ALERT_MESSAGES.CONFIRM_LEAVE_REGISTRATION_FORM,
      showCancelButton: true,
    });
    if (isDismissed) {
      return;
    }
    handleCloseDialog();
  };

  const handleReviewWriteSuccess = async () => {
    await queryClient.invalidateQueries({
      queryKey: QueryKeys.base(),
      exact: false,
    });
    await queryClient.refetchQueries({
      queryKey: QueryKeys.base(),
      exact: false,
    });
    if (hasProfile) {
      return;
    }
    handleCloseDialog();
  };

  const handleReviewFormChange = (isChanged: boolean) => {
    if (eq(isReviewFormChanged, isChanged)) {
      return;
    }
    setIsReviewFormChanged(isChanged);
  };

  useEffect(() => {
    if (eq(prevIsActualOpenRef.current, isActualOpen)) {
      return;
    }
    setIsReviewFormChanged(() => false);
    prevIsActualOpenRef.current = isActualOpen;
  }, [isActualOpen]);

  if (!isValidDialogData) {
    return null;
  }

  return (
    <ReviewModal
      title="후기 작성"
      isOpen={isActualOpen}
      onDismiss={handleCloseDialog}
      onBackdropClick={handleCheckFormChangeAndCloseDialog}
    >
      <DialogContent
        dialogData={dialogData as RegistrationFormDialogData}
        onClose={handleCloseDialog}
        onCheckFormChangeAndClose={handleCheckFormChangeAndCloseDialog}
        onFormChange={handleReviewFormChange}
        onRegistrationSuccess={handleReviewWriteSuccess}
      />
    </ReviewModal>
  );
};
