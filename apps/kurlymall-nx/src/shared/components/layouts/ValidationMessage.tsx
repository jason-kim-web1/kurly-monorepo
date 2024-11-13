import { memo } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../constant/colorset';
import { Arrow10x10237cd8, Cancel10x10f03f40 } from '../../images';

const ErrorMessage = styled.p`
  font-size: 12px;
  color: ${COLOR.invalidRed};
  line-height: 18px;
  letter-spacing: -0.3px;

  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 4px 0 2px;
    background: url(${Cancel10x10f03f40}) no-repeat;
    vertical-align: 0;
  }
`;

const SuccessMessage = styled.p`
  font-size: 12px;
  color: ${COLOR.validBlue};
  line-height: 18px;
  letter-spacing: -0.3px;

  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 4px 0 2px;
    background: url(${Arrow10x10237cd8}) no-repeat;
    vertical-align: 0;
  }
`;

const Message = styled.div`
  font-size: 12px;
  color: #666666;
  line-height: 18px;
  letter-spacing: -0.3px;

  &:before {
    content: '•';
    display: inline-block;
    padding: 0 4px 0 2px;
    font-size: 12px;
    vertical-align: 0;
  }
`;

interface Props {
  visited?: boolean;
  touched?: boolean;
  dirty?: boolean;
  message?: string;
  errorMessage?: string;
}

function ValidationMessage({ visited = false, touched = false, dirty = false, message = '', errorMessage }: Props) {
  if (!visited) {
    return null;
  }

  if (!touched && !dirty && message) {
    return <Message>{message}</Message>;
  }

  if (errorMessage) {
    return <ErrorMessage>{errorMessage}</ErrorMessage>;
  }

  return <SuccessMessage>{message}</SuccessMessage>;
}

export default memo(ValidationMessage);
