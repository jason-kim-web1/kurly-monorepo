import { chain, eq, gte, isUndefined, keys, range, size } from 'lodash';

import type { ReviewFilterType } from './types';
import type { FilterDictionaryState } from './m/ReviewFilterBottomSheet';
import COLOR from '../../../shared/constant/colorset';
import { fetchProductReviewList } from '../../../shared/api';
import { mergeOptionListToQueryString } from '../../../shared/utils/url';

export const getReviewPagination = async (
  contentsProductNo: number,
  currentReviewNo: number,
  direction: 'PREVIOUS' | 'NEXT',
) => {
  const {
    meta: { pagination },
  } = await fetchProductReviewList({
    contentsProductNo,
    onlyImage: true,
    sortType: 'RECENTLY',
    after: direction === 'NEXT' ? currentReviewNo : undefined,
    before: direction === 'PREVIOUS' ? currentReviewNo : undefined,
    size: 1,
  });
  return pagination;
};

export const getProductReviewFilterQueryString = (dealProduct: string[], memberGroup: string[]) =>
  mergeOptionListToQueryString([
    {
      keyName: 'dealProduct',
      value: dealProduct,
    },
    {
      keyName: 'memberGroup',
      value: memberGroup,
    },
  ]);

export const getActiveFilterListByFilterType = (
  filterType: ReviewFilterType,
  filterDictionaryState: FilterDictionaryState,
) => {
  const filterDictionary = filterDictionaryState[filterType];
  if (isUndefined(filterDictionary)) {
    return [];
  }
  return chain(keys(filterDictionary))
    .filter((code) => eq(filterDictionary[code], true))
    .value();
};

export const ellipsisText = (maxLength: number, text: string) => {
  const textSize = size(text);
  const isNotNeedToEllipsis = gte(maxLength, textSize);
  if (isNotNeedToEllipsis) {
    return text;
  }
  const nextText = chain(range(0, maxLength))
    .map((i) => text[i])
    .join('')
    .value();
  return [nextText, '...'].join('');
};

export const getFilterItemCheckBoxStrokeColor = (isChecked: boolean, disabled: boolean) => {
  if (!isChecked || disabled) {
    return COLOR.lightGray;
  }
  return COLOR.kurlyWhite;
};

export const getFilterItemCheckBoxFillColor = (isChecked: boolean, disabled: boolean) => {
  if (disabled) {
    return COLOR.btnGray;
  }
  if (isChecked) {
    return COLOR.kurlyPurple;
  }
  return 'none';
};
