import { APP_CONFIG, ENVIRONMENT } from '../../configs/config';
import DEFAULT_APP_CONFIG from '../../constant/defaultAppConfig';
import { AppConfig } from '../../interfaces/AppConfig';
import { getFile } from '../common';

export const fetchAppConfig = async (): Promise<AppConfig> => {
  try {
    const data = await getFile<AppConfig>(APP_CONFIG[ENVIRONMENT]);
    return data;
  } catch (error) {
    return DEFAULT_APP_CONFIG;
  }
};
