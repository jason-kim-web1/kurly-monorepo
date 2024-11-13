import { loadLocalStorage, storeLocalStorage, removeLocalStorage } from '../../../../shared/services/storage.service';
import { ReceiverForm } from '../interfaces';

export const storeReceiverForm = (receiverForm: ReceiverForm) => {
  return storeLocalStorage('receiverFormForGuest', receiverForm);
};

export const removeReceiverForm = () => {
  return removeLocalStorage('receiverFormForGuest');
};

export const loadReceiverForm = (): ReceiverForm | null => {
  return loadLocalStorage('receiverFormForGuest');
};
