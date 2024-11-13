import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { isString, size } from 'lodash';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';

import { useLocalStorage } from '../../../../shared/hooks';
import ImageFilePicker from '../../../../shared/components/ImageFilePicker';
import MessageTextArea from '../../../../shared/components/Message/MessageTextArea';
import NextImage from '../../../../shared/components/NextImage';
import QuestionMark from '../../../../shared/icons/QuestionMark';
import { useCreateReviewImage, useWrittenReviewCount } from '../../hooks';
import ReviewInstructionModal from './ReviewInstructionModal';
import { defaultTextareaStyle } from '../pc/ReviewForm/styled-components';
import { productImageCSS, Sup } from '../shared/styled-components';
import {
  ContentsProductName,
  DealProductName,
  FormPlaceholder,
  Form,
  FormTitle,
  ImageRow,
  InstructionButton,
  ProductInfo,
  ProductName,
  FormTitleWrapper,
  SubmitButton,
} from './styled-components';
import ReviewGuide from '../shared/ReviewGuide';
import { MYPAGE_PATH, getPageUrl } from '../../../../shared/constant';
import ReviewGuideBanner from '../shared/ReviewWriteGuideBanner';
import useReviewProduct from '../../hooks/useReviewProduct';
import { CenterSpinner, LoadingSpinner, ReviewImageWrapper, SpinnerOverlay } from '../shared';
import {
  checkCanSelectImage,
  checkCanSubmitReviewForm,
  checkReviewFormChanged,
  triggerTextInputFocus,
} from '../../utils';
import { ALERT_MESSAGES, ALLOWED_FILE_EXTENSIONS, REVIEW_VISIBILITY_TYPES } from '../../constants';
import { ReviewInstructionList } from './ReviewInstruction';
import { PreviewImage, LAYOUT_TYPE } from '../shared/PreviewImage';
import { useRegisterReview } from '../../hooks/useRegisterReview';
import Alert from '../../../../shared/components/Alert/Alert';
import { redirectTo } from '../../../../shared/reducers/page';
import { ignoreError } from '../../../../shared/utils/general';
import { QueryKeys } from '../../queries';
import { ReviewGuidanceBanner } from '../shared/ReviewGuidanceBanner';

const Wrapper = styled.div`
  padding-bottom: 20px;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  orderNo: number;
  dealProductNo: number;
  contentsProductNo: number;
  setTouched: Dispatch<SetStateAction<boolean>>;
  onCancel(): void;
}

const LOCAL_STORAGE_KEY = 'HAS_CONFIRMED_REVIEW_INSTRUCTION';

export default function RegistrationForm({ orderNo, dealProductNo, contentsProductNo, setTouched, onCancel }: Props) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useLocalStorage<boolean>({ key: LOCAL_STORAGE_KEY, initialState: false });
  const { data: writtenReviewCountData } = useWrittenReviewCount();
  const { data: reviewProduct, isSuccess } = useReviewProduct(contentsProductNo, dealProductNo);
  const { images, handleChange, handleDismiss } = useCreateReviewImage({
    placeholderImageCount: 0,
    onRetryCancel: onCancel,
  });
  const { isLoading, registerReview } = useRegisterReview({
    orderNo,
    dealProductNo,
    registerData: {
      contents: text,
      uploadImages: images.map(({ remoteUrl }) => remoteUrl).filter(isString),
    },
    onSuccess: async () => {
      await Alert({ text: ALERT_MESSAGES.REVIEW_WRITE_SUCCESS, allowOutsideClick: false });

      ignoreError(async () => {
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.base(),
        });
      });

      dispatch(
        redirectTo({
          url: getPageUrl(MYPAGE_PATH.review),
          replace: true,
        }),
      );
    },
    onFailedByTextContent: () => {
      triggerTextInputFocus(textInputRef);
    },
    onOfflineRetryCancel: () => onCancel(),
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

  const handleDismissReviewGuide = () => {
    setHasConfirmed(true);
    setIsOpen(false);
  };

  const handleSubmit = () => registerReview();

  useEffect(() => {
    setTouched(text.length > 0);
  }, [text.length]);

  useEffect(() => {
    if (!hasConfirmed && !writtenReviewCountData?.count) {
      setIsOpen(true);
    }
  }, [hasConfirmed, writtenReviewCountData?.count]);

  return isSuccess && !!reviewProduct ? (
    <Wrapper>
      <ReviewGuideBanner dealProductNo={dealProductNo} />
      <ProductInfo>
        {reviewProduct.productImageUrl ? (
          <NextImage
            src={reviewProduct.productImageUrl}
            alt={reviewProduct.dealProductName}
            width={50}
            height={50}
            css={productImageCSS}
          />
        ) : null}
        <ProductName>
          <DealProductName>{reviewProduct.dealProductName}</DealProductName>
          {reviewProduct.dealProductName !== reviewProduct.contentsProductName && (
            <ContentsProductName>{reviewProduct.contentsProductName}</ContentsProductName>
          )}
        </ProductName>
      </ProductInfo>
      <ReviewGuide />
      <ReviewGuidanceBanner />
      <Form>
        <FormTitleWrapper>
          <FormTitle>
            자세한 후기를 들려주세요<Sup>*</Sup>
          </FormTitle>
          <InstructionButton type="button" onClick={() => setIsOpen(true)}>
            작성 시 유의사항 <QuestionMark />
          </InstructionButton>
        </FormTitleWrapper>
        <MessageTextArea
          theme={{ ...defaultTextareaStyle, height: 144 }}
          id="contents"
          name="contents"
          value={text}
          onChange={(value) => setText(value)}
          maxLength={5000}
          css={{ width: '100%' }}
          ref={textInputRef}
        >
          <FormPlaceholder>
            상품 특성에 맞는 후기를 작성해주세요. 예) 레시피, 겉포장 속 실제 구성품 사진, 플레이팅, 화장품 사용자의
            피부타입 등 (최소 10자이상)
          </FormPlaceholder>
        </MessageTextArea>
      </Form>
      <ImageRow>
        {images.map(({ id, url, status }, index) => (
          <ReviewImageWrapper key={`${id}-${index}`} isError={status === 'ERROR'}>
            <PreviewImage layoutType={LAYOUT_TYPE.PERCENTAGE} src={url} onDismiss={() => handleDismiss(id)} />
            <AnimatePresence>
              {status === 'PENDING' ? (
                <SpinnerOverlay>
                  <CenterSpinner>
                    <LoadingSpinner />
                  </CenterSpinner>
                </SpinnerOverlay>
              ) : null}
            </AnimatePresence>
          </ReviewImageWrapper>
        ))}
        {canSelectImage && (
          <ImageFilePicker
            allowedFileExtensions={ALLOWED_FILE_EXTENSIONS}
            imagePickerStyle={css`
              width: 100%;
              padding-bottom: 100%;
            `}
            onChange={handleChange}
          />
        )}
      </ImageRow>
      <ReviewInstructionList />
      <SubmitButtonWrapper>
        <SubmitButton onClick={handleSubmit} disabled={!canSubmitReviewForm}>
          등록하기
        </SubmitButton>
      </SubmitButtonWrapper>
      <ReviewInstructionModal isOpen={isOpen} onDismiss={handleDismissReviewGuide} />
    </Wrapper>
  ) : null;
}
