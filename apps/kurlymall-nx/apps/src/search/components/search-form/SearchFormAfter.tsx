import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef } from 'react';

import { isEmpty } from 'lodash';

import COLOR from '../../../shared/constant/colorset';

import { SearchIcon } from '../../../shared/images';
import DeleteIcon from '../../../shared/components/Button/DeleteButton';

import { MainSite } from '../../../main/interfaces/MainSection.interface';
import Alert from '../../../shared/components/Alert/Alert';

const Container = styled.div<{ isSearchResult: boolean }>`
  position: absolute;
  right: 0;
  width: calc(100% - 49px);
  padding: 4px 16px 4px 0;
  background-color: ${COLOR.kurlyWhite};
  ${({ isSearchResult }) =>
    isSearchResult &&
    css`
      right: 80px;
      width: calc(100% - 129px);
    `};
`;

const SearchFormContainer = styled.div`
  display: flex;
  height: 36px;
  width: 100%;
  border-radius: 6px;
  position: relative;
  align-items: center;
  background-color: ${COLOR.bg};
`;

const SearchButton = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  margin: 11px 12px 12px 11px;
  background: url(${SearchIcon}) 50% 50% no-repeat;
  background-size: cover;
`;

const DeleteButton = styled(DeleteIcon)`
  width: 16px;
  height: 16px;
  margin-left: 20px;
  background-size: 16px 16px;
`;

const styles = {
  input: {
    width: '100%',
    border: 'none',
    outline: 'none',
    fontWeight: 600,
    fontSize: '16px',
    letterSpacing: '-.05em',
    backgroundColor: COLOR.bg,
    paddingRight: '40px',
    caretColor: COLOR.kurlyGray800,

    ':hover': {
      cursor: 'text',
    },

    '::placeholder': {
      fontWeight: 400,
      color: COLOR.kurlyGray450,
      opacity: 1,
    },
  },
};

interface Props {
  site: MainSite;
  searchWord: string;
  isSearching: boolean;
  onChange: (value: string) => void;
  onClickSearch: (value: string) => void;
  onFocusEvent: (value: boolean) => void;
  onClickDelete: () => void;
  isSearchResult: boolean;
}

export default function SearchFormAfter({
  site,
  searchWord,
  isSearching,
  onChange,
  onClickSearch,
  onClickDelete,
  isSearchResult,
  onFocusEvent,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const placeholder = site === 'MARKET' ? '검색어를 입력해 주세요' : '뷰티 상품을 검색하세요';

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      onChange(target.value);
    },
    [onChange],
  );

  const handleClickDelete = useCallback(() => {
    onClickDelete();
    inputRef.current?.focus();
  }, [onClickDelete]);

  const handlePressEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') {
        return;
      }

      if (isEmpty(searchWord.trim())) {
        Alert({
          text: '검색어를 입력해주세요.',
        });
        return;
      }

      e.preventDefault();
      onClickSearch(searchWord);
      inputRef.current?.blur();
    },
    [onClickSearch, searchWord],
  );

  useEffect(() => {
    if (isSearching && !isSearchResult) {
      inputRef.current?.focus();
    }
  }, [isSearchResult, isSearching]);

  return (
    <Container isSearchResult={isSearchResult}>
      <SearchFormContainer>
        <SearchButton />
        <input
          css={styles.input}
          onKeyPress={handlePressEnter}
          placeholder={placeholder}
          value={searchWord}
          onChange={handleChange}
          onFocus={() => onFocusEvent(true)}
          onBlur={() => onFocusEvent(false)}
          ref={inputRef}
          type={'text'}
          enterKeyHint="search"
          required
        />
        {searchWord && (
          <DeleteButton
            onClick={handleClickDelete}
            id="delete-search-keyword"
            ariaLabel="delete-search-keyword"
            size={16}
          />
        )}
      </SearchFormContainer>
    </Container>
  );
}
