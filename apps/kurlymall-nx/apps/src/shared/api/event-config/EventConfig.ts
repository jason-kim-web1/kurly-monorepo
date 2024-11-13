import { getFile } from '../common';
import { ENVIRONMENT, EVENT_CONFIG } from '../../configs/config';
import { EventConfig } from '../../interfaces/EventConfig';
import { DEFAULT_EVENT_CONFIG } from '../../constant/defaultEventConfig';

export const fetchEventConfig = async (): Promise<EventConfig> => {
  try {
    const data = await getFile<EventConfig>(EVENT_CONFIG[ENVIRONMENT]);
    return data;
  } catch (error) {
    return DEFAULT_EVENT_CONFIG;
  }
};
