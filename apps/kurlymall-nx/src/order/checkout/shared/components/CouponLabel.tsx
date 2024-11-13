import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { vars } from '@thefarmersfront/kpds-css';

import { isEmpty } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';

const Label = styled.li<{ disabled: boolean }>`
  width: fit-content;
  line-height: 17px;
  padding: ${vars.spacing.$0} ${vars.spacing.$6};
  color: ${COLOR.kurlyGray700};
  background-color: ${COLOR.kurlyGray200};
  border-radius: 3px;
  font-size: ${vars.fontSize.$10};
  font-weight: 600;
  flex-shrink: 0;

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${COLOR.kurlyGray400};
    `};
`;

const PurpleLabel = styled(Label)<{ disabled: boolean }>`
  background-color: ${COLOR.loversWhite};
  color: ${COLOR.kurlyWhite};

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${COLOR.loversFriends};
      color: ${COLOR.kurlyGray100};
    `}
`;

interface Props {
  labelText: string;
  disabled: boolean;
  isPurpleLabel?: boolean;
}

export const CouponLabel = ({ labelText, disabled, isPurpleLabel }: Props) => {
  if (isEmpty(labelText)) return null;

  if (isPurpleLabel) {
    return <PurpleLabel disabled={disabled}>{labelText}</PurpleLabel>;
  }

  return <Label disabled={disabled}>{labelText}</Label>;
};
