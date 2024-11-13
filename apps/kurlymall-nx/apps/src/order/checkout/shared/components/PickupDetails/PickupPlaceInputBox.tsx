import { css } from '@emotion/react';

import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import DeleteButton from '../../../../../shared/components/Button/DeleteButton';
import { isPC } from '../../../../../../util/window/getDevice';
import { PickupDeleteIcon, PickupSearchIcon } from '../../../../../shared/images';

const style = css`
  width: 100%;
  border: none;
  outline: none;
  font-weight: 600;
  font-size: 16px;
  background-color: #f2f5f8;
  margin-right: 44px;
  text-overflow: ellipsis;

  ::placeholder {
    color: #848f9a;
    font-weight: 400;
  }

  ${isPC &&
  css`
    font-weight: 500;
  `}
`;

const InputWrapper = styled.div`
  display: flex;
  height: 44px;
  width: 100%;
  border-radius: 6px;
  position: relative;
  align-items: center;
  background-color: #f2f5f8;
`;

const SearchButton = styled.div`
  position: relative;
  min-width: 16px;
  height: 16px;
  margin: 0 10px 0 12px;
  background: url(${PickupSearchIcon}) 50% 50% no-repeat;
  background-size: cover;
`;

const StyledDeleteButton = styled(DeleteButton)`
  right: 14px;
`;

interface Props {
  place: string;
  onFocus: () => void;
  searchPickupPlace: (value: string) => void;
}

export default function PickupPlaceInputBox({ place, onFocus, searchPickupPlace }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const placeholder = '매장 검색 (ex.강남)';

  const handlePressEnter = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') {
        return;
      }

      if (isEmpty(place.trim())) {
        return;
      }

      event.preventDefault();
      searchPickupPlace(place);
      inputRef.current?.blur();
    },
    [searchPickupPlace, place],
  );

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      searchPickupPlace(target.value);
    },
    [searchPickupPlace],
  );

  const handleDelete = useCallback(() => {
    searchPickupPlace('');
    inputRef.current?.focus();
  }, [searchPickupPlace]);

  const handleFocus = useCallback(() => {
    onFocus();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [onFocus]);

  // input 외부 영역 클릭 시 키보드 비활성화
  useEffect(() => {
    const handleClickOutside = (event: TouchEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        inputRef.current.blur();
      }
    };

    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <InputWrapper>
      <SearchButton />
      <input
        id="input-search-place"
        name="search-place"
        aria-label="search-place"
        type="text"
        enterKeyHint="search"
        autoComplete="off"
        css={style}
        ref={inputRef}
        placeholder={placeholder}
        value={place}
        onFocus={() => handleFocus()}
        onChange={handleChange}
        onKeyPress={handlePressEnter}
      />
      {place && (
        <StyledDeleteButton
          id="delete-place-keyword"
          ariaLabel="delete-place-keyword"
          deleteIcon={PickupDeleteIcon}
          onClick={handleDelete}
        />
      )}
    </InputWrapper>
  );
}
