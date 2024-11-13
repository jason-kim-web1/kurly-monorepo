import styled from '@emotion/styled';

import { isEmpty } from 'lodash';
import { FormikErrors } from 'formik';

import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const Button = styled.button<{ active: boolean }>`
  width: 100%;
  height: 52px;
  color: ${COLOR.kurlyWhite};
  font-size: 16px;
  background-color: ${({ active }) => (active ? COLOR.kurlyPurple : COLOR.lightGray)};
  border-radius: 6px;
`;

interface Error {
  subject: string;
  content: string;
}

interface Props {
  onSubmit(): void;
  errors: FormikErrors<Error>;
}

export default function InquiryFormSubmitButton({ onSubmit, errors }: Props) {
  const isValid = isEmpty(Object.keys(errors));

  return (
    <Container>
      <Button active={isValid} disabled={!isValid} type="button" onClick={onSubmit}>
        등록
      </Button>
    </Container>
  );
}
