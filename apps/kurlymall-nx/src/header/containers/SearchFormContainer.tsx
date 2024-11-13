import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../shared/store';
import { unsetUpdate } from '../../product/list/slice';

import SearchForm from '../components/SearchForm';
import { USER_MENU_PATH, getPageUrl } from '../../shared/constant';
import { redirectTo } from '../../shared/reducers/page';

interface Props {
  sticky: boolean;
  sword?: string;
}

export default function SearchFormContainer({ sword, sticky }: Props) {
  if (!sword) {
    sword = '';
  }

  const [searchValue, setSearchValue] = useState(sword);
  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useDispatch();
  const { site } = useAppSelector(({ main }) => main);

  const handleChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleClickDelete = useCallback(() => {
    setSearchValue('');
  }, []);

  const handleFocus = useCallback((value: boolean) => {
    setIsFocus(value);
  }, []);

  const handleClickSearch = useCallback(() => {
    dispatch(unsetUpdate(false));

    dispatch(
      redirectTo({
        url: getPageUrl(USER_MENU_PATH.search),
        query: {
          sword: searchValue,
          ...(site === 'BEAUTY' ? { site: 'beauty' } : {}),
        },
      }),
    );
  }, [dispatch, searchValue, site]);

  useEffect(() => {
    if (!sword) {
      return;
    }
    setSearchValue(sword);
  }, [sword]);

  return (
    <SearchForm
      site={site}
      sticky={sticky}
      searchWord={searchValue}
      isFocus={isFocus}
      onFocusInOut={handleFocus}
      onChange={handleChange}
      onClickDelete={handleClickDelete}
      onClickSearch={handleClickSearch}
    />
  );
}
