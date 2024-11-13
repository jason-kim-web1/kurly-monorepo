import { InferGetStaticPropsType } from 'next';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import NoticeListContainer from '../../../src/board/containers/pc/NoticeListContainer';
import { PagingContextProvider } from '../../../src/board/context/PagingContext';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import BoardLayout from '../../../src/board/common/BoardLayout';

export default function NoticeBoardList(props: InferGetStaticPropsType<typeof getStaticProps>) {
  useScreenName(ScreenName.NOTICE_LIST);

  const { title, description } = props;

  return (
    <>
      <Header />
      <BoardLayout title={title} description={description}>
        <PagingContextProvider>
          <NoticeListContainer />
        </PagingContextProvider>
      </BoardLayout>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: '공지사항',
      description: '컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.',
    },
  };
}
