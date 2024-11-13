import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import styled from '@emotion/styled';

import Checkbox from '../../../../shared/components/Input/Checkbox';
import MessageArea from '../../../../shared/components/Message/MessageTextArea';
import COLOR from '../../../../shared/constant/colorset';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import { useAppSelector } from '../../../../shared/store';
import { InputEventType } from '../../interface/Leave.interface';
import { REASON_CODES } from '../../constants';
import { setReasonCodes } from '../../reducers/leave.slice';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: -3px;
`;

const checkboxStyle = css`
  width: 50%;
  padding: 13px 0;
  font-size: 14px;
`;

const theme = {
  height: 175,
  textColor: COLOR.kurlyGray800,
  placeholderColor: COLOR.placeholder,
  backgroundColor: COLOR.kurlyWhite,
  border: `solid 1px ${COLOR.lightGray}`,
  borderFocus: `solid 1px ${COLOR.kurlyGray800}`,
};

const textAreaStyle = css`
  textarea {
    font-size: 14px;
  }
`;

interface Props {
  onChange(event: InputEventType): void;
}

export default function SelectForm({ onChange }: Props) {
  const dispatch = useDispatch();

  const {
    form: { reasonComment },
    reasonCodes,
  } = useAppSelector(({ leave }) => leave);

  const handleChangeCheck = useCallback(
    (checked, value) => {
      if (checked) {
        dispatch(setReasonCodes([...reasonCodes, value]));
      } else {
        dispatch(setReasonCodes(reasonCodes.filter((item) => item !== value)));
      }
    },
    [dispatch, reasonCodes],
  );

  const handleChangeComment = (value: string) => {
    onChange({ name: 'reasonComment', value });
  };

  return (
    <InputGroup label="무엇이 불편하였나요?" colspan={true}>
      <CheckboxContainer>
        <CheckboxWrapper>
          {REASON_CODES.map(({ value, name }) => (
            <Checkbox
              key={value}
              label={name}
              name="reasonCodes"
              checked={reasonCodes.includes(value)}
              onChange={(e) => handleChangeCheck(e.currentTarget.checked, value)}
              css={checkboxStyle}
            />
          ))}
        </CheckboxWrapper>
      </CheckboxContainer>
      <MessageArea
        theme={theme}
        id="reasonComment"
        name="reasonComment"
        placeholder="고객님의 진심어린 충고 부탁드립니다."
        value={reasonComment}
        maxLength={Infinity}
        showCount={false}
        onChange={handleChangeComment}
        css={textAreaStyle}
      />
    </InputGroup>
  );
}
