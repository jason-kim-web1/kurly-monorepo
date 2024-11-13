import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import axios from 'axios';

import COLOR from '../../../shared/constant/colorset';

import { useAppSelector } from '../../../shared/store';

import RecentSearchedKeywordList from './RecentSearchedKeywordList';
import RecommendedKeywordList from './RecommendedKeywordList';
import MostSearchedKeywordList from './MostSearchedKeywordList';

import useRecentKeywords from '../../hooks/useRecentKeywords';
import { useSearchData } from '../../contexts/SearchDataProvider';
import { getKeywords } from '../../service/search.service';
import { KeywordsResponseData } from '../../../shared/api/search/keywords';

const Container = styled.div<{ isSearching: boolean }>`
  padding-top: ${({ isSearching }) => (isSearching ? '7px' : 0)};
  background-color: ${COLOR.kurlyWhite};
`;

const Section = styled.div`
  padding: 0 20px;
`;

interface Props {
  isSearching: boolean;
  onClickKeyword: (keyword: string) => void;
}

export default function Keywords({ isSearching, onClickKeyword }: Props) {
  const { site } = useSearchData();
  const [keywords, setKeywords] = useState<KeywordsResponseData>({
    recommendations: [],
    popularities: [],
  });
  const siteName = site ? site : 'MARKET';
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const { deleteRecentKeywords, deleteAllRecentKeywords, marketRecentKeywords, beautyRecentKeywords } =
    useRecentKeywords();

  const recentKeywords = site === 'BEAUTY' ? beautyRecentKeywords : marketRecentKeywords;

  const handleClickKeyword = (keyword: string) => {
    onClickKeyword(keyword);
  };

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (hasSession) {
      (async () => {
        try {
          const data = await getKeywords(siteName, source.token);
          setKeywords(data);
        } catch (error) {
          return error;
        }
      })();
    }

    return () => {
      source.cancel();
    };
  }, [hasSession, siteName]);

  return (
    <Container isSearching={isSearching}>
      <RecentSearchedKeywordList
        recentKeywords={recentKeywords}
        deleteRecentKeywords={deleteRecentKeywords}
        deleteAllRecentKeywords={() => deleteAllRecentKeywords(site)}
        onClickRecentKeyword={handleClickKeyword}
      />
      <Section>
        <RecommendedKeywordList
          recommendations={keywords.recommendations}
          onClickRecommendKeyword={handleClickKeyword}
        />
      </Section>
      <Section>
        <MostSearchedKeywordList popularities={keywords.popularities} onClickMostSearchedKeyword={handleClickKeyword} />
      </Section>
    </Container>
  );
}
