import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { RefObject } from 'react';

import { MdChoicesOption } from '../../../interfaces/MainSection.interface';
import COLOR from '../../../../shared/constant/colorset';

const List = styled.ul`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-snap-type: none;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.li<{ selected: boolean }>`
  margin-left: 16px;

  button {
    display: block;
    font-size: 14px;
    line-height: 18px;
    padding: 13px 0 11px;
    ${({ selected }) =>
      selected
        ? css`
            color: ${COLOR.mainPurple};
            font-weight: 600;
            border-bottom: 2px solid ${COLOR.mainPurple};
          `
        : css`
            color: ${COLOR.mainSecondary};
          `}
  }
`;

interface Props {
  listRef: RefObject<HTMLUListElement>;
  options: MdChoicesOption[];
  selectedOption?: MdChoicesOption;

  changeOption(code: string): void;
}

export default function MdOptionList({ listRef, options, changeOption, selectedOption }: Props) {
  const handleChangeOption = (code: string) => {
    if (selectedOption?.loading) {
      return;
    }
    changeOption(code);
  };

  return (
    <List ref={listRef}>
      {options.map(({ name, code }) => (
        <Item key={code} id={code} selected={code === selectedOption?.code}>
          <button onClick={() => handleChangeOption(code)}>
            <span>{name}</span>
          </button>
        </Item>
      ))}
    </List>
  );
}
