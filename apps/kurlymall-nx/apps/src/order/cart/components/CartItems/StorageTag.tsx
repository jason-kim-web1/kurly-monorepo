import styled from '@emotion/styled';

import { Typography } from '@thefarmersfront/kpds-react';

import { vars } from '@thefarmersfront/kpds-css';

import { CART_STORAGE_GROUP_TYPE, CART_STORAGE_GROUP_TYPE_TEXT } from '../../constants/StorageGroupType';
import { CART_STORAGE_TYPE, CartStorageType } from '../../constants/StorageType';
import useStorageType from '../../hooks/useStorageType';

const getBackgroundColor = (tagName: CartStorageType) => {
  switch (tagName) {
    case CART_STORAGE_GROUP_TYPE.AMBIENT_TEMPERATURE:
      return vars.color.$orange100;
    case CART_STORAGE_GROUP_TYPE.COLD:
      return vars.color.$green100;
    case CART_STORAGE_GROUP_TYPE.FROZEN:
      return vars.color.$blue100;
    default:
      return vars.color.$gray100;
  }
};

const getColor = (tagName: CartStorageType) => {
  switch (tagName) {
    case CART_STORAGE_GROUP_TYPE.AMBIENT_TEMPERATURE:
      return vars.color.$orange600;
    case CART_STORAGE_GROUP_TYPE.COLD:
      return vars.color.$green600;
    case CART_STORAGE_GROUP_TYPE.FROZEN:
      return vars.color.$blue600;
    default:
      return vars.color.$gray600;
  }
};

const Tag = styled(Typography)<{ tagName: CartStorageType }>`
  display: flex;
  align-items: center;
  background-color: ${({ tagName }) => getBackgroundColor(tagName)};
  color: ${({ tagName }) => getColor(tagName)};
  margin-top: ${vars.spacing.$8};
`;

const TagText = styled.span`
  margin-left: ${vars.spacing.$2};
`;

export default function StorageTag({ storageType }: { storageType: CartStorageType }) {
  const { getStorageIcon } = useStorageType();

  switch (storageType) {
    case CART_STORAGE_TYPE.ROOM_TEMPERATURE:
    case CART_STORAGE_TYPE.ETC:
      return null;
    default:
      return (
        <Tag variant={`$smallSemibold`} tagName={storageType}>
          {getStorageIcon({ storageType, size: 16 })}
          <TagText>{CART_STORAGE_GROUP_TYPE_TEXT[storageType]}</TagText>
        </Tag>
      );
  }
}
