import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { BoardDetail } from '../../components/pc/Detail';
import useNoticeDetailQuery from '../../hooks/useNoticeDetailQuery';
import Alert from '../../../shared/components/Alert/Alert';
import { getFormattedDate } from '../../util';
import { WRITER_NAME } from '../../constants';
import { redirectTo } from '../../../shared/reducers/page';

export default function NoticeDetailContainer({ noticeNo }: { noticeNo: string }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isError } = useNoticeDetailQuery(noticeNo);

  const onClickBackButton = useCallback(() => {
    dispatch(
      redirectTo({
        url: '/board/notice',
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      Alert({
        text: '존재하지 않거나, 열람 할 수 없는 게시물 입니다.',
      }).then(() => {
        router.back();
      });
    }
  }, [isError, router]);

  return (
    <BoardDetail>
      <BoardDetail.Header>
        <BoardDetail.Header.HeaderTitle>제목</BoardDetail.Header.HeaderTitle>
        <BoardDetail.Header.HeaderText>{data?.subject}</BoardDetail.Header.HeaderText>
      </BoardDetail.Header>
      <BoardDetail.Header>
        <BoardDetail.Header.HeaderTitle>작성자</BoardDetail.Header.HeaderTitle>
        <BoardDetail.Header.HeaderText>{WRITER_NAME}</BoardDetail.Header.HeaderText>
      </BoardDetail.Header>
      <BoardDetail.Header>
        <BoardDetail.Header.HeaderTitle>작성일</BoardDetail.Header.HeaderTitle>
        <BoardDetail.Header.HeaderText>{getFormattedDate(data?.regdt)}</BoardDetail.Header.HeaderText>
      </BoardDetail.Header>
      <BoardDetail.View source={data?.contents} />
      <BoardDetail.BackButton buttonText={'목록'} onClick={onClickBackButton} />
    </BoardDetail>
  );
}
