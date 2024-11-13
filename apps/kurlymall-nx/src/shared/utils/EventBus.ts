import { nanoid } from 'nanoid';

import { ne } from './lodash-extends';

type UnsubscribeFn = () => void;

abstract class EventBus {
  abstract publish(eventName: string): void;
  abstract subscribe(eventName: string, callback: () => void): { unsubscribe: UnsubscribeFn };
}

type EventMeta = {
  id: string;
  callback: () => void;
};

class SimpleEventBus {
  eventMeta: Record<string, EventMeta[]> = {};

  publish(eventName: string) {
    const targetEventList = this.eventMeta[eventName];
    if (!targetEventList) {
      return;
    }
    targetEventList.forEach(({ callback }) => {
      callback();
    });
  }

  subscribe(eventName: string, callback: () => void) {
    if (!this.eventMeta[eventName]) {
      this.eventMeta[eventName] = [];
    }
    const eventId = nanoid();
    const eventData = {
      id: eventId,
      callback,
    };
    this.eventMeta[eventName].push(eventData);
    return {
      unsubscribe: () => {
        const targetEventList = this.eventMeta[eventName];
        this.eventMeta[eventName] = targetEventList.filter(({ id }) => ne(eventId, id));
      },
    };
  }
}

export { EventBus, SimpleEventBus };
