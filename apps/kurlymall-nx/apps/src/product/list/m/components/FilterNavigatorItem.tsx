import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const InitialCharacterItem = styled.button<{ isSelected?: boolean }>`
  min-width: 31px;
  height: 31px;
  color: ${({ isSelected }) => (isSelected ? COLOR.kurlyWhite : COLOR.kurlyGray600)};
  background-color: ${({ isSelected }) => (isSelected ? COLOR.kurlyGray800 : COLOR.bgLightGray)};
  border-radius: 16px;
  white-space: nowrap;
  line-height: 20px;
  padding: 6px 9px 5px;
`;

interface Props {
  isSelected: boolean;
  initialCharacter: string;
}

export default function FilterNavigatorItem({ isSelected, initialCharacter }: Props) {
  return <InitialCharacterItem isSelected={isSelected}>{initialCharacter}</InitialCharacterItem>;
}
