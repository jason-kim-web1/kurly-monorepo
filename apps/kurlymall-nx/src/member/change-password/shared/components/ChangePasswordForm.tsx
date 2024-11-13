import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Form } from 'formik';

import { FormEvent } from 'react';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { head, isEmpty } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';

import InputBox from '../../../../shared/components/Input/InputBox';
import Button from '../../../../shared/components/Button/Button';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';

import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import { PasswordChangeForm } from '../interface';
import { updateMemberPassword } from '../../../../shared/services';
import { redirectTo } from '../../../../shared/reducers/page';
import { getPageUrl, USER_MENU_PATH } from '../../../../shared/constant';
import Alert from '../../../../shared/components/Alert/Alert';

const FormWrapper = styled.div`
  padding: 22px 20px;
`;

const Hint = styled.div`
  padding-bottom: 10px;
  font-size: 16px;
`;

const SubmitWrapper = styled.div`
  margin-top: 20px;
`;

const SectionDividerBar = styled.div`
  border-bottom: 1px solid ${COLOR.bg};
  margin-top: 20px;
`;

const styles = {
  input: css`
    padding-bottom: 0;
  `,
};

export default function ChangePasswordForm() {
  const {
    values: { originalPassword, newPassword, newPasswordConfirm },
    validationEvents,
    handleChange,
    context: { isValid, errors, isSubmitting, setSubmitting, handleSubmit: handleFormikSubmit },
  } = useFormEvent<PasswordChangeForm>();

  const dispatch = useDispatch();
  const router = useRouter();
  const { return_url: returnUrl } = router.query as { return_url: string };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (!originalPassword) {
        throw new Error('현재 비빌번호를 입력해 주세요');
      }

      if (!newPassword || !newPasswordConfirm) {
        throw new Error('새 비밀번호를 입력해 주세요');
      }

      handleFormikSubmit();

      if (!isValid) {
        let errorMessages: string[] = [];
        if (errors) {
          errorMessages = Object.values(errors);
        }

        throw new Error(isEmpty(errorMessages) ? '입력하신 내용을 확인해 주세요' : head(errorMessages));
      }

      await updateMemberPassword({ originalPassword, newPassword });
      dispatch(redirectTo({ url: returnUrl || getPageUrl(USER_MENU_PATH.home), isExternal: true }));
    } catch (e) {
      await Alert({ text: e.message || '입력하신 패스워드를 확인해 주세요' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Hint>고객님의 개인 정보를 보호하고, 피해를 예방하기 위하여 비밀번호 변경을 안내드립니다.</Hint>
        <InputGroup label={'현재 비밀번호'} isRequired colspan={true} {...validationEvents('originalPassword')}>
          <InputBox
            type="password"
            id="originalPassword"
            name="originalPassword"
            autoComplete="off"
            placeholder="현재 비밀번호를 입력해주세요."
            css={styles.input}
            value={originalPassword}
            onChange={handleChange}
            maxLength={16}
          />
        </InputGroup>
        <InputGroup label={'새 비밀번호'} isRequired colspan={true} {...validationEvents('newPassword')}>
          <InputBox
            type="password"
            id="newPassword"
            name="newPassword"
            autoComplete="off"
            placeholder="새 비밀번호를 입력해주세요."
            css={styles.input}
            value={newPassword}
            onChange={handleChange}
            maxLength={16}
          />
        </InputGroup>
        <InputGroup label={'새 비밀번호 확인'} isRequired colspan={true} {...validationEvents('newPasswordConfirm')}>
          <InputBox
            type="password"
            id="newPasswordConfirm"
            name="newPasswordConfirm"
            autoComplete="off"
            placeholder="새 비밀번호를 한번 더 입력해주세요."
            css={styles.input}
            value={newPasswordConfirm}
            onChange={handleChange}
            maxLength={16}
          />
        </InputGroup>
        <SubmitWrapper>
          <Button type={'submit'} text={'변경하기'} isSubmitLoading={isSubmitting} />
        </SubmitWrapper>
        <SectionDividerBar />
      </Form>
    </FormWrapper>
  );
}
