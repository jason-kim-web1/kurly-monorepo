import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useCallback, useEffect, useState } from 'react';

import COLOR from '../../../../shared/constant/colorset';

import { isPC } from '../../../../../util/window/getDevice';

import Gender from '../components/Gender';
import YearBirth from '../components/YearBirth';
import Toddler from '../components/Toddler';

const Wrapper = styled.div<{ isFocus: boolean }>(
  ({ isFocus }) =>
    !isPC &&
    css`
      border: 1px solid ${isFocus ? COLOR.kurlyGray800 : COLOR.kurlyGray200};
      border-radius: 6px;
      padding: 0 20px;
      margin-top: 22px;
    `,
);

interface Props {
  changeButtonState: (yearBirthValidation: boolean, genderValidation: boolean) => void;
}

export default function PersonalInformation({ changeButtonState }: Props) {
  const [yearBirthValidation, setYearBirthValidation] = useState(false);
  const [genderValidation, setGenderValidation] = useState(false);
  const [isFocusYear, setIsFocusYear] = useState(false);

  useEffect(() => {
    changeButtonState(yearBirthValidation, genderValidation);
  }, [changeButtonState, genderValidation, yearBirthValidation]);

  const inputEvent = useCallback((state: boolean) => {
    setIsFocusYear(state);
  }, []);

  return (
    <>
      <Wrapper isFocus={isFocusYear}>
        <YearBirth
          setValidateYearBirth={setYearBirthValidation}
          onFocus={() => inputEvent(true)}
          onBlur={() => inputEvent(false)}
        />
        <Gender setValidateGender={setGenderValidation} />
      </Wrapper>
      <Toddler />
    </>
  );
}
