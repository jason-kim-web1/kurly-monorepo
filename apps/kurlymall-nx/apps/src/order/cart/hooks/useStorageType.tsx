import { useCallback } from 'react';

import { Icon } from '@thefarmersfront/kpds-react';

import { vars } from '@thefarmersfront/kpds-css';

import { CART_STORAGE_GROUP_TYPE } from '../constants/StorageGroupType';
import { CART_STORAGE_TYPE, CartStorageType } from '../constants/StorageType';

export default function useStorageType() {
  const getStorageIcon = useCallback(({ storageType, size = 20 }: { storageType: CartStorageType; size?: number }) => {
    switch (storageType) {
      case CART_STORAGE_TYPE.ROOM_TEMPERATURE:
      case CART_STORAGE_TYPE.ETC:
        return null;

      case CART_STORAGE_GROUP_TYPE.AMBIENT_TEMPERATURE:
        return <Icon type="Sun" size={size} ratio="1:1" fill={vars.color.$orange600} />;

      case CART_STORAGE_GROUP_TYPE.COLD:
        return <Icon type="WaterDrop" size={size} ratio="2:3" fill={vars.color.$green600} />;

      case CART_STORAGE_GROUP_TYPE.FROZEN:
        return <Icon type="Freeze" size={size} ratio="1:1" fill={vars.color.$blue600} />;
    }
  }, []);

  return {
    getStorageIcon,
  };
}
