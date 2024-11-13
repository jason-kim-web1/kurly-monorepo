import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import type { ProductCollectionGroups } from '../../types';
import COLOR from '../../../../shared/constant/colorset';

const MenuList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 180px);
  grid-gap: 16px 83px;
  gap: 16px 83px;
  overflow: hidden;
  margin-top: 28px;
  padding: 30px 40px;
  border: 1px solid ${COLOR.kurlyGray250};
  line-height: 20px;
`;

const MenuItem = styled.li`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MenuLink = styled.a<{ isCurrent: boolean }>`
  letter-spacing: -1px;
  cursor: pointer;
  ${({ isCurrent }) => isCurrent && `font-weight: 700; color: ${COLOR.kurlyPurple};`}
  &:hover {
    font-weight: 700;
    color: ${COLOR.kurlyPurple};
  }
`;

interface Props {
  code: string;
  groups: ProductCollectionGroups[];
  setCollectionCode: (code: string) => void;
  onAmplitude: (groupCode: string) => void;
}

export default function MenuCollections({ code, groups, setCollectionCode, onAmplitude }: Props) {
  const handleClick = (groupCode: string) => {
    onAmplitude(groupCode);
    setCollectionCode(groupCode);
  };

  return !isEmpty(groups) ? (
    <MenuList>
      {groups.map(({ code: groupCode, title: groupTitle }) => (
        <MenuItem key={groupCode}>
          <MenuLink isCurrent={groupCode === code} onClick={() => handleClick(groupCode)}>
            {groupTitle}
          </MenuLink>
        </MenuItem>
      ))}
    </MenuList>
  ) : null;
}
