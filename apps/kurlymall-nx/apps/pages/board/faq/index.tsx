import { InferGetStaticPropsType } from 'next';

import styled from '@emotion/styled';

import { useCallback, useState } from 'react';

import Header from '../../../src/header/components/Header';

import Footer from '../../../src/footer/components/Footer';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';

import { PagingContextProvider } from '../../../src/board/context/PagingContext';
import FaqListContainer from '../../../src/board/containers/pc/FaqListContainer';
import Dropdown, { Option } from '../../../src/shared/components/Input/Dropdown';
import useFaqCategoryQuery from '../../../src/board/hooks/useFaqCategoryQuery';
import { FAQ_ADD_CATEGORY } from '../../../src/shared/api/board/faq';
import BoardLayout from '../../../src/board/common/BoardLayout';

const DropdownWrapper = styled.div`
  width: 170px;
  .MuiSelect-select {
    font-family: 'Noto Sans KR';
  }
`;

export default function FaqBoardList(props: InferGetStaticPropsType<typeof getStaticProps>) {
  useScreenName(ScreenName.FREQUENTLY_ASK_QUESTION);

  const { faqPCCategory } = useFaqCategoryQuery();

  const [selectedFilter, setSelectedFilter] = useState(FAQ_ADD_CATEGORY[0]);

  const { title, description } = props;

  const handleChangeFilter = (option: Option) => {
    setSelectedFilter(option);
    window.scrollTo(0, 0);
  };

  const TypeFilterDropDown = useCallback(() => {
    return (
      <DropdownWrapper>
        <Dropdown
          selectedValue={selectedFilter}
          options={faqPCCategory}
          onChange={handleChangeFilter}
          direction="down"
        />
      </DropdownWrapper>
    );
  }, [faqPCCategory, selectedFilter]);

  return (
    <>
      <Header />
      <BoardLayout title={title} description={description} headerAction={<TypeFilterDropDown />}>
        <PagingContextProvider>
          <FaqListContainer selectedFilter={selectedFilter} />
        </PagingContextProvider>
      </BoardLayout>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: '자주하는 질문',
      description: '고객님들께서 가장 자주하시는 질문을 모두 모았습니다.',
    },
  };
}
