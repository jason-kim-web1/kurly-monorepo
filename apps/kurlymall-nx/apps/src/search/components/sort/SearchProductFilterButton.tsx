import { UrlBasedFilter } from '../../../product/list/shared/util/parseFilterData';
import FilterButton from '../../../product/list/m/components/FilterButton';

interface Props {
  toggleModalState: () => void;
  urlFilters: UrlBasedFilter;
}

export default function SearchProductFilterButton({ toggleModalState, urlFilters }: Props) {
  return <FilterButton onClick={toggleModalState} urlBasedFilter={urlFilters} />;
}
