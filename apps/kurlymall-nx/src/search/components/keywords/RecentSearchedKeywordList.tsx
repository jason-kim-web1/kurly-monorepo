import styled from '@emotion/styled';

import { isEmpty } from 'lodash';
import { useState } from 'react';

import COLOR from '../../../shared/constant/colorset';

import { More } from '../../../shared/icons';

import ProductItemButton from './ProductItemButton';
import DeleteRecentKeywordsModal from './DeleteRecentKeywordsModal';
import { MainSite } from '../../../main/interfaces/MainSection.interface';
import { useSearchData } from '../../contexts/SearchDataProvider';

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 20px;
`;

const Title = styled.span`
  padding-bottom: 1px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
`;

const DeleteSelectionButton = styled.button`
  width: 40px;
  height: 40px;
  margin-right: -12px;
`;

const Completed = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
`;

const ProductList = styled.ul`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 6px 0 24px;
  background-color: ${COLOR.kurlyWhite};
  &::-webkit-scrollbar {
    display: none;
  }
  &:first-of-type {
    padding-left: 20px;
  }
`;

interface Props {
  onClickRecentKeyword: (keyword: string) => void;
  recentKeywords: string[];
  deleteRecentKeywords(keyword: string, site: MainSite): void;
  deleteAllRecentKeywords(): void;
}

export default function RecentSearchedKeywordList({
  recentKeywords,
  deleteRecentKeywords,
  deleteAllRecentKeywords,
  onClickRecentKeyword,
}: Props) {
  const { site } = useSearchData();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);

  const handleModalState = () => {
    setIsOpen(!isOpen);
  };

  const handleDeletableState = () => {
    setIsDeletable(!isDeletable);
    setIsOpen(false);
  };

  const clearRecentSearchedKeywords = () => {
    deleteAllRecentKeywords();
  };

  return (
    <>
      {!isEmpty(recentKeywords) && (
        <>
          <TitleWrapper>
            <DeleteRecentKeywordsModal
              isOpen={isOpen}
              onClose={handleModalState}
              isDeletable={handleDeletableState}
              clearRecentSearchedKeywords={clearRecentSearchedKeywords}
            />
            <Title>최근 검색어</Title>
            {isDeletable ? (
              <Completed onClick={handleDeletableState}>삭제 완료</Completed>
            ) : (
              <DeleteSelectionButton onClick={() => setIsOpen(true)}>
                <More width={40} height={40} stroke={COLOR.kurlyGray450} />
              </DeleteSelectionButton>
            )}
          </TitleWrapper>
          <ProductList>
            <ProductItemButton
              site={site}
              isDeletable={isDeletable}
              recentKeywords={recentKeywords}
              onClickRecentKeyword={onClickRecentKeyword}
              deleteRecentKeywords={deleteRecentKeywords}
            />
          </ProductList>
        </>
      )}
    </>
  );
}
