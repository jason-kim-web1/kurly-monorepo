export const STORAGE_KEY = {
  mainNotice: 'mainNotice',
  receiverFormForGuest: 'receiverFormForGuest',
  cartCounter: 'cartCounter',
  cartItems: 'cartItems',
  cartCheckbox: 'cartCheckbox',
  viewedProducts: 'viewedProducts', // 최근 조회한 상품들
  tossToken: 'tossToken', // 결제수단이 toss인 경우 tossToken을 저장합니다.
  appToken: 'appToken', // 결제환경이 웹뷰인 경우 accessToken을 저장합니다.
  'saveLoginUserID-development': 'saveLoginUserID-development', // 로그인 아이디 저장 기능을 스테이지 별로 각각 저장 합니다.
  'saveLoginUserID-stage': 'saveLoginUserID-stage',
  'saveLoginUserID-performance': 'saveLoginUserID-performance',
  'saveLoginUserID-production': 'saveLoginUserID-production',
  BEAUTY_PROFILE_PROMPT_DATE: 'BEAUTY_PROFILE_PROMPT_DATE',
  couponUsedDateByMemberNo: 'couponUsedDateByMemberNo',
} as const;

export type StorageKey = keyof typeof STORAGE_KEY;

export const storeLocalStorage = <T>(KEY: StorageKey, data: T) => {
  window.localStorage.setItem(KEY, JSON.stringify(data));
};

export const loadLocalStorage = <T>(KEY: StorageKey): T | null => {
  try {
    const data = window.localStorage.getItem(KEY);
    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const removeLocalStorage = (KEY: StorageKey) => {
  window.localStorage.removeItem(KEY);
};
