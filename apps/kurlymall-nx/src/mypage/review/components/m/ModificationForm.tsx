import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { eq, isEmpty, isString, isUndefined, size, sum } from 'lodash';
import { useDispatch } from 'react-redux';

import Alert from '../../../../shared/components/Alert/Alert';
import MessageTextArea from '../../../../shared/components/Message/MessageTextArea';
import { CheckBoxActive, CheckBoxInactive, QuestionMark } from '../../../../shared/icons';
import { multiMaxLineText } from '../../../../shared/utils';
import { exclamationmark14x14Cf03f40 } from '../../../../shared/images';
import COLOR from '../../../../shared/constant/colorset';

import { useCreateReviewImage } from '../../hooks';
import useReview from '../../../../product/board/review/hooks/useReview';
import { defaultTextareaStyle } from '../pc/ReviewForm/styled-components';
import ReviewInstructionModal from './ReviewInstructionModal';
import { CenterSpinner, LoadingSpinner, ReviewImageWrapper, SpinnerOverlay } from '../shared';
import { productImageCSS, Sup } from '../shared/styled-components';
import {
  DealProductName,
  FormPlaceholder,
  Form,
  FormTitle,
  ImageRow,
  InstructionButton,
  ProductInfo,
  ProductName,
  FormTitleWrapper,
} from './styled-components';
import NextImage from '../../../../shared/components/NextImage';
import Button from '../../../../shared/components/Button/Button';
import ImageFilePicker from '../../../../shared/components/ImageFilePicker';
import { checkImageError, checkImagePending, ReviewImage } from '../../hooks/useCreateReviewImage';
import {
  checkCanSelectImage,
  checkCanSubmitReviewForm,
  checkReviewFormChanged,
  filterByStatus,
  parsePrevUploadedImages,
  triggerTextInputFocus,
} from '../../utils';
import type { ReviewVisibilityType } from '../../types';
import {
  ALERT_MESSAGES,
  ALLOWED_FILE_EXTENSIONS,
  PREV_UPLOAD_IMAGE_STATUS,
  REVIEW_VISIBILITY_TYPES,
} from '../../constants';
import { MutableReviewFormData, PrevUploadImage } from '../../types';
import ReviewGuide from '../shared/ReviewGuide';
import { ReviewInstructionList } from './ReviewInstruction';
import { PreviewImage, LAYOUT_TYPE } from '../shared/PreviewImage';
import { useModifyReview } from '../../hooks/useModifyReview';
import { redirectTo } from '../../../../shared/reducers/page';
import { MYPAGE_PATH } from '../../../../shared/constant';
import { ReviewGuidanceBanner } from '../shared/ReviewGuidanceBanner';

const Wrapper = styled.div`
  padding-bottom: 20px;
`;

const CheckboxBackground = styled.div<{ isBlocked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ isBlocked }) => (isBlocked ? COLOR.btnGray : COLOR.kurlyWhite)};
`;

const ContentsProductName = styled.h3`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
  ${multiMaxLineText(1)}
`;

const SubmitButton = styled(Button)`
  width: 93.6%;
  border-radius: 6px;
  margin: 30px auto 0;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
`;

const VisibilityBlock = styled.div`
  margin: 10px 20px;
  padding: 15px 16px 16px;
  border-radius: 6px;
  background-color: ${COLOR.kurlyGray100};
  font-size: 13px;
  color: ${COLOR.kurlyGray450};
  line-height: 19px;
`;

const ExclamationMark = styled.strong`
  display: block;
  font-weight: 600;
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

interface Props {
  contentsProductNo: number;
  reviewNo: number;
  touched: boolean;
  setTouched: Dispatch<SetStateAction<boolean>>;
  onCancel(): void;
}

const hasRemoteUrl = (image: ReviewImage): image is ReviewImage & { remoteUrl: string } =>
  isString(image.remoteUrl) && !isEmpty(image.remoteUrl);

