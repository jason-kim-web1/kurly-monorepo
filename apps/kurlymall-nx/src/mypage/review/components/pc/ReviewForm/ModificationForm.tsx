import { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { sum, eq, isEmpty, isString, size } from 'lodash';
import { useQueryClient } from '@tanstack/react-query';

import Alert from '../../../../../shared/components/Alert/Alert';
import ImageFilePicker from '../../../../../shared/components/ImageFilePicker';
import { CheckBoxActive, CheckBoxInactive } from '../../../../../shared/icons';
import { exclamationmark14x14Cf03f40 } from '../../../../../shared/images';
import COLOR from '../../../../../shared/constant/colorset';
import { useCreateReviewImage } from '../../../hooks';
import { CenterSpinner, LoadingSpinner, ReviewImageWrapper, SpinnerOverlay } from '../../shared';
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
import type { ReviewImage } from '../../../hooks/useCreateReviewImage';
import { checkImageError, checkImagePending } from '../../../hooks/useCreateReviewImage';
import {
  ALERT_MESSAGES,
  ALLOWED_FILE_EXTENSIONS,
  PREV_UPLOAD_IMAGE_STATUS,
  REVIEW_VISIBILITY_TYPES,
} from '../../../constants';
import type { MutableReviewFormData, ReviewVisibilityType } from '../../../types';
import {
  checkCanSelectImage,
  checkCanSubmitReviewForm,
  checkReviewFormChanged,
  filterByStatus,
  parsePrevUploadedImages,
  triggerTextInputFocus,
} from '../../../utils';
import { PrevUploadImage, ReviewImageData } from '../../../types';
import { PreviewImage, LAYOUT_TYPE } from '../../shared/PreviewImage';
import { useModifyReview } from '../../../hooks/useModifyReview';
import { ignoreError } from '../../../../../shared/utils/general';
import { Sup } from '../../shared/styled-components';
import { ReviewGuidanceBanner } from '../../shared/ReviewGuidanceBanner';

const CheckboxBackground = styled.div<{ isBlocked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ isBlocked }) => (isBlocked ? COLOR.btnGray : COLOR.kurlyWhite)};
`;

const ImageRow = styled.div`
  display: flex;
  flex-basis: 100%;
  gap: 9px;
`;

const ToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 2px;
`;

const VisibilityBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
`;

const VisibilityBlockNotice = styled.div`
  width: 640px;
  height: 70px;
  padding: 15px 0 0 16px;
  border-radius: 6px;
  background-color: ${COLOR.kurlyGray100};
  font-size: 14px;
  color: ${COLOR.kurlyGray450};
  line-height: 20px;
`;

const ExclamationMark = styled.strong`
  display: block;
  font-weight: 400;
  color: ${COLOR.invalidRed};

  :before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 5px;
    background: url(${exclamationmark14x14Cf03f40}) no-repeat 50% 50%;
    vertical-align: -2px;
  }
