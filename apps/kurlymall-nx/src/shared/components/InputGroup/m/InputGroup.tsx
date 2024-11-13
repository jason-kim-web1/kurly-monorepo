import styled from '@emotion/styled';

import { memo, ReactNode } from 'react';

import COLOR from '../../../../shared/constant/colorset';

import ErrorMessage from '../../layouts/ErrorMessage';
import SuccessMessage from '../../layouts/SuccessMessage';

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0;
  flex-direction: column;
`;

const LabelWrapper = styled.div`
  width: 100%;
  padding: 18px 0 7px;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${COLOR.kurlyGray800};
  line-height: 20px;
`;

const LabelDescription = styled.p`
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
  line-height: 18px;
  padding-top: 4px;
  padding-bottom: 7px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputWrapper = styled.div`
  flex: 1;
`;

const ActionWrapper = styled.div<{ size: 'normal' | 'large' }>`
  width: ${({ size }) => (size === 'normal' ? '85px' : '122px')};
  margin-left: 8px;
  > button {
    height: 46px;
    border-radius: 4px;
    > span {
      font-weight: 600;
      font-size: 16px;
    }
  }
`;

const Icon = styled.span`
  color: ${COLOR.loversTag};
`;

const ErrorWrapper = styled.div`
  padding: 10px 0;
`;

interface Props {
  label?: string;
  isEmptyLabel?: boolean; //PC버전과 호환 맞추기 위해 타입 추가
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  actionSize?: 'normal' | 'large';
  isRequired?: boolean;
  touched?: boolean;
  validationMessage?: string;
  className?: string;
  htmlFor?: string;
  successMessage?: string;
}

function MobileInputGroup({
  label,
  children,
  action,
  touched = false,
  validationMessage,
  actionSize = 'normal',
  isRequired = false,
  description,
  className,
  htmlFor,
  successMessage = '',
}: Props) {
  return (
    <Container className={className}>
      {(label || description) && (
        <LabelWrapper>
          <Label htmlFor={htmlFor}>
            {label}
            {isRequired && <Icon>*</Icon>}
          </Label>
          {description && <LabelDescription>{description}</LabelDescription>}
        </LabelWrapper>
      )}
      <InputContainer>
        <InputWrapper>{children}</InputWrapper>
        {action && <ActionWrapper size={actionSize}>{action}</ActionWrapper>}
      </InputContainer>
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
    </Container>
  );
}

export default memo(MobileInputGroup);
