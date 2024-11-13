import { ChangeEvent, useCallback, useState, useEffect } from 'react';
import { isEmpty, isFunction, values, size, sum, chain, last, isUndefined } from 'lodash';

export type ValidateOptions = {
  maxFileCount: number;
  maxFileSize: number;
  allowFileDuplication: boolean;
  allowFileExtensions?: string[];
  selectedImages: Image[];
  placeholderImageCount?: number;
};

export type ValidateResult = {
  isValid: boolean;
  type?: ImageFileRule;
  message?: string;
};

export type ValidationError = Omit<ValidateResult, 'isValid'>;

export type RuleValidator = (files: File[], options: ValidateOptions) => ValidateResult;

export type ImageFileRule = 'MAX_FILE_COUNT' | 'MAX_FILE_SIZE' | 'FILE_DUPLICATION' | 'FILE_EXTENSION';
export const IMAGE_FILE_RULE_VALIDATION_ORDER = [
  'MAX_FILE_COUNT',
  'MAX_FILE_SIZE',
  'FILE_DUPLICATION',
  'FILE_EXTENSION',
] as const;

const ONE_MEGA_BYTE = 1000000;

export const IMAGE_FILE_RULES: Record<ImageFileRule, RuleValidator> = {
  MAX_FILE_COUNT(files, options) {
    const { selectedImages, placeholderImageCount = 0 } = options;
    const fileCount = size(files);
    const currentImageCount = size(selectedImages);
    const nextImageSize = sum([fileCount, placeholderImageCount, currentImageCount]);
    if (nextImageSize <= options.maxFileCount) {
      return { isValid: true };
    }
    return {
      isValid: false,
      type: 'MAX_FILE_COUNT',
      message: `사진 첨부는 최대 ${options.maxFileCount}장까지만 가능합니다.`,
    };
  },
  MAX_FILE_SIZE(files, options) {
    const maxFileSizeInMB = ONE_MEGA_BYTE * options.maxFileSize;
    if (files.every((file) => file.size <= maxFileSizeInMB)) {
      return { isValid: true };
    }
    return {
      isValid: false,
      type: 'MAX_FILE_SIZE',
      message: `사진 용량 제한 (${options.maxFileSize}MB 이하) 를 확인해주세요.`,
    };
  },
  FILE_DUPLICATION(files, options) {
    const imageIds = files.map((file) => `${file.name}-${file.size}-${file.lastModified}`);
    const isDuplicated = options.selectedImages.some(({ id }) => imageIds.includes(id as string));
    if (options.allowFileDuplication || !isDuplicated) {
      return { isValid: true };
    }
    return { isValid: false, type: 'FILE_DUPLICATION', message: '이미 선택된 사진이 포함되어 있습니다.' };
  },
  FILE_EXTENSION(files, { allowFileExtensions }) {
    if (isUndefined(allowFileExtensions)) {
      return { isValid: true };
    }

    const lowerCasedExtensions = allowFileExtensions.map((extension) => extension.toLowerCase());
    const filesWithInvalidExtension = chain(files)
      .map((file) => last(file.type.split('/')))
      .filter((extension) => !isUndefined(extension) && lowerCasedExtensions.includes(extension.toLowerCase()))
      .value();

    if (filesWithInvalidExtension.length > 0) {
      return { isValid: true };
    }

    return {
      isValid: false,
      type: 'FILE_EXTENSION',
      message: `확장자명(${allowFileExtensions.join(', ')})을 확인해주세요.`,
    };
  },
};

export const evalValidation: RuleValidator = (files, options) => {
  for (const ruleName of IMAGE_FILE_RULE_VALIDATION_ORDER) {
    const ruleValidationFn = IMAGE_FILE_RULES[ruleName];
    const result = ruleValidationFn(files, options);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
};

export type Image = {
  id: string | number;
  url: string;
  file?: File;
};

interface UseImageFileUploaderParams {
  initialImages?: Image[];
  maxFileSize: number;
  maxFileCount?: number;
  allowFileDuplication?: boolean;
  allowFileExtensions?: string[];
  onUploadImage?: (images: Image[]) => void;
  onUploadError?: (error: ValidationError) => void;
}

export default function useImageFileUploader({
  initialImages = [],
  maxFileSize,
  maxFileCount = Infinity,
  allowFileExtensions,
  allowFileDuplication = false,
  onUploadImage,
  onUploadError,
}: UseImageFileUploaderParams) {
  const [images, setImages] = useState<Image[]>(initialImages);
  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [images]);
  const uploadImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = values(event.target.files);
      const options: ValidateOptions = {
        maxFileCount,
        maxFileSize,
        allowFileDuplication,
        allowFileExtensions,
        selectedImages: images,
      };

      if (isEmpty(files)) {
        return;
      }
      const { isValid, type, message } = evalValidation(files, options);
      if (!isValid) {
        if (isFunction(onUploadError)) {
          onUploadError({ type, message });
        }
        return;
      }
      const targetImages = files.map((file) => {
        const url = URL.createObjectURL(file);
        return {
          id: `${file.name}-${file.size}-${file.lastModified}`,
          url,
          file,
        };
      });
      if (isFunction(onUploadImage)) {
        onUploadImage(targetImages);
      }
      setImages((prevImages) => [...prevImages, ...targetImages]);
    },
    [maxFileCount, maxFileSize, allowFileDuplication, allowFileExtensions, images, onUploadImage, onUploadError],
  );

  const dismissImage = useCallback(
    (id: string | number) => setImages((prevImages) => prevImages.filter((image) => image.id !== id)),
    [],
  );
  const clearImages = useCallback(() => {
    if (images.length === 0) {
      return;
    }
    setImages([]);
  }, [images.length]);
  return {
    images,
    setImages,
    uploadImage,
    dismissImage,
    clearImages,
  };
}
