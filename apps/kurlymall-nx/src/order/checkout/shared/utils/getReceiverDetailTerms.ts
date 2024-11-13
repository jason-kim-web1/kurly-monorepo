import { RESOURCE_URL } from '../../../../shared/configs/config';
import { getFile } from '../../../../shared/api';

const RECEIVER_DETAIL_TERMS_URL = `${RESOURCE_URL}/json/terms/receiver-detail/entrance_password.html`;

export const getReceiverDetailTerms = async () => {
  return getFile<string>(RECEIVER_DETAIL_TERMS_URL);
};
