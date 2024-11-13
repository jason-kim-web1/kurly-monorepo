import { MemberOrderData } from '../shared/types';
import { UserInquiryContentImageData } from '../list/types';

interface PersonalInquiryModifyData {
  draft: {
    id: number;
    subject: string;
    contents: string;
  };
  inquiryTypeCode: string;
  inquiryTypeSubCode: string;
  orderData: MemberOrderData;
  allowsNotification: boolean;
  userImages: UserInquiryContentImageData[];
}

const SESSION_STORAGE_KEY = 'personal_inquiry_item';

export const storePersonalInquirySessionData = (data: PersonalInquiryModifyData) => {
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
};

export const removePersonalInquirySessionData = () => {
  window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
};

export const getPersonalInquirySessionData = (): PersonalInquiryModifyData | null => {
  const data = window.sessionStorage.getItem(SESSION_STORAGE_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
};
