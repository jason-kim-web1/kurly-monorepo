import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Form } from 'formik';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';

import { isPC } from '../../../../../util/window/getDevice';
import { useAppSelector } from '../../../../shared/store';
import InputBox from '../../../../shared/components/Input/InputBox';

import Button from '../../../../shared/components/Button/Button';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import { MypageInfoPasswordForm } from '../../interfaces/MyInfoForm.interface';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import Alert from '../../../../shared/components/Alert/Alert';
import { postPasswordConfirm } from '../../services/myinfo.service';
import { redirectTo } from '../../../../shared/reducers/page';
import { MYPAGE_PATH } from '../../../../shared/constant';

const Content = styled.div`
  ${isPC &&
  `
    padding: 7px;
    border-top: 2px solid ${COLOR.kurlyGray800};
    border-bottom: 1px solid ${COLOR.lightGray};
  `};
`;

const inputStyle = css`
  padding: 0;

  input {
    font-size: 14px;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${isPC ? '40px' : '20px'};
`;

export default function MyInfoPasswordCheckForm() {
  const dispatch = useDispatch();
  const { info } = useAppSelector(({ member }) => member);

  const {
    values: { password },
    context: { setSubmitting, handleSubmit, isSubmitting, isValid },
    validationEvents,
    handleChange,
  } = useFormEvent<MypageInfoPasswordForm>();

  const handleFormSubmit = useCallback(async () => {
    try {
      handleSubmit();

      if (!isValid) {
        await Alert({
          text: '비밀번호를 입력해 주세요.',
        });
        return;
      }

      await postPasswordConfirm(password);
      dispatch(redirectTo({ url: MYPAGE_PATH.myInfoModify.uri }));
    } catch (error) {
      const errorMessage = error.response.data.message ?? '패스워드 확인에 실패 하였습니다.';
      await Alert({
        text: errorMessage,
      });
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, handleSubmit, isValid, password, setSubmitting]);

  return (
    <Form>
      <Content>
        <InputGroup label="아이디" htmlFor="userId">
          <InputBox id="userId" name="userId" value={info ? info.id : ''} css={inputStyle} readOnly />
        </InputGroup>
        <InputGroup label="비밀번호" htmlFor="password" isRequired {...validationEvents('password')}>
          <InputBox
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            placeholder="현재 비밀번호를 입력해주세요"
            value={password}
            css={inputStyle}
            onChange={handleChange}
          />
        </InputGroup>
      </Content>
      <ButtonWrap>
        <Button
          type="submit"
          text="확인"
          width={isPC ? 240 : undefined}
          height={isPC ? 56 : 48}
          radius={3}
          isSubmitLoading={isSubmitting}
          onClick={handleFormSubmit}
        />
      </ButtonWrap>
    </Form>
  );
}
