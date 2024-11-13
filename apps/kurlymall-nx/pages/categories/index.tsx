import styled from '@emotion/styled';

import Header from '../../src/header/components/Header';
import Footer from '../../src/footer/components/Footer';
import MainSiteProvider from '../../src/main/components/shared/MainSiteProvider';
import COLOR from '../../src/shared/constant/colorset';

const PageError = styled.div`
  width: 1050px;
  margin: 0 auto;
  padding: 220px 0 200px;
  color: ${COLOR.kurlyGray800};
  text-align: center;
`;

const Title = styled.div`
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 28px;
  color: ${COLOR.kurlyGray600};
  :before {
    content: '';
    display: block;
    margin: 0 auto 22px;
    width: 100px;
    height: 100px;
    background: url('https://res.kurly.com/kurly/ico/2021/error_100_100_gray.svg') 0 0 no-repeat;
  }
`;

const Empty = styled.div`
  font-size: 16px;
  line-height: 23px;
  color: ${COLOR.kurlyGray400};
  text-align: center;
`;

export default function CategoriesPage() {
  return (
    <MainSiteProvider>
      <Header />
      <PageError>
        <Title>찾으시는 페이지가 없습니다.</Title>
        <Empty>카테고리 메뉴는 모바일웹 또는 현재 페이지 상단의 카테고리를 통해 확인 하실 수 있습니다.</Empty>
      </PageError>
      <Footer />
    </MainSiteProvider>
  );
}
