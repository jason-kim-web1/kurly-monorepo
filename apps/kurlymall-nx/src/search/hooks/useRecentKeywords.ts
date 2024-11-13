import { uniq } from 'lodash';

import { useCallback } from 'react';

import { useLocalStorage } from '../../shared/hooks';
import { MainSite } from '../../main/interfaces/MainSection.interface';

const MAX_NUMBER_OF_RECENT_KEYWORD = 10;

export default function useRecentKeywords() {
  const [marketRecentKeywords, setMarketRecentKeywords] = useLocalStorage<string[]>({
    key: 'recent-keywords',
    initialState: [],
  });
  const [beautyRecentKeywords, setBeautyRecentKeywords] = useLocalStorage<string[]>({
    key: 'beauty-recent-keywords',
    initialState: [],
  });

  const updateAddedRecentKeyword = (newKeyword: string, previousRecentKeywords: string[]) => {
    return uniq([newKeyword, ...previousRecentKeywords]).slice(0, MAX_NUMBER_OF_RECENT_KEYWORD);
  };

  const addRecentKeyword = useCallback(
    (newKeyword: string, site: MainSite) => {
      const previousRecentKeywords = site === 'MARKET' ? marketRecentKeywords : beautyRecentKeywords;
      const newRecentKeywords = updateAddedRecentKeyword(newKeyword, previousRecentKeywords);

      if (site === 'BEAUTY') {
        setBeautyRecentKeywords(newRecentKeywords);
      } else {
        setMarketRecentKeywords(newRecentKeywords);
      }
    },
    [marketRecentKeywords, setMarketRecentKeywords, beautyRecentKeywords, setBeautyRecentKeywords],
  );

  const updateDeletedRecentKeyword = (previousKeyword: string, previousRecentKeywords: string[]) => {
    return [...previousRecentKeywords.filter((item) => item !== previousKeyword)];
  };

  const deleteRecentKeywords = useCallback(
    (previousKeyword: string, site: MainSite) => {
      const previousRecentKeywords = site === 'MARKET' ? marketRecentKeywords : beautyRecentKeywords;
      const newRecentKeywords = updateDeletedRecentKeyword(previousKeyword, previousRecentKeywords);

      if (site === 'BEAUTY') {
        setBeautyRecentKeywords(newRecentKeywords);
      } else {
        setMarketRecentKeywords(newRecentKeywords);
      }
    },
    [marketRecentKeywords, setMarketRecentKeywords, beautyRecentKeywords, setBeautyRecentKeywords],
  );

  const deleteAllRecentKeywords = useCallback(
    (site: MainSite) => {
      if (site === 'BEAUTY') {
        setBeautyRecentKeywords(() => []);
      } else {
        setMarketRecentKeywords(() => []);
      }
    },
    [setMarketRecentKeywords, setBeautyRecentKeywords],
  );

  return {
    marketRecentKeywords,
    beautyRecentKeywords,
    addRecentKeyword,
    deleteRecentKeywords,
    deleteAllRecentKeywords,
  };
}
