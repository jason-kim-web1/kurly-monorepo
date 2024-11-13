import styled from '@emotion/styled';

import { isEmpty } from 'lodash';
import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import COLOR from '../../../shared/constant/colorset';

import { MainSite } from '../../../main/interfaces/MainSection.interface';

import DeleteProductIcon from '../../../shared/components/icons/DeleteProductIcon';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectSearch } from '../../../shared/amplitude/events';
import { useAppSelector } from '../../../shared/store';
import { SEARCH_RESULT_SELECTION_TYPE, SELECT_SEARCH_SELECTION_TYPE } from '../../shared/constants';
import { setSearchSelectionType } from '../../../product/list/slice';

const ProductItem = styled.li`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
`;

const ProductButton = styled.button`
  padding: 9px 14px;
  height: 37px;
  font-size: 14px;
  line-height: 18px;
  background-color: ${COLOR.kurlyWhite};
  border: 1px solid ${COLOR.kurlyGray200};
  border-radius: 18px;
`;

const Delete = styled(DeleteProductIcon)`
  width: 10px;
  height: 10px;
  padding: 0;
  margin: 0 -3px 0 11px;
`;

interface Props {
  site: MainSite;
  isDeletable: boolean;
  recentKeywords: string[];
  onClickRecentKeyword(keyword: string): void;
  deleteRecentKeywords(keyword: string, site: MainSite): void;
}

export default function ProductItemButton({
  site,
  isDeletable,
  recentKeywords,
  onClickRecentKeyword,
  deleteRecentKeywords,
}: Props) {
  const dispatch = useDispatch();
  const queryId = useAppSelector(({ productList }) => productList.queryId);

  const handleClickRecentKeyword = useCallback(
    (recentSearchItem: string) => {
      amplitudeService.logEvent(
        new SelectSearch({
          selectionType: SELECT_SEARCH_SELECTION_TYPE.RECENT,
          keyword: recentSearchItem,
          queryId,
        }),
      );
      onClickRecentKeyword(recentSearchItem);
      dispatch(setSearchSelectionType(SEARCH_RESULT_SELECTION_TYPE.RECENT));
    },
    [onClickRecentKeyword, dispatch],
  );

  const onClickProductRecentKeyword = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, recentSearchItem: string) => {
    e.preventDefault();

    if (isDeletable) {
      deleteRecentKeywords(recentSearchItem, site);
      return;
    }
    handleClickRecentKeyword(recentSearchItem);
  };

  return (
    <>
      {!isEmpty(recentKeywords) && (
        <>
          {recentKeywords.map((recentSearchItem: string) => (
            <ProductItem key={recentSearchItem}>
              <ProductButton onClick={(e) => onClickProductRecentKeyword(e, recentSearchItem)}>
                <span>{recentSearchItem}</span>
                {isDeletable && <Delete />}
              </ProductButton>
            </ProductItem>
          ))}
        </>
      )}
    </>
  );
}
