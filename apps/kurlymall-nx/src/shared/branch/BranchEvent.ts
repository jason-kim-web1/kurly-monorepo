export class BranchEvent<EventData, ContentItems> {
  name: string;

  eventData: EventData;

  contentItems: ContentItems;

  constructor(name: string, eventData: EventData, contentItems: ContentItems) {
    this.name = name;
    this.eventData = eventData;
    this.contentItems = contentItems;
  }

  getName() {
    return this.name;
  }

  getEventData() {
    return this.eventData;
  }

  getContentItems() {
    return this.contentItems;
  }
}
