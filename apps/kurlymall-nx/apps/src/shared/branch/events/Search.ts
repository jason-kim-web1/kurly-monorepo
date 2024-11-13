import { BranchEvent } from '..';

interface EventData {
  searchQuery?: string;
}

export class Search extends BranchEvent<EventData | void, void> {
  constructor(searchData?: EventData) {
    super('SEARCH', searchData);
  }
}