`;

const hasRemoteUrl = (image: ReviewImage): image is ReviewImage & { remoteUrl: string } =>
  isString(image.remoteUrl) && !isEmpty(image.remoteUrl);

interface Props {
  contentsProductNo?: number;
  reviewNo: number;
  contents: string;
  images: ReviewImageData[];
  visibility: ReviewVisibilityType;
  onDismiss: () => void;
  onChangeForm?: (value: boolean) => void;
}

export default function ModificationForm({
  contentsProductNo,
  reviewNo,
  contents: initialContents,
  images: initialImages,
  visibility: initialVisibility,
  onDismiss,
  onChangeForm,
}: Props) {
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const [text, setText] = useState(initialContents);
  const [visibility, setVisibility] = useState<ReviewVisibilityType>(initialVisibility);
  const [prevUploadedImageList, setPrevUploadedImageList] = useState<PrevUploadImage[]>(
    parsePrevUploadedImages(initialImages),
  );
  const activePrevImageList = filterByStatus(prevUploadedImageList, PREV_UPLOAD_IMAGE_STATUS.SUCCESS);
  const deletedPrevImageList = filterByStatus(prevUploadedImageList, PREV_UPLOAD_IMAGE_STATUS.DELETE);
  const originalFormDataRef = useRef<MutableReviewFormData>({
    contents: initialContents,
    prevImages: prevUploadedImageList,
    newImages: [],
    visibility: initialVisibility,
  });
  const activePrevImageListCount = size(activePrevImageList);
  const isPrevPhotoReview = !isEmpty(originalFormDataRef.current.prevImages);
  const {
    images: newImages,
    handleChange,
    handleDismiss,
  } = useCreateReviewImage({
    placeholderImageCount: activePrevImageListCount,
    onRetryCancel: onDismiss,
  });
  const isBlockedReview = eq(initialVisibility, REVIEW_VISIBILITY_TYPES.BLOCK);
  const isReviewVisibilityPrivate = eq(visibility, REVIEW_VISIBILITY_TYPES.PRIVATE);
  const imageCount = sum([size(activePrevImageList), size(newImages)]);
  const canSelectImage = checkCanSelectImage(imageCount);
  const isReviewFormChanged = checkReviewFormChanged(originalFormDataRef.current, {
    contents: text,
    prevImages: prevUploadedImageList,
    newImages,
    visibility: visibility,
  });
  const { modifyReview, isLoading } = useModifyReview({
    modifyData: {
      reviewId: reviewNo,
      contents: text,
      visibility,
      uploadImages: newImages.filter(hasRemoteUrl).map(({ remoteUrl }) => remoteUrl),
      deleteImages: deletedPrevImageList.map(({ imageId }) => imageId),
    },
    onSuccess: () => {
      ignoreError(async () => {
        await queryClient.refetchQueries(['product', contentsProductNo, 'review', reviewNo], { exact: false });
      });
      onDismiss();
    },
    onFailedByTextContent: () => {
      triggerTextInputFocus(textInputRef);
    },
    onOfflineRetryCancel: () => onDismiss(),
  });
  const canSubmitReviewForm = checkCanSubmitReviewForm({
    isSaving: isLoading,
    isFormChanged: isReviewFormChanged,
    contents: text,
    prevImages: prevUploadedImageList,
    newImages,
    visibility,
  });

  const handleRemovePreviousUploadedImage = (targetImageId: number) => () => {
    setPrevUploadedImageList((prev) =>
      prev.map((image) => {
        const { imageId } = image;
        const isTargetImage = eq(imageId, targetImageId);
        if (isTargetImage) {
          return {
            ...image,
            status: PREV_UPLOAD_IMAGE_STATUS.DELETE,
          };
        }
        return image;
      }),
    );
  };

  const handleToggleReviewVisibility = async () => {
    if (isBlockedReview) {
      return;
    }
    await Alert({
      text: isReviewVisibilityPrivate
        ? ALERT_MESSAGES.REVIEW_VISIBILITY_PUBLIC
        : ALERT_MESSAGES.REVIEW_VISIBILITY_PRIVATE,
    });
    setVisibility(isReviewVisibilityPrivate ? REVIEW_VISIBILITY_TYPES.PUBLIC : REVIEW_VISIBILITY_TYPES.PRIVATE);
  };

  const handleCancel = async () => {
    if (!isReviewFormChanged) {
      onDismiss();
      return;
    }
    const { isDismissed } = await Alert({
      text: ALERT_MESSAGES.CONFIRM_LEAVE_MODIFICATION_FORM,
      showCancelButton: true,
    });
    if (isDismissed) {
      return;
    }
    onDismiss();
  };

  const handleSubmit = () => modifyReview();

  const handleClickSubmit = async () => {
    if (!isReviewFormChanged) {
      onDismiss();
      return;
    }
    if (isPrevPhotoReview && eq(imageCount, 0)) {
      await Alert({
        text: ALERT_MESSAGES.PHOTO_REVIEW_FORM_REQUIRE_MIN_IMAGE,
      });
      return;
    }
    const { isDismissed } = await Alert({
      text: ALERT_MESSAGES.CONFIRM_REVIEW_CHANGE,
      showCancelButton: true,
    });
    if (isDismissed) {
      return;
    }
    handleSubmit();
  };

  useEffect(() => {
    if (onChangeForm) {
      onChangeForm(isReviewFormChanged);
    }
  }, [isReviewFormChanged, onChangeForm]);

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
              <UploadCount isCount={imageCount > 0}>{imageCount}장</UploadCount>
              /최대 8장
            </ImageCounter>
          </Label>
          <ImageRow>
            {activePrevImageList.map((image, index) => {
              const { imageId, url, reviewSquareSmallUrl } = image;
              return (
                <PreviewImage
                  key={`${imageId}-${index}`}
                  layoutType={LAYOUT_TYPE.FIXED}
                  src={reviewSquareSmallUrl || url}
                  onDismiss={handleRemovePreviousUploadedImage(imageId)}
                />
              );
            })}
            {newImages.map(({ id, url, status }, index) => (
              <ReviewImageWrapper key={`${id}-${index}`} isError={checkImageError(status)}>
                <PreviewImage layoutType={LAYOUT_TYPE.FIXED} src={url} onDismiss={() => handleDismiss(id)} />
                <AnimatePresence>
                  {checkImagePending(status) ? (
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
                onChange={handleChange}
                allowedFileExtensions={ALLOWED_FILE_EXTENSIONS}
                imagePickerStyle={css`
                  width: 72px;
                  padding-bottom: 72px;
                `}
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
            <InstructionItem>
              사진후기로 등록한 후기의 경우, 최소 1장의 사진을 등록 후 수정이 가능합니다.
            </InstructionItem>
          </InstructionList>
        </InputField>
        <InputField>
          <Label></Label>
          <ToggleButton type="button" disabled={isBlockedReview} onClick={handleToggleReviewVisibility}>
            {eq(visibility, REVIEW_VISIBILITY_TYPES.BLOCK) && (
              <CheckboxBackground isBlocked>
                <CheckBoxInactive width={24} height={24} />
              </CheckboxBackground>
            )}
            {eq(visibility, REVIEW_VISIBILITY_TYPES.PRIVATE) && <CheckBoxActive width={24} height={24} />}
            {eq(visibility, REVIEW_VISIBILITY_TYPES.PUBLIC) && <CheckBoxInactive width={24} height={24} />}
            <span>후기 비공개하기</span>
          </ToggleButton>
        </InputField>
        {isBlockedReview && (
          <VisibilityBlock>
            <VisibilityBlockNotice>
              <ExclamationMark>관리자가 비공개한 후기입니다.</ExclamationMark>
              공개를 원하시면 고객센터로 문의해주세요.
            </VisibilityBlockNotice>
          </VisibilityBlock>
        )}
      </FormContent>
      <ButtonGroup>
        <CancelButton type="button" onClick={handleCancel}>
          취소
        </CancelButton>
        <SubmitButton type="button" disabled={!canSubmitReviewForm} onClick={handleClickSubmit}>
          수정
        </SubmitButton>
      </ButtonGroup>
    </form>
  );
}
