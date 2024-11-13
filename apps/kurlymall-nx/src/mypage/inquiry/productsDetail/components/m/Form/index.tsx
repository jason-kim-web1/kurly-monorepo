import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useCallback } from 'react';

import COLOR from '../../../../../../shared/constant/colorset';

import Button from '../../../../../../shared/components/Button/Button';
import InputBox from '../../../../../../shared/components/Input/InputBox';
import MessageArea from '../../../../../../shared/components/Message/MessageTextArea';
import Checkbox from '../../../../../../shared/components/Input/Checkbox';

import type { URLBasedFormData } from '../../../containers/m/FormContainer';

const Container = styled.form`
  padding: 36px 20px 20px;
  min-height: 100vh;
  background-color: ${COLOR.kurlyWhite};
  > .form-row {
    margin-bottom: 16px;
  }
  > .actions-row {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

type Props = URLBasedFormData & {
  isValid: boolean;
  isLoading: boolean;
  onChange(type: string, value: string | boolean): void;
  onSave(): void;
};

const Form = (props: Props) => {
  const { subject, contents, isSecret, onChange, onSave, isValid, isLoading } = props;

  const handleChangeSubject = useCallback(({ value }: { value: string }) => onChange('subject', value), [onChange]);
  const handleChangeContents = useCallback((value: string) => onChange('contents', value), [onChange]);
  const handleToggleIsSecret = useCallback(() => onChange('isSecret', !isSecret), [isSecret, onChange]);

  return (
    <Container>
      <div className="form-row">
        <InputBox
          css={css`
            padding: 0;
          `}
          value={subject}
          onChange={handleChangeSubject}
          placeholder="제목을 입력해주세요."
        />
      </div>
      <div className="form-row">
        <MessageArea
          className="text-area"
          value={contents}
          maxLength={5000}
          onChange={handleChangeContents}
          placeholder="내용을 입력해주세요."
          theme={{
            textColor: COLOR.kurlyGray800,
            placeholderColor: COLOR.placeholder,
            backgroundColor: COLOR.kurlyWhite,
            border: `solid 1px ${COLOR.lightGray}`,
            borderFocus: `solid 1px ${COLOR.kurlyGray800}`,
          }}
        />
      </div>
      <div className="form-row">
        <Checkbox
          label="비밀글로 문의하기"
          name="checkboxIsSecret"
          id="checkbox-is-secret"
          onChange={handleToggleIsSecret}
          checked={isSecret}
        />
      </div>
      <div className="actions-row">
        <Button
          disabled={!isValid || isLoading}
          css={css`
            width: 100vw;
          `}
          type="button"
          text="등록"
          width={160}
          height={56}
          radius={4}
          theme="primary"
          onClick={onSave}
        />
      </div>
    </Container>
  );
};

export default Form;
