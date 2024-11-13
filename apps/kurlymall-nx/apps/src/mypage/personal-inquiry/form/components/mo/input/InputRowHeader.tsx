import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

const InputLabel = styled.div`
  font-size: 0.875rem;
  margin-top: 22px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const RequiredText = styled.span`
  color: ${COLOR.pointText};
  vertical-align: sub;
`;

interface Props {
  label: string;
  required?: boolean;
}

export default function InputRowHeader({ label, required = false }: Props) {
  return (
    <InputLabel>
      <span>
        {label}
        {required && <RequiredText> *</RequiredText>}
      </span>
    </InputLabel>
  );
}
