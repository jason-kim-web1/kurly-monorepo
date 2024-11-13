import { loadLocalStorage, storeLocalStorage } from '../../../shared/services/storage.service';
import { CartCheckbox } from '../interface/CartCheckbox';

const loadCheckboxStatus = (): CartCheckbox => {
  return loadLocalStorage<CartCheckbox>('cartCheckbox') ?? {};
};

export const storeCheckboxStatus = (checkbox: CartCheckbox) => {
  const original = loadCheckboxStatus();

  return storeLocalStorage('cartCheckbox', { ...original, ...checkbox });
};

export const loadUserCheckboxStatus = (id?: string) => {
  const checkboxStatus = loadCheckboxStatus();
  if (!id || !checkboxStatus[id]) {
    return {};
  }

  return checkboxStatus[id];
};
