import { ne } from '../../../shared/utils/lodash-extends';

interface Props {
  isPreviousKeyword: boolean;
  currentSortType: string;
  sortedType: string;
  isFetchedAfterMount: boolean;
}

export const checkModifiedSortType = ({
  isPreviousKeyword,
  currentSortType,
  sortedType,
  isFetchedAfterMount,
}: Props) => {
  return isPreviousKeyword && ne(currentSortType, sortedType) && isFetchedAfterMount;
};
