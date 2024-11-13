import type { UrlBasedFilter } from '../../../product/list/shared/util/parseFilterData';
import { isNotEqual } from '../../../shared/utils/lodash-extends';

interface Props {
  isPreviousKeyword: boolean;
  currentFilter: UrlBasedFilter;
  urlFilters: UrlBasedFilter;
  isFetchedAfterMount: boolean;
}

export const checkModifiedFilter = ({ isPreviousKeyword, currentFilter, urlFilters, isFetchedAfterMount }: Props) => {
  return isPreviousKeyword && isNotEqual(currentFilter, urlFilters) && isFetchedAfterMount;
};
