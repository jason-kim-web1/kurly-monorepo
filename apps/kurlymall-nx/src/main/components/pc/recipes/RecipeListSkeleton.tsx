import React from 'react';

import styled from '@emotion/styled';

import Repeat from '../../../../shared/components/Repeat';
import SkeletonLoading from '../../../../shared/components/Loading/SkeletonLoading';

const RecipeItems = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RecipeItem = styled.div`
  width: 338px;
`;

const RecipeContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 10px;
  width: 100%;
`;

export default function RecipeListSkeleton() {
  return (
    <RecipeItems>
      <Repeat count={3}>
        <RecipeItem>
          <SkeletonLoading width={338} height={225} />
          <RecipeContent>
            <SkeletonLoading width={150} height={20} />
          </RecipeContent>
        </RecipeItem>
      </Repeat>
    </RecipeItems>
  );
}
