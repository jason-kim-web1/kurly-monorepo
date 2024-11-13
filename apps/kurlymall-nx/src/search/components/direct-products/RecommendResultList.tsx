import styled from '@emotion/styled';

import { isEmpty, isUndefined } from 'lodash';
import Link from 'next/link';

import RawHTML from '../../../shared/components/layouts/RawHTML';

import COLOR from '../../../shared/constant/colorset';
import type { RecommendProduct } from '../../shared/types';
import { useAppSelector } from '../../../shared/store';
import { multiMaxLineText } from '../../../shared/utils';
import { handleDirectSearchKeywordAmplitude } from '../../shared/utils/sendDirectSearchKeywordAmplitude';
import { highlightSearchKeyword } from '../../shared/utils/highlightSearchKeyword';
import { getDirectSearchProductUrl } from '../../shared/utils/getDirectSearchUrl';
import { SELECT_SEARCH_SELECTION_TYPE } from '../../shared/constants';

const Container = styled.div`
  background-color: ${COLOR.kurlyWhite};
`;

const SuggestTitle = styled.p`
  margin: 16px 20px 0;
  height: 18px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.3px;
  color: ${COLOR.kurlyGray450};
`;

const SuggestedList = styled.ul`
  width: 100%;
  vertical-align: center;
  background-color: ${COLOR.kurlyWhite};
`;

const SuggestedGoodsContainer = styled.div<{ isNewProduct?: boolean }>`
  height: 44px;
  padding: 10px 20px;
  ${({ isNewProduct }) =>
    isNewProduct &&
    `
      margin-bottom: 4px;
      border-bottom: 1px solid ${COLOR.bg};
      padding: 10px 20px 15px;
  `};
`;

const SuggestedGoods = styled.div`
  display: flex;
  flex-direction: row;
`;

const NewSuggestedGoodsText = styled.div`
  width: 24px;
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 600;
  line-height: 13px;
  align-items: center;
  justify-content: center;
  color: ${COLOR.pointText};
  margin: 5px 8px 0 0;
`;

const SuggestedGoodsText = styled.div`
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.3px;
  color: ${COLOR.kurlyGray800};

  .target {
    font-weight: 600;
  }

  > div {
    ${multiMaxLineText(1)};
  }
`;

const SuggestedGoodsRank = styled.span`
  width: 24px;
  flex-shrink: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  margin-right: 8px;
  text-align: center;
  color: ${COLOR.loversWhite};
`;

interface Props {
  keyword: string;
  newProduct?: RecommendProduct;
  suggestions: RecommendProduct[];
}

export default function RecommendResultList({ keyword, newProduct, suggestions }: Props) {
  const queryId = useAppSelector(({ productList }) => productList.queryId);

  if (isEmpty(suggestions) && isUndefined(newProduct)) return null;

  return (
    <Container>
      <SuggestTitle>상품 바로가기</SuggestTitle>
      {isUndefined(newProduct) ? null : (
        <SuggestedGoodsContainer
          isNewProduct={true}
          onClick={() =>
            handleDirectSearchKeywordAmplitude({
              searchKeyword: keyword,
              queryId,
              selectionType: SELECT_SEARCH_SELECTION_TYPE.SUGGESTION_PRODUCT,
              suggestion: newProduct,
              directSearchType: 'new',
            })
          }
        >
          <Link href={getDirectSearchProductUrl(newProduct.no)}>
            <a href={getDirectSearchProductUrl(newProduct.no)}>
              <SuggestedGoods>
                <NewSuggestedGoodsText>NEW</NewSuggestedGoodsText>
                <SuggestedGoodsText>
                  <RawHTML html={highlightSearchKeyword(newProduct.name, keyword.trim())} />
                </SuggestedGoodsText>
              </SuggestedGoods>
            </a>
          </Link>
        </SuggestedGoodsContainer>
      )}
      <SuggestedList>
        {Object.values(suggestions).map((suggestion, index) => (
          <SuggestedGoodsContainer
            key={index}
            onClick={() =>
              handleDirectSearchKeywordAmplitude({
                searchKeyword: keyword,
                queryId,
                selectionType: SELECT_SEARCH_SELECTION_TYPE.SUGGESTION_PRODUCT,
                suggestion,
                directSearchType: 'ranking',
                position: index + 1,
              })
            }
          >
            <Link href={getDirectSearchProductUrl(suggestion.no)}>
              <a href={getDirectSearchProductUrl(suggestion.no)}>
                <SuggestedGoods>
                  <SuggestedGoodsRank>{index + 1}</SuggestedGoodsRank>
                  <SuggestedGoodsText>
                    <RawHTML html={highlightSearchKeyword(suggestion.name, keyword.trim())} />
                  </SuggestedGoodsText>
                </SuggestedGoods>
              </a>
            </Link>
          </SuggestedGoodsContainer>
        ))}
      </SuggestedList>
    </Container>
  );
}
