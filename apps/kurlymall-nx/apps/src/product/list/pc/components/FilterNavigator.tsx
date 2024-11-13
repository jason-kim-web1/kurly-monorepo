import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';

import COLOR from '../../../../shared/constant/colorset';

const NAVIGATION_LIST_ITEM_MARGIN_BOTTOM = 4;

const NavigatorList = styled.menu<{ isDialog: boolean }>`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${({ isDialog }) => (isDialog ? `calc(21px - ${NAVIGATION_LIST_ITEM_MARGIN_BOTTOM}px)` : '12px')};
  row-gap: 4px;
  column-gap: ${({ isDialog }) => (isDialog ? '6px' : '2.5px')};
`;

const NavigatorListItem = styled.li`
  list-style-type: none;
`;

const NavigatorButton = styled.button<{ width: number; isActive: boolean }>`
  display: block;
  width: ${({ width }) => `${width}px`};
  padding-top: 2px;
  padding-bottom: 3px;
  border-radius: 2px;
  font-size: 13px;
  background-color: ${({ isActive }) => (isActive ? COLOR.kurlyGray800 : COLOR.bgLightGray)};
  font-weight: ${({ isActive }) => (isActive ? 500 : 400)};
  line-height: 17px;
  color: ${({ isActive }) => (isActive ? COLOR.kurlyWhite : COLOR.kurlyGray400)};
`;

interface Props {
  groupByInitialCharacterKeys: string[];
  onNavigatorKey: Dispatch<SetStateAction<{ key: string }>>;
  activeNavigatorKey: string;
  isDialog: boolean;
}

export default function FilterNavigator({
  groupByInitialCharacterKeys,
  onNavigatorKey,
  activeNavigatorKey,
  isDialog,
}: Props) {
  return (
    <NavigatorList isDialog={isDialog}>
      {groupByInitialCharacterKeys.map((key) => (
        <NavigatorListItem key={key}>
          <NavigatorButton
            type="button"
            onClick={() => onNavigatorKey({ key })}
            isActive={key === activeNavigatorKey}
            width={key.length === 1 ? 22 : 47}
          >
            {key}
          </NavigatorButton>
        </NavigatorListItem>
      ))}
    </NavigatorList>
  );
}
