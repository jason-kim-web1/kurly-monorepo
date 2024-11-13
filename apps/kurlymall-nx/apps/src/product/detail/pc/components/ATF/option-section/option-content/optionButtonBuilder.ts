import styled from '@emotion/styled';

import COLOR from '../../../../../../../shared/constant/colorset';

const ImageOptionButton = styled.button<{ selected: boolean }>`
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 6px;
  border: 1px solid ${({ selected }) => (selected ? COLOR.kurlyPurple : COLOR.kurlyGray200)};
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextOptionButton = styled.button<{ selected: boolean; isDisabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  max-width: ${({ selected }) => (selected ? 'auto' : '98px')};
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${COLOR.kurlyGray200};
  ${({ selected }) => selected && `border: 1px solid ${COLOR.kurlyPurple}; font-weight: 500`};
  ${({ isDisabled }) => isDisabled && `background-color: ${COLOR.kurlyGray100};`};
  outline: none;
`;

export const getPCOptionButtonOfType = (buttonType: string) => {
  switch (buttonType) {
    case 'TEXT':
      return TextOptionButton;
    case 'IMAGE':
      return ImageOptionButton;
    default:
      return TextOptionButton;
  }
};
