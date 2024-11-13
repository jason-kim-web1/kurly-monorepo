import styled from '@emotion/styled';

import { Icon } from '@thefarmersfront/kpds-react';

import { isEmpty } from 'lodash';

import { useDispatch } from 'react-redux';

import COLOR from '../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../shared/utils';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import { highlightSearchKeyword } from '../../shared/utils/highlightSearchKeyword';
import { handleDirectSearchKeywordAmplitude } from '../../shared/utils/sendDirectSearchKeywordAmplitude';
import { SELECT_SEARCH_SELECTION_TYPE } from '../../shared/constants';
import { useAppSelector } from '../../../shared/store';
import type { AutoCompletedKeyword } from '../../shared/types';
import { setSearchSelectionType } from '../../../product/list/slice';
import { redirectTo } from '../../../shared/reducers/page';
import { useSearchData } from '../../contexts/SearchDataProvider';
import { getPageUrl, USER_MENU_PATH } from '../../../shared/constant';

const AutocompletedKeywordList = styled.ul`
  width: 100%;
  margin-top: 4px;
  vertical-align: center;
  background-color: ${COLOR.kurlyWhite};
`;

const Container = styled.div`
  height: 48px;
  padding: 12px 20px;
`;

const AutocompletedKeywordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const SearchIconWrapper = styled.div`
  margin: 3px;
  display: inline-block;
`;

const AutocompletedKeyword = styled.div`
  height: 20px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.3px;
  color: ${COLOR.benefitGray};

  .target {
    font-weight: 400;
  }

  > div {
    ${multiMaxLineText(1)};
  }
`;

interface Props {
  keyword: string;
  autocompletedKeywords: AutoCompletedKeyword[];
}

function AutoCompletedKeywordList({ keyword, autocompletedKeywords }: Props) {
  const { site } = useSearchData();

  const dispatch = useDispatch();
  const queryId = useAppSelector(({ productList }) => productList.queryId);

  const handleClickAutocompletedKeyword = (searchKeyword: string, autocompleteKeyword: string) => {
    handleDirectSearchKeywordAmplitude({
      searchKeyword,
      autocompleteKeyword,
      queryId,
      selectionType: SELECT_SEARCH_SELECTION_TYPE.AUTOCOMPLETE,
    });
    dispatch(setSearchSelectionType(SELECT_SEARCH_SELECTION_TYPE.AUTOCOMPLETE));

    const url = getPageUrl(USER_MENU_PATH.search);

    dispatch(
      redirectTo({
        url,
        query: {
          sword: autocompleteKeyword,
          ...(site === 'BEAUTY' ? { site: 'beauty' } : {}),
        },
      }),
    );
  };

  if (isEmpty(autocompletedKeywords)) return null;

  return (
    <AutocompletedKeywordList>
      {Object.values(autocompletedKeywords).map(({ keyword: autocompletedKeyword }, index) => (
        <Container
          key={index}
          onClick={() => {
            handleClickAutocompletedKeyword(keyword, autocompletedKeyword);
          }}
        >
          <AutocompletedKeywordContainer>
            <SearchIconWrapper>
              <Icon type="Search" size={18} ratio="1:1" fill={COLOR.mainReview} />
            </SearchIconWrapper>
            <AutocompletedKeyword>
              <RawHTML html={highlightSearchKeyword(autocompletedKeyword, keyword.trim())} />
            </AutocompletedKeyword>
          </AutocompletedKeywordContainer>
        </Container>
      ))}
    </AutocompletedKeywordList>
  );
}

export default AutoCompletedKeywordList;
