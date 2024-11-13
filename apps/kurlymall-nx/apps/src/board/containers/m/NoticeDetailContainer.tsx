import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import useNoticeDetailQuery from '../../hooks/useNoticeDetailQuery';
import Alert from '../../../shared/components/Alert/Alert';
import { BoardDetail } from '../../components/m/Detail';
import { getFormattedDate } from '../../util';
import { WRITER_NAME } from '../../constants';

const styles = {
  text: css`
    color: #848484;
  `,
  subject: css`
    margin-bottom: 10px;
    font-weight: 600;
  `,
  linebreak: css`
    justify-content: space-between;
  `,
};

export default function NoticeDetailContainer({ noticeNo }: { noticeNo: string }) {
  const router = useRouter();
  const { data, isError } = useNoticeDetailQuery(noticeNo);

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
        <BoardDetail.Header.HeaderText styles={styles.subject}>{data?.subject}</BoardDetail.Header.HeaderText>
        <BoardDetail.Header.HeaderLineBreak styles={styles.linebreak}>
          <BoardDetail.Header.HeaderText styles={styles.text}>{WRITER_NAME}</BoardDetail.Header.HeaderText>
          <BoardDetail.Header.HeaderText styles={styles.text}>
            {getFormattedDate(data?.regdt)}
          </BoardDetail.Header.HeaderText>
        </BoardDetail.Header.HeaderLineBreak>
      </BoardDetail.Header>
      <BoardDetail.View source={data?.contents} />
    </BoardDetail>
  );
}
