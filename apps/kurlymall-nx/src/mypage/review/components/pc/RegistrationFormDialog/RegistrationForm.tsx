import styled from '@emotion/styled';
import { eq, isFunction, isString, size } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';

import { useCreateReview, useCreateReviewImage } from '../../../hooks';
import { onSuccessUpdateReview } from '../../../ProductReview.service';

import Alert from '../../../../../shared/components/Alert/Alert';
import { getErrorMessage } from '../../../../../shared/utils/getErrorMessage';
import { checkCanSelectImage, checkCanSubmitReviewForm, checkReviewFormChanged } from '../../../utils';
import {
  ALERT_MESSAGES,
  ALLOWED_FILE_EXTENSIONS,
  REVIEW_PASS_STATUS,
  REVIEW_VISIBILITY_TYPES,
} from '../../../constants';
import { getOnline } from '../../../../../shared/utils/getOnline';
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
} from '../ReviewForm/styled-components';
import TextInput from '../ReviewForm/TextInput';
import { CenterSpinner, LoadingSpinner, ReviewImageWrapper, SpinnerOverlay } from '../../shared';
import ImageFilePicker from '../../../../../shared/components/ImageFilePicker';
import { PreviewImage, LAYOUT_TYPE } from '../../shared/PreviewImage';
import { Sup } from '../../shared/styled-components';

const ImageRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  width: 100%;
`;

interface Props {
  orderNo: number;
  dealProductNo: number;
  onClose(): void;
  onCheckFormChangeAndClose(): void;
  onFormChange(isChanged: boolean): void;
  onSuccess?(): void;
}

export const RegistrationForm = ({
  orderNo,
  dealProductNo,
  onFormChange,
  onClose,
  onCheckFormChangeAndClose,
  onSuccess,
}: Props) => {
  const prevIsReviewFormChangedRef = useRef(false);
  const [text, setText] = useState('');
  const { images, handleChange, handleDismiss } = useCreateReviewImage({
    placeholderImageCount: 0,
    onRetryCancel: onClose,
  });
  const { mutateAsync: createReview, isLoading } = useCreateReview(orderNo, dealProductNo, {
    onSuccess: async () => {
      await onSuccessUpdateReview();
      onClose();
      if (isFunction(onSuccess)) {
        onSuccess();
      }
    },
    onError: async (error) => {
      await Alert({ text: getErrorMessage(error) });
    },
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

  const handleCancel = () => onCheckFormChangeAndClose();

  const handleSubmit = async () => {
    if (!getOnline()) {
      const { isConfirmed } = await Alert({
        text: ALERT_MESSAGES.CONFIRM_RETRY_REGISTRATION,
        showCancelButton: true,
        confirmButtonText: '재시도',
      });
      if (!isConfirmed) {
        onClose();
        return;
      }
      handleSubmit();
      return;
    }
    await createReview({
      contents: text,
      uploadImages: images.map(({ remoteUrl }) => remoteUrl).filter(isString),
      passStatus: REVIEW_PASS_STATUS.ALL,
    });
  };

  useEffect(() => {
    if (eq(prevIsReviewFormChangedRef.current, isReviewFormChanged)) {
      return;
    }
    onFormChange(isReviewFormChanged);
    prevIsReviewFormChangedRef.current = isReviewFormChanged;
  }, [isReviewFormChanged]);

  return (
    <form>
      <FormContent>
        <InputField>
          <Label required>
            내용<Sup>*</Sup>
          </Label>
          <TextInput value={text} onChange={(value) => setText(value)} />
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
                  layoutType={LAYOUT_TYPE.FIXED}
                  src={image.url}
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
                allowedFileExtensions={ALLOWED_FILE_EXTENSIONS}
                imagePickerStyle={css`
                  width: 72px;
                  height: 72px;
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
};