export default function ModificationForm({ contentsProductNo, reviewNo, setTouched, onCancel }: Props) {
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('');
  const [prevUploadedImageList, setPrevUploadedImageList] = useState<PrevUploadImage[]>([]);
  const activePrevImageList = filterByStatus(prevUploadedImageList, PREV_UPLOAD_IMAGE_STATUS.SUCCESS);
  const deletedPrevImageList = filterByStatus(prevUploadedImageList, PREV_UPLOAD_IMAGE_STATUS.DELETE);
  const activePrevImageListCount = size(activePrevImageList);
  const [visibility, setVisibility] = useState<ReviewVisibilityType>(REVIEW_VISIBILITY_TYPES.PUBLIC);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isSuccess, isError } = useReview(contentsProductNo, reviewNo, {
    enabled: !!contentsProductNo && !!reviewNo,
    refetchOnMount: 'always',
  });
  const originalFormDataRef = useRef<MutableReviewFormData>({
    contents: '',
    prevImages: [],
    newImages: [],
    visibility: REVIEW_VISIBILITY_TYPES.PUBLIC,
  });
  const isPrevPhotoReviewRef = useRef(false);
  const {
    images: newImages,
    handleChange,
    handleDismiss,
  } = useCreateReviewImage({
    placeholderImageCount: activePrevImageListCount,
    onRetryCancel: onCancel,
  });
  const imageCount = sum([size(activePrevImageList), size(newImages)]);
  const canSelectImage = checkCanSelectImage(imageCount);
  const isReviewFormChanged = checkReviewFormChanged(originalFormDataRef.current, {
    contents: text,
    prevImages: prevUploadedImageList,
    newImages,
    visibility,
  });
  const { isLoading: isSavingReview, modifyReview } = useModifyReview({
    modifyData: {
      reviewId: reviewNo,
      contents: text,
      visibility,
      uploadImages: newImages.filter(hasRemoteUrl).map(({ remoteUrl }) => remoteUrl),
      deleteImages: deletedPrevImageList.map(({ imageId }) => imageId),
    },
    onSuccess: () => {
      dispatch(
        redirectTo({
          url: MYPAGE_PATH.review.uri,
          query: {
            tabIndex: 1,
          },
          replace: true,
        }),
      );
    },
    onFailedByTextContent: () => {
      triggerTextInputFocus(textInputRef);
    },
    onOfflineRetryCancel: () => onCancel(),
  });
  const canSubmitReviewForm = checkCanSubmitReviewForm({
    isSaving: isSavingReview,
    isFormChanged: isReviewFormChanged,
    contents: text,
    prevImages: prevUploadedImageList,
    newImages,
    visibility,
  });
  const isBlockedReview = eq(data?.visibility, REVIEW_VISIBILITY_TYPES.BLOCK);
  const isReviewVisibilityPrivate = eq(visibility, REVIEW_VISIBILITY_TYPES.PRIVATE);

  const handleToggleVisibility = async () => {
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

  const handleReviewLoadError = async () => {
    await Alert({ text: ALERT_MESSAGES.REVIEW_LOAD_ERROR });
    router.back();
  };

  const handleSubmit = () => modifyReview();

  const handleClickSubmit = async () => {
    if (isUndefined(reviewNo)) {
      return;
    }
    if (isPrevPhotoReviewRef.current && eq(imageCount, 0)) {
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

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    if (isUndefined(data)) {
      handleReviewLoadError();
      return;
    }
    const { contents, visibility: initialVisibility, images } = data;
    const prevImages = parsePrevUploadedImages(
      images.map(({ id, url, reviewSquareSmallUrl }) => ({
        imageId: id,
        url,
        reviewSquareSmallUrl,
      })),
    );
    setText(contents);
    setVisibility(initialVisibility as ReviewVisibilityType);
    setPrevUploadedImageList(prevImages);
    originalFormDataRef.current = {
      contents,
      visibility: initialVisibility as ReviewVisibilityType,
      prevImages,
      newImages: [],
    };
    isPrevPhotoReviewRef.current = !isEmpty(prevImages);
  }, [data, isSuccess]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    handleReviewLoadError();
  }, [isError]);

  useEffect(() => {
    if (isUndefined(data) || text.length === 0) {
      return;
    }
    setTouched(isReviewFormChanged);
  }, [data, isReviewFormChanged, setTouched, text, visibility]);

  return isSuccess && !!data ? (
    <Wrapper>
      <ProductInfo>
        {data.productImageUrl && (
          <NextImage
            src={data.productImageUrl}
            alt={data.dealProductName}
            width={50}
            height={50}
            css={productImageCSS}
          />
        )}
        <ProductName>
          <DealProductName>{data.dealProductName}</DealProductName>
          {data.dealProductName !== data.contentsProductName && (
            <ContentsProductName>{data.contentsProductName}</ContentsProductName>
          )}
        </ProductName>
      </ProductInfo>
      <ReviewGuide />
      <ReviewGuidanceBanner />
      <Form>
        <FormTitleWrapper>
          <FormTitle>
            자세한 후기를 들려주세요
            <Sup>*</Sup>
          </FormTitle>
          <InstructionButton type="button" onClick={() => setIsOpen(true)}>
            작성 시 유의사항 <QuestionMark />
          </InstructionButton>
        </FormTitleWrapper>
        <MessageTextArea
          ref={textInputRef}
          theme={{ ...defaultTextareaStyle, height: 144 }}
          id="contents"
          name="contents"
          value={text}
          onChange={(value) => setText(value)}
          maxLength={5000}
          css={{ width: '100%' }}
        >
          <FormPlaceholder>
            상품 특성에 맞는 후기를 작성해주세요. 예) 레시피, 겉포장 속 실제 구성품 사진, 플레이팅, 화장품 사용자의
            피부타입 등 (최소 10자이상)
          </FormPlaceholder>
        </MessageTextArea>
      </Form>
      <ImageRow>
        {activePrevImageList.map(({ imageId, url, reviewSquareSmallUrl }, index) => (
          <PreviewImage
            key={`${imageId}-${index}`}
            layoutType={LAYOUT_TYPE.PERCENTAGE}
            src={reviewSquareSmallUrl || url}
            onDismiss={handleRemovePreviousUploadedImage(imageId)}
          />
        ))}
        {newImages.map(({ id, url, status }, index) => (
          <ReviewImageWrapper key={`${id}-${index}`} isError={checkImageError(status)}>
            <PreviewImage layoutType={LAYOUT_TYPE.PERCENTAGE} src={url} onDismiss={() => handleDismiss(id)} />
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
            allowedFileExtensions={ALLOWED_FILE_EXTENSIONS}
            onChange={handleChange}
            imagePickerStyle={css`
              width: 100%;
              padding-bottom: 100%;
            `}
          />
        ) : null}
      </ImageRow>
      <ReviewInstructionList isModification />
      <ToggleButton disabled={isBlockedReview} onClick={handleToggleVisibility}>
        {isBlockedReview && (
          <CheckboxBackground isBlocked>
            <CheckBoxInactive width={24} height={24} />
          </CheckboxBackground>
        )}
        {eq(visibility, REVIEW_VISIBILITY_TYPES.PRIVATE) && <CheckBoxActive width={24} height={24} />}
        {eq(visibility, REVIEW_VISIBILITY_TYPES.PUBLIC) && <CheckBoxInactive width={24} height={24} />}
        <span> 후기 비공개하기</span>
      </ToggleButton>
      {isBlockedReview && (
        <VisibilityBlock>
          <ExclamationMark>관리자가 비공개한 후기입니다.</ExclamationMark>
          공개를 원하시면 고객센터로 문의해주세요.
        </VisibilityBlock>
      )}
      <SubmitButton type="button" disabled={!canSubmitReviewForm} onClick={handleClickSubmit} text="수정하기" />
      <ReviewInstructionModal isOpen={isOpen} onDismiss={() => setIsOpen(false)} />
    </Wrapper>
  ) : null;
}
