import { BranchEvent } from '../BranchEvent';

export class AddReviewSuccess extends BranchEvent<void, void> {
  constructor() {
    super('ADD_REVIEW_SUCCESS', undefined, undefined);
  }
}
