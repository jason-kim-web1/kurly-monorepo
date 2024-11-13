import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../constant/colorset';
import gradeStyle from '../../../../constant/gradeStyle';

import { Grade } from '../../enums';

const Icon = styled.span<{ grade: Grade; isSubscribed: boolean }>`
  display: inline-block;
  min-width: 44px;
  height: 16px;
  margin-right: 6px;
  padding: 0 4px;
  border-radius: 30px;
  font-size: 10px;
  color: ${COLOR.kurlyWhite};
  line-height: 14px;
  text-align: center;
  letter-spacing: -0.3px;
  vertical-align: 0;
  ${({ grade }) => gradeStyle[grade]};
  ${({ isSubscribed }) =>
    isSubscribed &&
    css`
      border-color: ${COLOR.kurlymembers};
      background-color: ${COLOR.kurlymembers};
      color: ${COLOR.kurlyWhite};
    `};
`;

interface Props extends HTMLAttributes<HTMLSpanElement> {
  grade: Grade;
  gradeName: string;
  isSubscribed: boolean;
}

export default function GradeIcon({ grade, gradeName, isSubscribed, ...props }: Props) {
  return (
    <Icon grade={grade} isSubscribed={isSubscribed} {...props}>
      {gradeName}
    </Icon>
  );
}
