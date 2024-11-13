import { useFeatureValue, useGrowthBook } from '@growthbook/growthbook-react';

import { useEffect, useState } from 'react';

import axios from 'axios';

import AutoCompletedKeywordList from './AutoCompletedKeywordList';
import RecommendResultList from './RecommendResultList';
import { amplitudeService } from '../../../shared/amplitude';
import { SetUpExperimentEnv } from '../../../shared/amplitude/events/SetUpExperimentEnv';
import { useSearchData } from '../../contexts/SearchDataProvider';
import { AutoCompletedKeyword, RecommendProduct } from '../../shared/types';
import { getSuggestedKeywords } from '../../service/search.service';
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue';

type FeatureType = 'A' | 'B' | 'OFF';

interface Props {
  keyword: string;
}

const GROWTHBOOK_FEATURE_KEY = 'keyword-auto-completes' as const;

export default function DirectSearchProducts({ keyword }: Props) {
  const { site } = useSearchData();
  const gb = useGrowthBook();
  const featureValue = useFeatureValue<FeatureType>(GROWTHBOOK_FEATURE_KEY, 'OFF');
  const [autocompletedKeywords, setAutocompletedKeywords] = useState<AutoCompletedKeyword[]>([]);
  const [newProduct, setNewProduct] = useState<RecommendProduct>();
  const [suggestions, setSuggestions] = useState<RecommendProduct[]>([]);
  const searchKeyword = useDebouncedValue(keyword, 100);

  useEffect(() => {
    if (!gb?.ready) return;

    const feature = gb?.evalFeature(GROWTHBOOK_FEATURE_KEY);
    if (!feature.experiment || !feature?.experimentResult) return;

    amplitudeService.logEvent(
      new SetUpExperimentEnv({
        experimentId: feature.experiment.key,
        variationId: `${feature.experimentResult.variationId}`,
      }),
    );
  }, [gb]);

  useEffect(() => {
    // TODO: axios version이 낮아서 과거의 방식으로 구현했습니다.
    // axios version update시 수정이 진행되어야 합니다.
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (!searchKeyword) {
      return;
    }

    (async () => {
      try {
        const {
          autoCompleteKeywords: autoCompletes,
          newProduct: suggestedNewProduct,
          products,
        } = await getSuggestedKeywords(encodeURIComponent(searchKeyword.trim()), site, source.token);
        setAutocompletedKeywords(autoCompletes);
        setNewProduct(suggestedNewProduct);
        setSuggestions(products);
      } catch (error) {
        return error;
      }
    })();

    return () => {
      source.cancel();
    };
  }, [searchKeyword, site]);

  /*
   * NOTE: 검색어 자동 완성 실험 구분
   * - case 1-1 (A, 실험군): 상품 바로가기 + 검색어 자동 완성 노출
   * - case 1-2 (B, 실험군): 검색어 자동 완성 노출
   * - case 2 (OFF, 대조군): 상품 바로가기 노출
   * */

  switch (featureValue) {
    case 'A':
      return (
        <>
          <AutoCompletedKeywordList keyword={searchKeyword} autocompletedKeywords={autocompletedKeywords} />
          <RecommendResultList keyword={searchKeyword} newProduct={newProduct} suggestions={suggestions} />
        </>
      );
    case 'B':
      return <AutoCompletedKeywordList keyword={searchKeyword} autocompletedKeywords={autocompletedKeywords} />;
    case 'OFF':
      return <RecommendResultList keyword={searchKeyword} newProduct={newProduct} suggestions={suggestions} />;
  }

  return <RecommendResultList keyword={searchKeyword} newProduct={newProduct} suggestions={suggestions} />;
}
