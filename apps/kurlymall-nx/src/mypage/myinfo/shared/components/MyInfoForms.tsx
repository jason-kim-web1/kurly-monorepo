import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Form } from 'formik';

import axios, { AxiosError } from 'axios';

import { head, isEmpty } from 'lodash';

import { isPC, isWebview } from '../../../../../util/window/getDevice';

import MyInfoBasicForm from '../components/MyInfoBasicForm';
import MyInfoEmailForm from '../components/MyInfoEmailForm';
import MyInfoPhoneAuthForm from '../components/MyInfoPhoneAuthForm';
import MyInfoBirthdayForm from '../components/MyInfoBirthdayForm';
import MyInfoGenderForm from '../components/MyInfoGenderForm';
import MyInfoAdditionalForm from '../components/MyInfoAdditionalForm';
import MyInfoAgreeForm from '../../components/pc/MyInfoAgreeForm';
import MobileMyInfoAgreeForm from '../../components/m/MobileMyInfoAgreeForm';
import MyInfoModifySubmit from '../../components/pc/MyInfoModifySubmit';
import MobileMyInfoModifySubmit from '../../components/m/MobileMyInfoModifySubmit';
import { redirectTo } from '../../../../shared/reducers/page';
import { getPageUrl, MYPAGE_PATH, USER_MENU_PATH } from '../../../../shared/constant';
import { getMyInfo, putMyInfoModify } from '../../services/myinfo.service';
import Loading from '../../../../shared/components/Loading/Loading';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import { initialMypageInfoForm, MypageInfoForm } from '../../interfaces/MyInfoForm.interface';
import Alert from '../../../../shared/components/Alert/Alert';
import { BaseApiResponse } from '../../../../shared/interfaces';
import appService from '../../../../shared/services/app.service';
import { loadMyKurlyInfo } from '../../../info-section/mykurly.slice';

export default function MyInfoForms() {
  const dispatch = useDispatch();
  const [passwordVerified, setPasswordVerified] = useState(false);

  const {
    values,
    context: { setValues, isValid, setSubmitting, errors, handleSubmit: handleFormikSubmit },
  } = useFormEvent<MypageInfoForm>();

  const getModifyInfo = useCallback(async () => {
    try {
      const {
        memberId,
        birthDay,
        birthYear,
        email,
        eventName,
        gender,
        mobileNumber,
        name,
        recommendId,
        modifyingToken,
        isAgreeOptionalTermsOfMailing,
        isAgreeOptionalTermsOfPrivacy,
        isAgreeOptionalTermsOfSms,
      } = await getMyInfo();

      const agreed = {
        OptionalTermsOfSms: {
          key: 'OptionalTermsOfSms',
          checked: isAgreeOptionalTermsOfSms,
        },
        OptionalTermsOfMailing: {
          key: 'OptionalTermsOfMailing',
          checked: isAgreeOptionalTermsOfMailing,
        },
        OptionalTermsOfPrivacy: {
          key: 'OptionalTermsOfPrivacy',
          checked: isAgreeOptionalTermsOfPrivacy,
        },
        SignupEventAll: {
          key: 'SignupEventAll',
          checked: isAgreeOptionalTermsOfMailing && isAgreeOptionalTermsOfSms,
        },
      };

      const defaultValues: Partial<MypageInfoForm> = {
        memberId,
        birthDay: birthDay ? birthDay.substring(2, 4) : '',
        birthMonth: birthDay ? birthDay.substring(0, 2) : '',
        birthYear: birthYear ?? '',
        email,
        originalEmail: email,
        gender,
        mobileNumber,
        name,
        eventName,
        recommendId,
        modifyingToken,
        isAgreeOptionalTermsOfMailing,
        isAgreeOptionalTermsOfPrivacy,
        isAgreeOptionalTermsOfSms,
        agreed,
      };

      setValues({ ...initialMypageInfoForm, ...defaultValues });
      setPasswordVerified(true);
    } catch (error) {
      dispatch(redirectTo({ url: getPageUrl(MYPAGE_PATH.myInfo) }));
    }
  }, [dispatch, setValues]);

  useEffect(() => {
    void getModifyInfo();
  }, [getModifyInfo]);

  const checkVerification = useCallback(() => {
    if (values.originalPassword && !values.isVerifiedOriginalPassword) {
      throw Error('현재 비밀번호를 정확하게 입력하여 주세요.');
    }

    if (
      values.newPassword &&
      values.newPasswordConfirm &&
      (!values.isVerifiedOriginalPassword || !values.originalPassword)
    ) {
      throw Error('비밀번호를 변경 할 경우, 기존 비밀번호를 확인해 주세요!');
    }

    if (!values.isDuplicateCheckEmail) {
      throw Error('이메일 중복 체크를 해주세요.');
    }

    if (!values.isVerification) {
      throw Error('휴대폰 인증을 진행해 주세요.');
    }

    return true;
  }, [
    values.originalPassword,
    values.newPassword,
    values.newPasswordConfirm,
    values.isVerifiedOriginalPassword,
    values.isDuplicateCheckEmail,
    values.isVerification,
  ]);

  const handleSubmit = async () => {
    const showAlert = async (text: string) => {
      await Alert({ text });
    };

    try {
      checkVerification();
      handleFormikSubmit();

      if (!isValid) {
        const errorMessages: string[] = errors ? Object.values(errors as object) : [];
        await Alert({
          text: isEmpty(errorMessages) ? '입력하신 내용을 확인해 주세요' : head(errorMessages),
        });
        return;
      }

      await putMyInfoModify(values);

      await showAlert('회원 정보가 수정되었습니다.');

      if (isWebview()) {
        appService.postAppMessage({ code: 'WV3100' });
      } else if (!isPC) {
        dispatch(redirectTo({ url: getPageUrl(USER_MENU_PATH.mykurly) }));
      } else {
        dispatch(loadMyKurlyInfo());
        dispatch(redirectTo({ url: getPageUrl(MYPAGE_PATH.myInfo) }));
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError<BaseApiResponse<{ message: string }>>;
        if (error.response?.status === 400) {
          // 유효하지 않은 modifyingToken
          await showAlert('개인 정보 수정이 가능한 시간이 지났습니다. 다시 시도해주세요.');
          dispatch(redirectTo({ url: getPageUrl(MYPAGE_PATH.myInfo) }));
        } else {
          await showAlert(error.response?.data.message ?? '개인정보 수정에 실패 하였습니다.\n다시 시도해 주세요!');
        }
      } else {
        await showAlert(e.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return passwordVerified ? (
    <Form>
      <MyInfoBasicForm />
      <MyInfoEmailForm />
      <MyInfoPhoneAuthForm />
      <MyInfoGenderForm />
      <MyInfoBirthdayForm />
      <MyInfoAdditionalForm />
      {isPC ? (
        <>
          <MyInfoAgreeForm />
          <MyInfoModifySubmit onSubmit={handleSubmit} />
        </>
      ) : (
        <>
          <MobileMyInfoAgreeForm />
          <MobileMyInfoModifySubmit onSubmit={handleSubmit} />
        </>
      )}
    </Form>
  ) : (
    <Loading />
  );
}
