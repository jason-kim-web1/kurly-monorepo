import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { Reset } from '../../../../shared/icons';
import { PageType } from '../../types';
import { LoadingFilter, LoadingList, LoadingListTop, LoadingSearchTop } from './LoadingList';

const Wrapper = styled.div`
  width: 1050px;
  margin: 0 auto;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 50px;
  padding-bottom: 75px;
`;

const Filter = styled.div`
  width: 220px;
  margin-right: 47px;
`;

const TitleContainer = styled.div`
  display: flex;
  background-color: ${COLOR.kurlyWhite};
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid ${COLOR.kurlyGray200};
  line-height: 20px;
`;

const Title = styled.span`
  font-weight: 500;
  font-size: 15px;
  color: ${COLOR.kurlyGray800};
`;

const ResetContainer = styled.button`
  display: flex;
  align-items: center;
  pointer-events: 'none';
`;

const ResetText = styled.span`
  margin-left: 2px;
  font-weight: 500;
  color: ${COLOR.lightGray};
`;

const ProductListWrapper = styled.div``;

interface Props {
  pageType: PageType;
  isDesignKindNumber?: boolean;
}

export const ListPageSkeleton = ({ pageType, isDesignKindNumber = false }: Props) => {
  return (
    <Wrapper>
      {pageType === 'search' ? <LoadingSearchTop /> : <LoadingListTop />}
      <Contents>
        {!isDesignKindNumber ? (
          <Filter>
            <TitleContainer>
              <Title>필터</Title>
              <ResetContainer>
                <Reset width={12} height={12} stroke={COLOR.lightGray} />
                <ResetText>초기화</ResetText>
              </ResetContainer>
            </TitleContainer>
            <LoadingFilter />
          </Filter>
        ) : null}
        <ProductListWrapper>
          <LoadingList repeatNumber={!isDesignKindNumber ? 3 : 4} />
        </ProductListWrapper>
      </Contents>
    </Wrapper>
  );
};
