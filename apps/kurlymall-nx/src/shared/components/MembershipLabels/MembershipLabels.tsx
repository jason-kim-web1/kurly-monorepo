import { isEmpty } from 'lodash';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { isPC } from '../../../../util/window/getDevice';
import { MembershipLabel } from '../../interfaces';

const LabelWrapper = styled.ul`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  gap: 4px;
`;

const Label = styled.li<Omit<MembershipLabel, 'text'>>`
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 3px;
  font-size: 10px;
  line-height: 17px;
  white-space: nowrap;
  max-width: 88px;
  overflow: hidden;
  text-overflow: ellipsis;
  ${isPC
    ? css`
        padding: 0 6px 1px 5px;
        font-weight: 500;
      `
    : css`
        padding: 0 6px;
        font-weight: 600;
      `};
`;

interface Props {
  labels: MembershipLabel[];
  className?: string;
}

export default function MembershipLabels({ labels, className }: Props) {
  if (isEmpty(labels)) {
    return null;
  }

  return (
    <LabelWrapper className={className}>
      {labels.map((label, index) => (
        <Label key={`${label.text}-${index}`} {...label}>
          {label.text}
        </Label>
      ))}
    </LabelWrapper>
  );
}
