const KEY = 'VerificationReturnData';

interface AdultVerificationData {
  referrer_url: string;
  goodsno: number;
}

export const saveAdultVerificationData = (data: AdultVerificationData) => {
  sessionStorage.setItem(KEY, JSON.stringify(data));
};

export const loadAdultVerificationData = (): AdultVerificationData | null => {
  const data = sessionStorage.getItem(KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

export const removeAdultVerificationData = () => {
  sessionStorage.removeItem(KEY);
};
