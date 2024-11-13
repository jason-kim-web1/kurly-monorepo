import styled from '@emotion/styled';
import { ReactNode } from 'react';

const Container = styled.div`
  display: flex;
  padding: 12px 0;
  align-items: start;
`;

const InputLabel = styled.div`
  width: 140px;
  font-size: 14px;
  line-height: 44px;
`;

const InputWrap = styled.div`
  width: 640px;
`;

const LabelRequiredText = styled.span({
  color: 'red',
});

interface Props {
  label?: string;
  id?: string;
  children: ReactNode;
  required: boolean;
}

const FormInputRow = ({ label, id, children, required }: Props) => (
  <Container>
    <InputLabel>
      <label htmlFor={id} data-testid="label-text">
        {label}
        {required && <LabelRequiredText data-testid="label-required-text">*</LabelRequiredText>}
      </label>
    </InputLabel>
    <InputWrap>{children}</InputWrap>
  </Container>
);

export default FormInputRow;
