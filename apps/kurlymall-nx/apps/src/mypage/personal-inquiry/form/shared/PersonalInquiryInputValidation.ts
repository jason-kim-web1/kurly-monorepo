import { FormikErrors, FormikValues } from 'formik';

export interface PersonalInquiryFormProps {
  subject: string;
  contents: string;
  allowsNotification: boolean;
  inquiryCategory?: string;
  inquirySubCategory?: string;
}

export const personalInquiryMaxSubjectLength = 100;
export const personalInquiryMaxContentsLength = 5000;

export const validatePersonalInquiryForm = async (values: FormikValues) => {
  const errors: FormikErrors<PersonalInquiryFormProps> = {};

  if (!values.inquiryCategory || !values.inquirySubCategory) {
    errors.inquiryCategory = '문의유형을 선택해주세요';
  }

  if (!values.subject) {
    errors.subject = '제목을 입력해주세요';
  }

  if (!values.contents) {
    errors.contents = '내용을 입력해주세요';
  }

  return errors;
};
