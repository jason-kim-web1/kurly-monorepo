import { chain, get, isUndefined, last, size, sum } from 'lodash';

export type Image = {
  id: string | number;
  url: string;
  file: File;
};

export type ImageFileRule = 'MAX_FILE_COUNT' | 'MAX_FILE_SIZE' | 'FILE_EXTENSION';

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

// export type ValidationError = Omit<ValidateResult, 'isValid'>;

export type RuleValidator = (files: Image[], options: ValidateOptions) => ValidateResult;

export const IMAGE_FILE_RULE_VALIDATION_ORDER = ['MAX_FILE_COUNT', 'MAX_FILE_SIZE', 'FILE_EXTENSION'] as const;

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
    const canSaveImage = files.every((image) => {
      const fileSize = get(image, 'file.size');
      return fileSize <= maxFileSizeInMB;
    });
    if (canSaveImage) {
      return { isValid: true };
    }
    return {
      isValid: false,
      type: 'MAX_FILE_SIZE',
      message: `사진 용량 제한 (${options.maxFileSize}MB 이하) 를 확인해주세요.`,
    };
  },
  FILE_EXTENSION(images, { allowFileExtensions }) {
    if (isUndefined(allowFileExtensions)) {
      return { isValid: true };
    }
    const lowerCasedExtensions = allowFileExtensions.map((extension) => extension.toLowerCase());
    const filesWithInvalidExtension = chain(images)
      .map(({ file }) => file)
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
