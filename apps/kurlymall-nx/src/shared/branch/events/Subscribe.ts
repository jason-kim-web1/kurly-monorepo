import { BranchEvent } from '..';

interface EventData {
  description: string;
}

export class Subscribe extends BranchEvent<EventData, void> {
  constructor(eventData: EventData) {
    super('SUBSCRIBE', eventData);
  }
}
