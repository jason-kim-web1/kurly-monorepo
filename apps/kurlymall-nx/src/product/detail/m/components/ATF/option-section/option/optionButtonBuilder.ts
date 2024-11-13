import styled from '@emotion/styled';

import COLOR from '../../../../../../../shared/constant/colorset';

const ImageOptionButton = styled.button<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  width: 90px;
  height: 122px;
  border-radius: 8px;
  border: 1px solid ${({ selected }) => (selected ? COLOR.kurlyPurple : COLOR.kurlyGray200)};
  outline: none;

  :first-of-type {
    margin-left: 16px;
  }

  :last-of-type {
    margin-right: 16px;
  }
`;

const TextOptionButton = styled.button<{ selected: boolean; isDisabled: boolean }>`
  padding: 9px 14px 10px;
  border-radius: 6px;
  border: 1px solid ${COLOR.kurlyGray200};
  ${({ selected }) => selected && `border: 1px solid ${COLOR.kurlyPurple};`};
  ${({ isDisabled }) => isDisabled && `background-color: ${COLOR.kurlyGray100};`};
  outline: none;

  &:first-of-type {
    margin-left: 16px;
  }

  &:last-of-type {
    margin-right: 16px;
  }
`;

export const getMWOptionButtonOfType = (buttonType: string) => {
  switch (buttonType) {
    case 'TEXT':
      return TextOptionButton;
    case 'IMAGE':
      return ImageOptionButton;
    default:
      return TextOptionButton;
  }
};
