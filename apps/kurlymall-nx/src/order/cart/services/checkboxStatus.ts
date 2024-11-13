import { UserCartCheckbox } from '../interface/CartCheckbox';
import { loadUserCheckboxStatus, storeCheckboxStatus } from './checkboxStatusStorage';

const addCheckboxStatus = ({
  id,
  originCheckboxStatus,
  checkboxStatus,
}: {
  id: string;
  originCheckboxStatus: UserCartCheckbox;
  checkboxStatus: UserCartCheckbox;
}) => {
  storeCheckboxStatus({
    [id]: {
      ...originCheckboxStatus,
      ...checkboxStatus,
    },
  });
};

export const removeCheckboxStatus = ({ id, dealProductNos }: { id: string; dealProductNos: number[] }) => {
  const userCheckboxStatus = loadUserCheckboxStatus(id);
  dealProductNos.map((dealProductNo) => delete userCheckboxStatus[dealProductNo]);

  storeCheckboxStatus({
    [id]: userCheckboxStatus,
  });
};

export const toggleCheckboxStatus = ({
  id,
  dealProductNo,
  checked,
}: {
  id: string;
  dealProductNo: number;
  checked: boolean;
}) => {
  const originCheckboxStatus = loadUserCheckboxStatus(id);

  addCheckboxStatus({
    id,
    originCheckboxStatus,
    checkboxStatus: {
      [dealProductNo]: checked,
    },
  });
};
