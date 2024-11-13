import type {
  ReviewVisibilityType,
  PrevUploadImageStatusType,
  ReviewPassStatusType,
  ReviewPassResultStatusType,
} from '../types';

export const REVIEW_VISIBILITY_TYPES: Record<ReviewVisibilityType, ReviewVisibilityType> = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  BLOCK: 'BLOCK',
} as const;

export const MAX_SELECTABLE_IMAGE_COUNT = 8;

export const MIN_REVIEW_CONTENT_LENGTH = 10;

export const ALLOWED_FILE_EXTENSIONS = ['png', 'jpg', 'jpeg'];

export const PREV_UPLOAD_IMAGE_STATUS: Record<PrevUploadImageStatusType, PrevUploadImageStatusType> = {
  SUCCESS: 'SUCCESS',
  DELETE: 'DELETE',
} as const;

export const ALERT_MESSAGES = {
  REVIEW_WRITE_SUCCESS: '도움이 되는 후기를 작성해주셔서 감사합니다.',
  REVIEW_VISIBILITY_PUBLIC: '후기를 공개하면 후기 리스트에 노출됩니다.',
  REVIEW_VISIBILITY_PRIVATE: '후기를 비공개하면 후기 리스트에 노출되지 않습니다.',
  ADMIN_BLOCKED_REVIEW: '관리자가 비공개 처리한 후기입니다.\n공개를 원하시면 고객센터로 문의해주세요.',
  PHOTO_REVIEW_FORM_REQUIRE_MIN_IMAGE: '사진후기는 수정 시,\n최소 1장의 사진이 필요합니다.',
  REVIEW_LOAD_ERROR: '해당 상품의 후기를 작성할 수 없습니다.',
  NETWORK_ERROR: '일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.',
  REVIEW_CHANGE_SUCCESS: '후기가 정상적으로 수정되었습니다.',
  CHECK_NETWORK_CONNECTION: '인터넷 연결 상태를 확인해주세요.',
  CONFIRM_REVIEW_CHANGE: '수정하신 내용으로 후기 내용을 변경하시겠습니까?',
  CONFIRM_LEAVE_REGISTRATION_FORM: '작성화면을 나가실건가요?\n작성하신 내용은 저장되지 않습니다.',
  CONFIRM_LEAVE_MODIFICATION_FORM: '수정화면을 나가실건가요?\n수정하신 내용은 저장되지 않습니다.',
  CONFIRM_RETRY_REGISTRATION: '일시적인 오류로 후기 작성이 중단되었습니다.\n이어서 작성을 시도하시겠습니까?',
  CONFIRM_RETRY_MODIFICATION: '일시적인 오류로 후기 수정이 중단되었습니다.\n이어서 수정을 시도하시겠습니까?',
} as const;

export const REVIEW_INSTRUCTION_LIST = [
  '사진은 최대 8장까지, 30MB 이하의 이미지만 업로드가 가능합니다.',
  '상품과 무관하거나 반복되는 동일 단어/문장을 사용하여 후기로 볼 수 없는 글, 판매자와 고객의 후기 이용을 방해한다고 판단되는 경우, 배송 박스, 구매 상품을 구분할 수 없는 전체 사진, 화면캡쳐, 음란 및 부적절하거나 불법적인 내용은 통보없이 삭제 및 적립금 회수될 수 있습니다.',
  '전화번호, 이메일, 주소, 계좌번호 등 개인정보가 노출되지 않도록 주의해주세요.',
] as const;

export const REVIEW_MODIFICATION_INSTRUCTION_LIST = [
  '사진후기로 등록한 후기의 경우, 최소 1장의 사진을 등록 후 수정이 가능합니다.',
] as const;

export const REVIEW_PASS_STATUS: Record<ReviewPassStatusType, ReviewPassStatusType> = {
  NONE: 'NONE',
  FORBIDDEN: 'FORBIDDEN',
  ALL: 'ALL',
} as const;

export const REVIEW_PASS_RESULT_STATUS: Record<ReviewPassResultStatusType, ReviewPassResultStatusType> = {
  FORBIDDEN: 'FORBIDDEN',
  MEANINGLESS: 'MEANINGLESS',
} as const;

export const REVIEW_TAB_NAME = {
  WRITABLE_TAB: '작성 가능 후기',
  WRITTEN_TAB: '작성한 후기',
} as const;

export const REVIEW_ORDER_TYPE = {
  NORMAL: 'NORMAL',
  KURLY_NOW: 'KURLY_NOW',
};
