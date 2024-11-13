import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { chain, concat, eq, find, isEmpty, isUndefined, values } from 'lodash';

import Alert from '../../../shared/components/Alert/Alert';
import { evalValidation, Image } from '../../../shared/utils/image-validator';
import { postReviewImage } from '../../../shared/api/product/review';
import { ALERT_MESSAGES, ALLOWED_FILE_EXTENSIONS } from '../constants';
import { getOnline } from '../../../shared/utils/getOnline';

const MAX_FILE_COUNT = 8;
const MAX_FILE_SIZE = 30;

export const IMAGE_FETCH_STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
} as const;

type ImageFetchStatus = keyof typeof IMAGE_FETCH_STATUS;

export type ReviewImage = Image & {
  status: ImageFetchStatus;
  remoteUrl?: string;
};

const createImageFormData = (file: File) => {
  const formData = new FormData();
  formData.append('images', file);
  return formData;
};

const checkStatus = (state: ImageFetchStatus) => (targetState: ImageFetchStatus) => eq(state, targetState);
export const checkImagePending = checkStatus(IMAGE_FETCH_STATUS.PENDING);
export const checkImageError = checkStatus(IMAGE_FETCH_STATUS.ERROR);
export const checkImageSuccess = checkStatus(IMAGE_FETCH_STATUS.SUCCESS);

interface Props {
  placeholderImageCount?: number;
  onRetryCancel(): void;
}

export default function useCreateReviewImage({ placeholderImageCount = 0, onRetryCancel }: Props) {
  const [images, setImages] = useState<ReviewImage[]>([]);
  const hasShownErrorMessage = useRef(false);

  const uploadImage = useCallback(async (image: ReviewImage & { file: File }) => {
    const result = await postReviewImage(createImageFormData(image.file));

    if (result.status === 'ERROR') {
      if (!hasShownErrorMessage.current) {
        Alert({ text: result.errorMessage });
        hasShownErrorMessage.current = true;
      }
      setImages((previousImages) =>
        previousImages.map((previousImage) =>
          previousImage.id === image.id ? { ...previousImage, status: 'ERROR' } : previousImage,
        ),
      );
    }

    if (result.status === 'SUCCESS') {
      const { remoteUrl } = result;
      setImages((previousImages) => {
        const targetImage = find(previousImages, { id: image.id });
        if (isUndefined(targetImage)) {
          return previousImages;
        }
        return previousImages.map((previousImage) =>
          previousImage.id === targetImage.id && !!remoteUrl
            ? {
                ...previousImage,
                status: IMAGE_FETCH_STATUS.SUCCESS,
                remoteUrl,
              }
            : previousImage,
        );
      });
    }
  }, []);

  const handleChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      hasShownErrorMessage.current = false;

      if (!getOnline()) {
        const { isDismissed } = await Alert({
          text: ALERT_MESSAGES.CONFIRM_RETRY_REGISTRATION,
          showCancelButton: true,
          confirmButtonText: '재시도',
        });
        if (isDismissed) {
          onRetryCancel();
          return;
        }
        handleChange(event);
        return;
      }

      const files = values(event.target.files);
      const newImages = chain(files)
        .map((file) => ({
          id: `${file.name}-${file.size}-${file.lastModified}`,
          file,
          status: IMAGE_FETCH_STATUS.PENDING,
        }))
        .filter(({ id }) => {
          return !images.some(({ id: targetId }) => targetId === id);
        })
        .map((image) => {
          const { file } = image;
          return {
            ...image,
            url: URL.createObjectURL(file),
          };
        })
        .value();

      if (isEmpty(newImages)) {
        event.target.value = '';
        return;
      }

      const { isValid, message } = evalValidation(newImages, {
        maxFileCount: MAX_FILE_COUNT,
        maxFileSize: MAX_FILE_SIZE,
        allowFileDuplication: false,
        allowFileExtensions: ALLOWED_FILE_EXTENSIONS,
        selectedImages: images,
        placeholderImageCount,
      });

      if (!isValid) {
        await Alert({ text: message });
        event.target.value = '';
        return;
      }

      setImages((currentImages) => concat(currentImages, newImages));

      newImages.forEach(uploadImage);
      event.target.value = '';
    },
    [images, uploadImage, placeholderImageCount],
  );

  const handleDismiss = useCallback(
    (id: string | number) => setImages((prevImages) => prevImages.filter((image) => image.id !== id)),
    [],
  );

  const clearImages = useCallback(() => {
    if (isEmpty(images)) {
      return;
    }
    setImages([]);
  }, [images]);

  return {
    images,
    setImages,
    handleChange,
    handleDismiss,
    clearImages,
  };
}
