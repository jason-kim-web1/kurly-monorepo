import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { ChangeEvent } from 'react';

import SearchIcon from '../../../../../../../../shared/components/icons/SearchIcon';
import DeleteIcon from '../../../../../../../../shared/components/Button/DeleteButton';
import COLOR from '../../../../../../../../shared/constant/colorset';
import { isPC } from '../../../../../../../../../util/window/getDevice';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
`;

const UserInput = styled.input<{ isPc: boolean }>`
  border: none;
  background-color: #f7f7f7;
  width: 90%;

  ::placeholder {
    color: ${({ isPc }) => (isPc ? COLOR.kurlyGray450 : COLOR.placeholder)};
  }

  :focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  margin-left: 8px;
`;

const searchIconStyle = css`
  width: 30px;
  height: 30px;
`;

const deleteIconStyle = css`
  position: relative;
  transform: none;
  right: 0;
  top: 0;
  height: 17px;
  width: 17px;
  background-size: 16px 16px;
`;

interface Props {
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onDelete(): void;
  onSearch(): void;
  placeholder: string;
  inputValue?: string;
  displaySearchIcon?: boolean;
}

export default function KeywordSearchUserInput({
  onChange,
  onDelete,
  onSearch,
  placeholder,
  inputValue,
  displaySearchIcon = false,
}: Props) {
  return (
    <Container>
      <UserInput isPc={isPC} type="text" onChange={onChange} placeholder={placeholder} value={inputValue} />
      {inputValue && (
        <DeleteIcon
          className="keyword-delete-icon"
          css={deleteIconStyle}
          onClick={onDelete}
          size={16}
          id="delete-search-keyword"
          ariaLabel="delete-search-keyword"
        />
      )}
      <SearchButton type="submit" onClick={onSearch}>
        {displaySearchIcon && <SearchIcon css={searchIconStyle} />}
      </SearchButton>
    </Container>
  );
}
