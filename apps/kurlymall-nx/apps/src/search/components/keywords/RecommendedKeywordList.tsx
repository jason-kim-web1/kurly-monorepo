import styled from '@emotion/styled';

import { isEmpty } from 'lodash';
import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import COLOR from '../../../shared/constant/colorset';

import { useAppSelector } from '../../../shared/store';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectSearch } from '../../../shared/amplitude/events';
import NoDataMessage from './NoDataMessage';
import { SEARCH_RESULT_SELECTION_TYPE, SELECT_SEARCH_SELECTION_TYPE } from '../../shared/constants';
import { setSearchSelectionType } from '../../../product/list/slice';

const Title = styled.div`
  padding-top: 9px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
`;

const ProductList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% + 8px);
  padding-top: 17px;
  background-color: ${COLOR.kurlyWhite};
`;

const RecommendedProducts = styled.li`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  max-width: 100%;
  margin: 0 8px 12px 0;
`;

const ProductButton = styled.button`
  overflow: hidden;
  max-width: 100%;
  padding: 9px 15px 9px 14px;
  height: 36px;
  font-size: 14px;
  line-height: 18px;
  background-color: ${COLOR.filterPurple};
  color: ${COLOR.loversLavender};
  border-radius: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const NoDataWrapper = styled(NoDataMessage)`
  padding-bottom: 13px;
`;

interface Props {
  recommendations: string[];
  onClickRecommendKeyword: (keyword: string) => void;
}

export default function RecommendedKeywordList({ recommendations, onClickRecommendKeyword }: Props) {
  const dispatch = useDispatch();
  const queryId = useAppSelector(({ productList }) => productList.queryId);

  const handleClickRecommendKeyword = useCallback(
    (recentSearchItem: string) => {
      amplitudeService.logEvent(
        new SelectSearch({
          selectionType: SELECT_SEARCH_SELECTION_TYPE.RECOMMENDATION,
          keyword: recentSearchItem,
          queryId,
        }),
      );
      onClickRecommendKeyword(recentSearchItem);
      dispatch(setSearchSelectionType(SEARCH_RESULT_SELECTION_TYPE.RECOMMENDATION));
    },
    [onClickRecommendKeyword, dispatch],
  );

  return (
    <>
      <Title>추천 검색어</Title>
      {isEmpty(recommendations) ? (
        <NoDataWrapper value="추천 검색어가 없습니다." />
      ) : (
        <ProductList>
          {recommendations.map((recommendation, index) => (
            <RecommendedProducts key={`${recommendation}-${index}}`}>
              <ProductButton onClick={() => handleClickRecommendKeyword(recommendation)}>
                {recommendation}
              </ProductButton>
            </RecommendedProducts>
          ))}
        </ProductList>
      )}
    </>
  );
}
