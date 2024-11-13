import { Typography } from '@thefarmersfront/kpds-react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { memo } from 'react';

import useStorageType from '../../hooks/useStorageType';
import { CartStorageType } from '../../constants/StorageType';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${vars.spacing.$16} ${vars.spacing.$0} ${vars.spacing.$12};
`;

const StorageText = styled(Typography)`
  margin-left: ${vars.spacing.$4};
  color: ${vars.color.text.$primary};
`;

const StorageTitle = ({ groupType, displayName }: { groupType: CartStorageType; displayName: string }) => {
  const { getStorageIcon } = useStorageType();

  return (
    <Wrapper>
      {getStorageIcon({ storageType: groupType })} <StorageText variant={`$xlargeSemibold`}>{displayName}</StorageText>
    </Wrapper>
  );
};

export default memo(StorageTitle);
