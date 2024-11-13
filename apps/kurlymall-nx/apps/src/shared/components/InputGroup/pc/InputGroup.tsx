import styled from '@emotion/styled';

import { memo, ReactNode } from 'react';

import COLOR from '../../../../shared/constant/colorset';

import ErrorMessage from '../../layouts/ErrorMessage';
import SuccessMessage from '../../layouts/SuccessMessage';

const Container = styled.div<{ colspan: boolean }>`
  display: inline-flex;
  width: 100%;
  padding: 10px ${({ colspan }) => (colspan ? '0px' : '20px')} 10px 20px;
`;

const LabelWrapper = styled.div`
  width: 139px;
  padding-top: 12px;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${COLOR.kurlyGray800};
  line-height: 20px;
`;

const InputWrapper = styled.div`
  flex: 1;
`;

const ActionWrapper = styled.div`
  width: 120px;
  margin-left: 8px;
  > button {
    height: 44px;
    border-radius: 3px;
    > span {
      font-weight: 500;
      font-size: 14px;
    }
  }
`;

const ErrorWrapper = styled.div`
  padding: 10px 0;
`;

const Icon = styled.span`
  color: ${COLOR.loversTag};
`;

interface Props {
  label?: string;
  isEmptyLabel?: boolean;
  children: ReactNode;
  action?: ReactNode;
  isRequired?: boolean;
  touched?: boolean;
  validationMessage?: string;
  colspan?: boolean;
  className?: string;
  htmlFor?: string;
  successMessage?: string;
}

function PcInputGroup({
  label,
  isEmptyLabel,
  children,
  action,
  touched = false,
  validationMessage,
  isRequired = false,
  colspan = false,
  className,
  htmlFor,
  successMessage = '',
}: Props) {
  return (
    <Container colspan={colspan} className={className}>
      {isEmptyLabel && <LabelWrapper></LabelWrapper>}
      {label && (
        <LabelWrapper>
          <Label htmlFor={htmlFor}>
            {label}
            {isRequired && <Icon>*</Icon>}
          </Label>
        </LabelWrapper>
      )}
      <InputWrapper>
        {children}
        {validationMessage && touched && (
          <ErrorWrapper>
            <ErrorMessage message={validationMessage} />
          </ErrorWrapper>
        )}
        {successMessage && touched && (
          <ErrorWrapper>
            <SuccessMessage message={successMessage} />
          </ErrorWrapper>
        )}
      </InputWrapper>
      {!colspan && <ActionWrapper>{!!action && action}</ActionWrapper>}
    </Container>
  );
}

export default memo(PcInputGroup);
