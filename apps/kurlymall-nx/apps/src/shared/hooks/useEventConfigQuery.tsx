import { useQuery } from '@tanstack/react-query';

import { EVENT_CONFIG } from '../utils/kurlyMallEffectsQueryKey';
import { fetchEventConfig } from '../api/event-config/EventConfig';

export const useEventConfigQuery = () => {
  return useQuery(EVENT_CONFIG, fetchEventConfig);
};
