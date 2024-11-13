import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { ParsedUrlQuery } from 'querystring';

import Header from '../../../../src/header/components/Header';
import Footer from '../../../../src/footer/components/Footer';

import COLOR from '../../../../src/shared/constant/colorset';
import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';
import NoticeDetailContainer from '../../../../src/board/containers/pc/NoticeDetailContainer';
import Alert from '../../../../src/shared/components/Alert/Alert';

const Wrapper = styled.div`
  width: 1050px;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  width: 100%;
  padding: 50px 0 50px;
`;

const BoardTitle = styled.div`
  font-weight: 700;
  font-size: 28px;
  color: ${COLOR.kurlyGray800};
  line-height: 35px;
  text-align: center;
  letter-spacing: -1px;
`;

const BoardSubText = styled.div`
  margin-top: 5px;
  color: ${COLOR.kurlyGray450};
  line-height: 20px;
  letter-spacing: -0.1px;
  text-align: center;
`;
export default function NoticeBoardDetail() {
  useScreenName(ScreenName.NOTICE_DETAIL);

  const router = useRouter();
  const dispatch = useDispatch();
  const { no } = router.query as ParsedUrlQuery & { no: string };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!no) {
      Alert({
        text: '존재하지 않거나, 열람 할 수 없는 게시물 입니다.',
      }).then(() => {
        router.back();
      });
    }
  }, [dispatch, no, router]);

  return (
    <>
      <Header />
      <Wrapper>
        <TitleWrapper>
          <BoardTitle>공지사항</BoardTitle>
          <BoardSubText>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</BoardSubText>
        </TitleWrapper>
        {no && <NoticeDetailContainer noticeNo={no} />}
      </Wrapper>
      <Footer />
    </>
  );
}
