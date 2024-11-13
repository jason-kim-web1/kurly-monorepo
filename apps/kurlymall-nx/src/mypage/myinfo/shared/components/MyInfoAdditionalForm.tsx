import { css } from '@emotion/react';

import styled from '@emotion/styled';

import { isPC } from '../../../../../util/window/getDevice';

import InputBox from '../../../../shared/components/Input/InputBox';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import { MypageInfoForm } from '../../interfaces/MyInfoForm.interface';

const inputStyle = css`
  padding: 0;

  input {
    font-size: 14px;
  }
`;

const Text = styled.p`
  & + div {
    margin-top: 5px;
  }
`;

export default function MyInfoAdditionalForm() {
  const {
    values: { recommendId, eventName },
  } = useFormEvent<MypageInfoForm>();

  const formId = recommendId ? 'recommendId' : 'eventName';
  return (
    <>
      {(recommendId || eventName) && (
        <InputGroup label={recommendId ? '추천인 아이디' : '참여 이벤트명'} htmlFor={formId}>
          {isPC ? (
            <InputBox
              id={formId}
              name={formId}
              value={recommendId ? recommendId : eventName}
              css={inputStyle}
              readOnly
            />
          ) : (
            <Text>{recommendId ? recommendId : eventName}</Text>
          )}
        </InputGroup>
      )}
    </>
  );
}
