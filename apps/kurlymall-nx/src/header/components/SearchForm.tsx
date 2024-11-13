import { ChangeEvent, KeyboardEvent, MouseEvent, useRef } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useDispatch } from 'react-redux';

import { mq, zIndex } from '../../shared/styles';
import COLOR from '../../shared/constant/colorset';
import { Find30x30x333, HeaderSearchIcon } from '../../shared/images';
import DeleteIcon from '../../shared/components/Button/DeleteButton';
import { MainSite } from '../../main/interfaces/MainSection.interface';
import { amplitudeService } from '../../shared/amplitude';
import { SelectSearch } from '../../shared/amplitude/events';
import { useAppSelector } from '../../shared/store';
import { SEARCH_RESULT_SELECTION_TYPE, SELECT_SEARCH_SELECTION_TYPE } from '../../search/shared/constants';
import { setSearchSelectionType } from '../../product/list/slice';
import Alert from '../../shared/components/Alert/Alert';
import { checkEmptySearchKeyword } from '../../search/shared/utils/checkEmptySearchKeyword';

const SearchArea = styled.div`
  position: relative;
  width: 1050px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 300px;
  background-color: inherit;
  border: none;
  outline: none;
  font-size: 16px;
  letter-spacing: -0.33px;
  :hover {
    cursor: text;
  }
  :focus {
    background-color: ${COLOR.kurlyWhite};
  }
  ::placeholder {
    color: ${COLOR.kurlyGray450};
    opacity: 1;
  }
  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px ${COLOR.kurlyWhite} inset;
    -webkit-text-fill-color: ${COLOR.kurlyGray800};
  }
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const SearchDeleteIcon = styled(DeleteIcon)`
  width: 16px;
  height: 16px;
  right: 47px;
  margin-left: 20px;
  background-size: 16px 16px;
`;

const SearchFormContainer = styled.div<{ isSticky: boolean; isFocus: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 325px;
  top: -55px;
  width: 400px;
  height: 48px;
  padding-left: 14px;
  border: solid 1px ${COLOR.kurlyPurple};
  border-radius: 6px;
  background-color: ${COLOR.kurlyWhite};
  box-shadow: inset 0 0 0 1px ${COLOR.bgLightGray};
  ${({ isSticky, isFocus }) =>
    isSticky &&
    css`
      position: fixed;
      z-index: ${zIndex.globalNavigationBarItem};
      left: 50%;
      top: 10px;
      width: 242px;
      height: 36px;
      margin-left: 120px;
      border: none;
      background-color: ${isFocus ? COLOR.kurlyWhite : COLOR.bgLightGray};
      ${Input} {
        width: 193px;
        padding-right: 22px;
        font-weight: 400;
        font-size: 12px;
        color: ${COLOR.kurlyGray800};
        line-height: 18px;
        :-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px ${isFocus ? COLOR.kurlyWhite : COLOR.bgLightGray} inset;
        }
      }
      ${SearchDeleteIcon} {
        right: 35px;
        top: 20px;
        background-size: 12px 12px;
      }
      ${mq({
        left: ['1050px', '50%'],
        marginLeft: ['-405px', '120px'],
      })}
    `};
`;

const SearchButton = styled.button<{ isSticky: boolean }>`
  position: relative;
  width: 30px;
  height: 30px;
  margin: 10px;
  ${({ isSticky }) =>
    isSticky
      ? css`
          top: 0;
          width: 40px;
          margin-right: -5px;
          background: url(${Find30x30x333}) 0 0 no-repeat;
        `
      : css`
          bottom: 3px;
          background: url(${HeaderSearchIcon}) 0 0 no-repeat;
        `};
`;

interface Props {
  site: MainSite;
  sticky: boolean;
  isFocus: boolean;
  searchWord: string;
  onChange: (value: string) => void;
  onFocusInOut: (value: boolean) => void;
  onClickDelete: () => void;
  onClickSearch: (value: string) => void;
}

export default function SearchForm({
  site,
  searchWord,
  sticky,
  isFocus,
  onFocusInOut,
  onChange,
  onClickDelete,
  onClickSearch,
}: Props) {
  const placeholder = site === 'MARKET' ? '검색어를 입력해주세요' : '뷰티 상품을 검색하세요';

  const dispatch = useDispatch();
  const queryId = useAppSelector(({ productList }) => productList.queryId);
  const searchInputFocus = useRef<HTMLInputElement | null>(null);

  const searchAmplitudeEvent = () => {
    amplitudeService.logEvent(
      new SelectSearch({
        selectionType: SELECT_SEARCH_SELECTION_TYPE.KEYWORD,
        keyword: searchWord,
        queryId,
      }),
    );
  };

  const notifyEmptySearchWord = () => {
    Alert({ text: '검색어를 입력해주세요.' }).then(() => {
      if (searchInputFocus.current) {
        searchInputFocus.current.focus();
      }
    });
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  };

  const handleClickDelete = () => {
    onClickDelete();
  };

  const handleClickSearch = (e: MouseEvent) => {
    if (checkEmptySearchKeyword(searchWord)) {
      notifyEmptySearchWord();
      return;
    }
    e.stopPropagation();
    searchAmplitudeEvent();
    onClickSearch(searchWord);
    dispatch(setSearchSelectionType(SEARCH_RESULT_SELECTION_TYPE.KEYWORD));
  };

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (checkEmptySearchKeyword(searchWord)) {
        notifyEmptySearchWord();
        return;
      }
      searchAmplitudeEvent();
      onClickSearch(searchWord);
      dispatch(setSearchSelectionType(SEARCH_RESULT_SELECTION_TYPE.KEYWORD));
    }
  };

  const handleFocus = () => {
    onFocusInOut(true);
  };

  const handleBlur = () => {
    onFocusInOut(false);
  };

  return (
    <SearchArea>
      <SearchFormContainer isSticky={sticky} isFocus={isFocus}>
        <Input
          id="gnb_search"
          ref={searchInputFocus}
          onKeyPress={handlePressEnter}
          placeholder={placeholder}
          value={searchWord}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
        />
        {searchWord && (
          <SearchDeleteIcon onClick={handleClickDelete} id="delete-search-keyword" ariaLabel="delete-search-keyword" />
        )}
        <SearchButton id="submit" aria-label="submit" isSticky={sticky} onClick={handleClickSearch} />
      </SearchFormContainer>
    </SearchArea>
  );
}
