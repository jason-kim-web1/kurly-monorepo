import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { isFunction, isString, size } from 'lodash';

import Alert, { checkClosedByBackDrop } from '../../../../../shared/components/Alert/Alert';
import ImageFilePicker from '../../../../../shared/components/ImageFilePicker';
import { useCreateReviewImage } from '../../../hooks';
import TextInput from './TextInput';
import {
  ButtonGroup,
  CancelButton,
  FormContent,
  ImageCounter,
  InputField,
  InstructionItem,
  InstructionList,
  Label,
  SubmitButton,
  UploadCount,
} from './styled-components';
import { CenterSpinner, LoadingSpinner, ReviewImageWrapper, SpinnerOverlay } from '../../shared';
import {
  checkCanSelectImage,
  checkCanSubmitReviewForm,
  checkReviewFormChanged,
  triggerTextInputFocus,
} from '../../../utils';
import { ALLOWED_FILE_EXTENSIONS, REVIEW_VISIBILITY_TYPES, ALERT_MESSAGES } from '../../../constants';
import { PreviewImage, LAYOUT_TYPE } from '../../shared/PreviewImage';
import { useRegisterReview } from '../../../hooks/useRegisterReview';
import { logReviewRegisterNotification, logReviewRegisterNotificationSelect } from '../../../ProductReview.service';
import { SELECTION_TYPES } from '../../../../../shared/amplitude/events/review/SelectSubmitReviewNotification';
import { Sup } from '../../shared/styled-components';
import { ReviewGuidanceBanner } from '../../shared/ReviewGuidanceBanner';

interface Props {
  orderNo: number;
  dealProductNo: number;
  onTouch: Dispatch<SetStateAction<boolean>>;
  onDismiss(): void;
  onSuccess?(): void;
}

const ImageRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  width: 100%;
`;

export default function RegistrationForm({ orderNo, dealProductNo, onTouch, onDismiss, onSuccess }: Props) {
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('');
  const { images, handleChange, handleDismiss } = useCreateReviewImage({
    placeholderImageCount: 0,
    onRetryCancel: onDismiss,
  });
  const { isLoading, registerReview } = useRegisterReview({
    orderNo,
    dealProductNo,
    registerData: {
      contents: text,
      uploadImages: images.map(({ remoteUrl }) => remoteUrl).filter(isString),
    },
    onSuccess: () => {
      onDismiss();
      if (isFunction(onSuccess)) {
        onSuccess();
      }
    },
    onFailedByTextContent: () => {
      triggerTextInputFocus(textInputRef);
    },
    onOfflineRetryCancel: () => onDismiss(),
  });
  const imageCount = size(images);
  const canSelectImage = checkCanSelectImage(imageCount);
  const isReviewFormChanged = checkReviewFormChanged(
    {
      contents: '',
      prevImages: [],
      newImages: [],
      visibility: REVIEW_VISIBILITY_TYPES.PUBLIC,
    },
    {
      contents: text,
      prevImages: [],
      newImages: images,
      visibility: REVIEW_VISIBILITY_TYPES.PUBLIC,
    },
  );
  const canSubmitReviewForm = checkCanSubmitReviewForm({
    isSaving: isLoading,
    isFormChanged: isReviewFormChanged,
    contents: text,
    prevImages: [],
    newImages: images,
    visibility: REVIEW_VISIBILITY_TYPES.PUBLIC,
  });

  const handleCancel = async () => {
    if (text.length === 0) {
      onDismiss();
      return;
    }
    logReviewRegisterNotification('NULL');
    const { isDismissed, dismiss } = await Alert({
      text: ALERT_MESSAGES.CONFIRM_LEAVE_REGISTRATION_FORM,
      showCancelButton: true,
    });
    const isChooseNothing = checkClosedByBackDrop(dismiss);
    if (isDismissed || isChooseNothing) {
      logReviewRegisterNotificationSelect('NULL', SELECTION_TYPES.EDIT);
      return;
    }
    logReviewRegisterNotificationSelect('NULL', SELECTION_TYPES.BACK);
    onDismiss();
  };

  const handleSubmit = () => registerReview();

  useEffect(() => {
    onTouch(text.length > 0);
  }, [text.length, onTouch]);

  return (
    <form>
      <ReviewGuidanceBanner />
      <FormContent>
        <InputField>
          <Label required>
            내용<Sup>*</Sup>
          </Label>
          <TextInput ref={textInputRef} value={text} onChange={(value) => setText(value)} />
        </InputField>
        <InputField>
          <Label>
            사진 첨부
            <ImageCounter>
              <UploadCount isCount={images.length > 0}>{images.length}장</UploadCount>
              /최대 8장
            </ImageCounter>
          </Label>
          <ImageRow>
            {images.map((image, index) => (
              <ReviewImageWrapper key={`${image.id}-${index}`} isError={image.status === 'ERROR'}>
                <PreviewImage
                  src={image.url}
                  layoutType={LAYOUT_TYPE.FIXED}
                  onDismiss={() => handleDismiss(image.id)}
                />
                <AnimatePresence>
                  {image.status === 'PENDING' ? (
                    <SpinnerOverlay>
                      <CenterSpinner>
                        <LoadingSpinner />
                      </CenterSpinner>
                    </SpinnerOverlay>
                  ) : null}
                </AnimatePresence>
              </ReviewImageWrapper>
            ))}
            {canSelectImage ? (
              <ImageFilePicker
                key={imageCount}
                allowedFileExtensions={ALLOWED_FILE_EXTENSIONS}
                imagePickerStyle={css`
                  width: 72px;
                  padding-bottom: 72px;
                `}
                onChange={handleChange}
              />
            ) : null}
          </ImageRow>
        </InputField>
        <InputField>
          <Label></Label>
          <InstructionList>
            <InstructionItem>사진은 최대 8장까지, 30MB 이하의 이미지만 업로드가 가능합니다.</InstructionItem>
            <InstructionItem>
              상품과 무관하거나 반복되는 동일 단어/문장을 사용하여 후기로 볼 수 없는 글, 판매자와 고객의 후기 이용을
              방해한다고 판단되는 경우, 배송 박스, 구매 상품을 구분할 수 없는 전체 사진, 화면캡쳐, 음란 및 부적절하거나
              불법적인 내용은 통보없이 삭제 및 적립금 회수될 수 있습니다.
            </InstructionItem>
            <InstructionItem>
              전화번호, 이메일, 주소, 계좌번호 등 개인정보가 노출되지 않도록 주의해주세요.
            </InstructionItem>
          </InstructionList>
        </InputField>
      </FormContent>
      <ButtonGroup>
        <CancelButton type="button" onClick={handleCancel}>
          취소
        </CancelButton>
        <SubmitButton type="button" disabled={!canSubmitReviewForm} onClick={handleSubmit}>
          등록
        </SubmitButton>
      </ButtonGroup>
    </form>
  );
}
