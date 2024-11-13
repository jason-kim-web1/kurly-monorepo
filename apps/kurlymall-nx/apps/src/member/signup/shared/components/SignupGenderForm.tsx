import styled from '@emotion/styled';

import { isPC } from '../../../../../util/window/getDevice';

import { NormalSignupFormInterface } from '../../interfaces/NormalSignupForm.interface';

import Radio from '../../../../shared/components/Input/Radio';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';

const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${isPC ? 'row' : 'column'};
  > label > span {
    font-size: 14px;
  }
`;

export default function SignupGenderForm() {
  const {
    values: { gender },
    handleChange,
  } = useFormEvent<NormalSignupFormInterface>();

  return (
    <InputGroup label={'성별'}>
      <RadioWrapper>
        <Radio label="남자" value="MALE" name="gender" id="gender-man" onChange={handleChange} selectedValue={gender} />
        <Radio
          label="여자"
          value="FEMALE"
          name="gender"
          id="gender-woman"
          onChange={handleChange}
          selectedValue={gender}
        />
        <Radio
          label="선택안함"
          value="NONE"
          name="gender"
          id="gender-none"
          onChange={handleChange}
          selectedValue={gender}
        />
      </RadioWrapper>
    </InputGroup>
  );
}
