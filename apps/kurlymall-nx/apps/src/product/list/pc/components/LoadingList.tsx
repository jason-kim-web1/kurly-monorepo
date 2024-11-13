import styled from '@emotion/styled';
import React from 'react';

import SkeletonLoading from '../../../../shared/components/Loading/SkeletonLoading';
import COLOR from '../../../../shared/constant/colorset';
import { ArrowUp, CheckBoxInactive } from '../../../../shared/icons';
import Repeat from '../../../../shared/components/Repeat';

const Title = styled.div`
  width: 100px;
  padding: 23px 0 20px;
  margin: 0 auto;
`;

const TitleSearch = styled.div`
  width: 400px;
  margin: 50px auto 0;
  padding: 15px 0 24px;
`;

const MenuList = styled.div`
  padding: 23px 0 20px;
`;

const TotalCountAndSort = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 18px 0 16px;
`;

const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 24px;
  width: 100%;
`;

const ProductListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Product = styled.div`
  flex: 0 0 249px;
  height: 538px;
`;

const Content = styled.div`
  padding-top: 14px;
`;

const Item = styled.div`
  padding-bottom: 8px;
`;

const GroupTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  margin-bottom: 9px;
`;

const FilterValueContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;

const ButtonContainer = styled.div`
  margin-right: 8px;
`;

const GroupList = styled.div`
  border-bottom: 1px solid ${COLOR.kurlyGray200};
`;

const Ranking = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${COLOR.kurlyGray200};
  margin-bottom: 6px;
`;

type Props = {
  isDesignKindNumber?: boolean;
};
function LoadingListItem({ isDesignKindNumber = false }: Props) {
  return (
    <Product>
      {isDesignKindNumber ? <Ranking /> : null}
      <SkeletonLoading width={249} height={320} radius={0} />
      <Content>
        <Item>
          <SkeletonLoading width={80} height={18} />
        </Item>
        <Item>
          <SkeletonLoading width={249} height={23} radius={0} />
        </Item>
        <Item>
          <SkeletonLoading width={249} height={23} radius={0} />
        </Item>
        <Item>
          <SkeletonLoading width={124} height={20} radius={0} />
        </Item>
      </Content>
    </Product>
  );
}

export function LoadingList({ repeatNumber }: { repeatNumber: number }) {
  return (
    <ProductListWrapper>
      {Array.from({ length: 3 }, (v, index) => (
        <Inner key={`product-loading-${v}-${index}`}>
          {Array.from({ length: repeatNumber }, (_, insideIndex) => (
            <LoadingListItem key={`product-${insideIndex}`} />
          ))}
        </Inner>
      ))}
    </ProductListWrapper>
  );
}

export function LoadingSearch() {
  return (
    <>
      <TitleSearch>
        <SkeletonLoading width={400} height={50} />
      </TitleSearch>
      <TotalCountAndSort>
        <SkeletonLoading width={50} height={24} />
        <SkeletonLoading width={375} height={24} />
      </TotalCountAndSort>
      <Inner>
        <LoadingListItem />
        <LoadingListItem />
        <LoadingListItem />
      </Inner>
    </>
  );
}

type LoadingListTopProps = {
  isDesignKindNumber?: boolean;
};

export function LoadingListTop({ isDesignKindNumber }: LoadingListTopProps) {
  return (
    <>
      <Title>
        <SkeletonLoading width={100} height={35} />
      </Title>
      {!isDesignKindNumber ? (
        <>
          <MenuList>
            <SkeletonLoading width={1050} height={50} />
          </MenuList>
          <TotalCountAndSort>
            <SkeletonLoading width={50} height={24} />
            <SkeletonLoading width={375} height={24} />
          </TotalCountAndSort>
        </>
      ) : null}
    </>
  );
}

export function LoadingSearchTop() {
  return (
    <>
      <TitleSearch>
        <SkeletonLoading width={400} height={50} />
      </TitleSearch>
      <TotalCountAndSort>
        <SkeletonLoading width={50} height={24} />
        <SkeletonLoading width={375} height={24} />
      </TotalCountAndSort>
    </>
  );
}

export function LoadingSiblingMenu() {
  return (
    <MenuList>
      <SkeletonLoading width={1050} height={50} />
    </MenuList>
  );
}

export function LoadingFilter() {
  return (
    <Repeat count={3}>
      <GroupList>
        <GroupTitleContainer>
          <SkeletonLoading width={80} height={20} />
          <ArrowUp />
        </GroupTitleContainer>
        <Repeat count={5}>
          <React.Fragment>
            <FilterValueContainer>
              <ButtonContainer>
                <CheckBoxInactive />
              </ButtonContainer>
              <SkeletonLoading width={160} height={20} />
            </FilterValueContainer>
            <FilterValueContainer>
              <ButtonContainer>
                <CheckBoxInactive />
              </ButtonContainer>
              <SkeletonLoading width={194} height={20} />
            </FilterValueContainer>
          </React.Fragment>
        </Repeat>
      </GroupList>
    </Repeat>
  );
}
