import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';
import InputBox from '../../../../shared/components/Input/InputBox';
import { NUMBER_DENY_REGEX } from '../../../../shared/constant';

import useAgeGroup from '../../shared/hooks/useAgeGroup';
import { useAppSelector } from '../../../../shared/store';

import { updateBirthYear } from '../../slice';

const Wrapper = styled.div<{ isInValid: boolean }>`
  display: flex;
  ${isPC
    ? css`
        align-items: center;
        height: 48px;
        margin-top: 20px;
      `
    : css`
        height: 57px;
        align-items: flex-start;
        justify-content: space-between;
      `};

  ${({ isInValid }) =>
    isInValid &&
    !isPC &&
    css`
      height: 78px;
    `}
`;

const Title = styled.div`
  ${isPC
    ? css`
        flex-shrink: 0;
        width: 205px;
        font-weight: 500;
      `
    : css`
        font-size: 16px;
        line-height: 57px;
      `};
`;

const Contents = styled.div`
  position: relative;

  ${isPC
    ? css`
        width: 402px;
      `
    : css`
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
      `};
`;

const AgeGroupMessage = styled.div`
  ${isPC
    ? css`
        position: absolute;
        top: 0;
        right: 14px;
        line-height: 46px;
        font-size: 14px;
        color: ${COLOR.validBlue};
      `
    : css`
        font-size: 16px;
        white-space: pre;
        line-height: 57px;
      `};
`;

const ErrorMessage = styled.div`
  position: absolute;
  color: ${COLOR.invalidRed};
  font-size: 12px;

  ${isPC
    ? css`
        left: 0;
        bottom: -19px;
      `
    : css`
        right: 0;
        bottom: -7px;
        white-space: pre;
      `};
`;

const styles = {
  webInput: (isInValid: boolean) => {
    return css`
      flex-grow: 1;
      padding-bottom: 0;

      input {
        border-color: ${isInValid && `${COLOR.invalidRed}!important`};
      }
    `;
  },

  mwInput: css`
    padding: 0;
    > div {
      width: 55px;
      height: auto;
    }

    input {
      padding: 0;
      border: 0;
      height: 57px;
      text-align: right;
      font-size: 18px;
      font-weight: 600;

      ::placeholder {
        color: ${COLOR.lightGray};
      }

      :focus{
        border: 0;
      }
  `,
};

interface Props {
  onFocus?: () => void;
  onBlur?: () => void;
  setValidateYearBirth: (isValid: boolean) => void;
}

export default function YearBirth({ setValidateYearBirth, onFocus, onBlur }: Props) {
  const dispatch = useDispatch();

  const [yearInput, setYearInput] = useState('');

  const {
    myKurlyStyleInformation: { birthYear },
  } = useAppSelector(({ myKurlyStyle }) => myKurlyStyle);

  const { ageGroup, isValid } = useAgeGroup(yearInput);

  const onChange = useCallback(({ value }: { value: string }) => {
    setYearInput(value);
  }, []);

  useEffect(() => {
    if (birthYear) {
      setYearInput(String(birthYear));
    }
  }, [birthYear]);

  useEffect(() => {
    setValidateYearBirth(isValid);
    if (!isEmpty(yearInput)) {
      dispatch(updateBirthYear(parseInt(yearInput)));
    }
  }, [setValidateYearBirth, ageGroup, dispatch, yearInput, isValid]);

  const isValidInput = isValid || yearInput.length === 0;
  return (
    <Wrapper isInValid={!isValidInput}>
      <Title>출생년도</Title>
      <Contents>
        <InputBox
          name="year"
          type="tel"
          value={yearInput}
          placeholder={isPC ? '출생년도를 입력해주세요' : '2000'}
          maxLength={4}
          denyPattern={NUMBER_DENY_REGEX}
          onChange={onChange}
          css={isPC ? styles.webInput(!isValidInput) : styles.mwInput}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {isValid && <AgeGroupMessage>{ageGroup}</AgeGroupMessage>}
        {!isValidInput && <ErrorMessage>태어난 년도를 정확하게 입력해주세요.</ErrorMessage>}
      </Contents>
    </Wrapper>
  );
}
