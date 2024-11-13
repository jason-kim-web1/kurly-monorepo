import styled from '@emotion/styled';

import { isEmpty } from 'lodash';
import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';

import COLOR from '../../../shared/constant/colorset';

import { useAppSelector } from '../../../shared/store';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectSearch } from '../../../shared/amplitude/events';
import NoDataMessage from './NoDataMessage';
import { Delete, QuestionMark } from '../../../shared/icons';
import { zIndex } from '../../../shared/styles';
import { multiMaxLineText } from '../../../shared/utils';
import { SEARCH_RESULT_SELECTION_TYPE, SELECT_SEARCH_SELECTION_TYPE } from '../../shared/constants';
import { setSearchSelectionType } from '../../../product/list/slice';

const TitleWrapper = styled.button`
  padding-top: 21px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
  align-items: center;
`;

const RecommendWrap = styled.span`
  position: relative;
  height: 14px;
  top: 1px;
  margin-left: 5px;
`;

const RecommendDetail = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-start;
  padding: 12px;
  justify-content: space-between;
  width: 219px;
  height: 56px;
  top: 20px;
  left: -94px;
  z-index: ${zIndex.productDetailListFilter};
  border: 1px solid ${COLOR.kurlyGray800};
  border-radius: 4px;
  background: ${COLOR.kurlyWhite};
  color: ${COLOR.kurlyGray600};
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
`;

const RecommendGuideText = styled.p`
  width: 169px;
  height: 32px;
  font-weight: 400;
  font-size: 12px;
  text-align: left;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const CancelButton = styled.button``;

const Subtitle = styled.div`
  margin-bottom: -1px;
  padding-top: 5px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const ProductList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 11px;
  background-color: ${COLOR.kurlyWhite};
`;

const PopularProducts = styled.li`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${COLOR.bg};
`;

const PopularProductButton = styled.button`
  display: flex;
  width: 100%;
  text-align: left;
`;

const PopularProductItem = styled.span`
  flex-shrink: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
  ${multiMaxLineText(1)};
`;

const PopularProductRank = styled.span`
  width: 20px;
  flex-shrink: 0;
  margin-right: 10px;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  color: ${COLOR.loversLavender};
`;

const RISING_KEYWORDS_MESSAGE = '중복 또는 유사 검색어를 조정하여 반영한 검색어입니다.';

function PopularKeywordsGuideMessage({ onClickClose }: { onClickClose: () => void }) {
  return (
    <RecommendDetail>
      <RecommendGuideText>{RISING_KEYWORDS_MESSAGE}</RecommendGuideText>
      <CancelButton onClick={onClickClose}>
        <Delete width={16} height={16} stroke={COLOR.kurlyGray800} fill={COLOR.kurlyGray800} />
      </CancelButton>
    </RecommendDetail>
  );
}

interface Props {
  popularities: string[];
  onClickMostSearchedKeyword: (keyword: string) => void;
}

export default function MostSearchedKeywordList({ popularities, onClickMostSearchedKeyword }: Props) {
  const [showPopularKeywordsGuideMessage, setShowPopularKeywordsGuideMessage] = useState(false);

  const dispatch = useDispatch();
  const queryId = useAppSelector(({ productList }) => productList.queryId);

  const handleClickCloseMessage = useCallback(() => {
    setShowPopularKeywordsGuideMessage(false);
  }, []);

  const handleClickMostSearchedKeyword = useCallback(
    (keyword: string) => {
      amplitudeService.logEvent(
        new SelectSearch({
          selectionType: SELECT_SEARCH_SELECTION_TYPE.RISING,
          keyword,
          queryId,
        }),
      );
      onClickMostSearchedKeyword(keyword);
      dispatch(setSearchSelectionType(SEARCH_RESULT_SELECTION_TYPE.RISING));
    },
    [onClickMostSearchedKeyword, dispatch],
  );

  return (
    <>
      <TitleWrapper onClick={() => setShowPopularKeywordsGuideMessage(!showPopularKeywordsGuideMessage)}>
        급상승 검색어
        <RecommendWrap>
          <QuestionMark height={14} stroke={COLOR.kurlyGray350} fill={COLOR.kurlyGray350} />
          {showPopularKeywordsGuideMessage && <PopularKeywordsGuideMessage onClickClose={handleClickCloseMessage} />}
        </RecommendWrap>
      </TitleWrapper>
      <Subtitle>최근 1시간 동안 검색 횟수가 급상승했어요</Subtitle>
      {isEmpty(popularities) ? (
        <NoDataMessage value="급상승 검색어가 없습니다." />
      ) : (
        <ProductList>
          {popularities.map((popularKeyword, index) => (
            <PopularProducts key={`${popularKeyword}-${index}}`}>
              <PopularProductButton onClick={() => handleClickMostSearchedKeyword(popularKeyword)}>
                <PopularProductRank>{index + 1}</PopularProductRank>
                <PopularProductItem>{popularKeyword}</PopularProductItem>
              </PopularProductButton>
            </PopularProducts>
          ))}
        </ProductList>
      )}
    </>
  );
}
