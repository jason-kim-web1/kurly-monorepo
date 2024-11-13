import { readMyInfo, requestPasswordConfirm, updateMyinfoModify } from '../../../shared/api/mypage/myInfo';
import { MyInfoResponses, MypageInfoForm, PostMypageInfoForm } from '../interfaces/MyInfoForm.interface';

export const postPasswordConfirm = async (params: string) => {
  return requestPasswordConfirm(params);
};

// 개인정보 수정 처리
export const putMyInfoModify = async (values: MypageInfoForm): Promise<MyInfoResponses> => {
  const {
    name,
    email,
    mobileNumber,
    gender,
    originalPassword,
    newPassword,
    birthDay,
    birthMonth,
    birthYear,
    modifyingToken,
    isVerifiedOriginalPassword,
    agreed: { OptionalTermsOfPrivacy, OptionalTermsOfSms, OptionalTermsOfMailing },
  } = values;

  const updateForm: PostMypageInfoForm = {
    name,
    email,
    mobileNumber,
    gender,
    modifyingToken,
    isAgreeOptionalTermsOfPrivacy: OptionalTermsOfPrivacy.checked,
    isAgreeOptionalTermsOfSms: OptionalTermsOfSms.checked,
    isAgreeOptionalTermsOfMailing: OptionalTermsOfMailing.checked,
  };

  if (birthYear && birthMonth && birthDay) {
    const prefixMonth = Number(birthMonth) < 10 ? `0${Number(birthMonth)}` : birthMonth;
    const prefixDay = Number(birthDay) < 10 ? `0${Number(birthDay)}` : birthDay;

    updateForm.birthYear = birthYear;
    updateForm.birthDay = `${prefixMonth}${prefixDay}`;
  }

  if (isVerifiedOriginalPassword && originalPassword) {
    updateForm.originalPassword = originalPassword;
    updateForm.newPassword = newPassword;
  }

  return updateMyinfoModify(updateForm);
};

// 개인 정보 수정 - 정보 조회
// 비밀번호 검증 후 30초간만 조회가 가능, 그이후는 거부
export const getMyInfo = async (): Promise<MyInfoResponses> => {
  return readMyInfo();
};
