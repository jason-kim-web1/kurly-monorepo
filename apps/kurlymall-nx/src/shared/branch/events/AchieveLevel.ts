import { BranchEvent } from '..';

interface EventData {
  description: 'membership';
}

export class AchieveLevel extends BranchEvent<EventData, void> {
  constructor() {
    super('ACHIEVE_LEVEL', {
      description: 'membership',
    });
  }
}
