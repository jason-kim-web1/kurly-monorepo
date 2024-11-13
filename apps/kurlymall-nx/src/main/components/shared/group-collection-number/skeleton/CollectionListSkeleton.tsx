import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../../../../shared/constant/colorset';
import useWindowSize from '../../../../../shared/hooks/useWindowSize';
import { isPC } from '../../../../../../util/window/getDevice';
import Repeat from '../../../../../shared/components/Repeat';

const CollectionList = styled.div`
  display: flex;
  padding-left: 16px;
  gap: 8px;

  ${isPC &&
  css`
    margin-top: 34px;
    justify-content: center;
  `}
`;

const Collection = styled.div`
  background-color: ${COLOR.kurlyGray200};
  min-width: 73px;
  height: 32px;
  border-radius: 24px;
`;

const ShortCollection = styled.div`
  background-color: ${COLOR.kurlyGray200};
  min-width: 86px;
  height: 32px;
  border-radius: 24px;
`;

const LongCollection = styled.div`
  background-color: ${COLOR.kurlyGray200};
  min-width: 138px;
  height: 32px;
  border-radius: 24px;
`;

const CollectionListSkeleton = () => {
  const { width } = useWindowSize();

  const count = useMemo(() => Math.ceil(width / 73) + 1, [width]);

  return (
    <CollectionList>
      <Repeat count={isPC ? 3 : count}>
        {isPC ? (
          <>
            <ShortCollection />
            <LongCollection />
          </>
        ) : (
          <Collection />
        )}
      </Repeat>
    </CollectionList>
  );
};

export { CollectionListSkeleton };
