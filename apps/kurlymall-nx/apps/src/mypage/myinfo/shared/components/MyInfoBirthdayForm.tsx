import { css } from '@emotion/react';

import styled from '@emotion/styled';

import { useMemo } from 'react';

import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import InputBox from '../../../../shared/components/Input/InputBox';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import { MypageInfoForm } from '../../interfaces/MyInfoForm.interface';
import { NUMBER_DENY_REGEX } from '../../../../shared/constant';

const BirthdayWrapper = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 0 15px;
`;

const BirthdaySplitBar = styled.span`
  height: 100%;
  &:after {
    content: '/';
    font-size: 14px;
    color: #ccc;
    text-align: center;
    line-height: 40px;
  }
`;

const inputStyle = css`
  padding-bottom: 0;

  input {
    text-align: center;
    font-size: 14px;
    border: none;

    &:focus {
      border: none;
    }
  }
`;

export default function MyInfoBirthdayForm() {
  const {
    values: { birthYear, birthMonth, birthDay },
    touched,
    errors,
    handleChange,
  } = useFormEvent<MypageInfoForm>();

  // 정해진 순서대로 에러를 가져오기 위해 가공후 내려줍니다.
  /**
   * year -> month -> day
   */
  const sortErrorMessage = useMemo(() => {
    if (errors.birthYear) {
      return errors.birthYear;
    }

    if (errors.birthMonth) {
      return errors.birthMonth;
    }

    if (errors.birthDay) {
      return errors.birthDay;
    }

    return '';
  }, [errors.birthDay, errors.birthMonth, errors.birthYear]);

  return (
    <>
      <InputGroup
        touched={touched.birthYear || touched.birthMonth || touched.birthDay}
        validationMessage={sortErrorMessage}
        label="생년월일"
        htmlFor="birthYear"
      >
        <BirthdayWrapper>
          <InputBox
            name="birthYear"
            placeholder="YYYY"
            height={40}
            maxLength={4}
            value={birthYear}
            onChange={handleChange}
            denyPattern={NUMBER_DENY_REGEX}
            css={inputStyle}
          />
          <BirthdaySplitBar />
          <InputBox
            name="birthMonth"
            placeholder="MM"
            height={40}
            maxLength={2}
            value={birthMonth}
            onChange={handleChange}
            css={inputStyle}
            denyPattern={NUMBER_DENY_REGEX}
          />
          <BirthdaySplitBar />
          <InputBox
            name="birthDay"
            placeholder="DD"
            height={40}
            maxLength={2}
            value={birthDay}
            onChange={handleChange}
            css={inputStyle}
            denyPattern={NUMBER_DENY_REGEX}
          />
        </BirthdayWrapper>
      </InputGroup>
    </>
  );
}
