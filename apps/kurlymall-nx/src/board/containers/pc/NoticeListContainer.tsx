import { isEmpty } from 'lodash';

import { css } from '@emotion/react';

import { useMemo } from 'react';

import { BoardList } from '../../components/pc/List';
import useNoticeListQuery from '../../hooks/useNoticeListQuery';
import COLOR from '../../../shared/constant/colorset';
import BoardPaging from '../../components/pc/Pagination';
import { getFormattedDate } from '../../util';
import { BOARD_PATH } from '../../../shared/constant';
import { WRITER_NAME } from '../../constants';

const styles = {
  no: css`
    flex-basis: 50px;
  `,
  subject: css`
    flex: 1;
    text-align: left;
    padding-left: 20px;
  `,
  name: css`
    flex-basis: 100px;
  `,
  date: css`
    flex-basis: 100px;
    color: ${COLOR.kurlyGray450};
  `,
  wrapper: css`
    border-bottom: 1px solid ${COLOR.bg};
  `,
};
export default function NoticeListContainer() {
  const { data, isFetching, isError, queryKey } = useNoticeListQuery();

  const listEmpty = useMemo(() => !data || isEmpty(data?.data), [data]);

  return (
    <>
      <BoardList>
        <BoardList.Header>
          <BoardList.Header.Row width={50}>번호</BoardList.Header.Row>
          <BoardList.Header.Row grow={1}>제목</BoardList.Header.Row>
          <BoardList.Header.Row width={100}>작성자</BoardList.Header.Row>
          <BoardList.Header.Row width={100}>작성일</BoardList.Header.Row>
        </BoardList.Header>
        <BoardList.Contents isLoading={isFetching} isError={isError} isEmpty={listEmpty}>
          {data &&
            data.data?.map(({ displayNo, subject, regdt, no }, index) => (
              <BoardList.Contents.Link
                href={`${BOARD_PATH.noticeDetail.uri}/${no}`}
                key={`${queryKey.join('')}-${index}`}
              >
                <BoardList.Contents.LineBreak styles={styles.wrapper}>
                  <BoardList.Contents.View styles={styles.no}>{displayNo}</BoardList.Contents.View>
                  <BoardList.Contents.View styles={styles.subject}>{subject}</BoardList.Contents.View>
                  <BoardList.Contents.View styles={styles.name}>{WRITER_NAME}</BoardList.Contents.View>
                  <BoardList.Contents.View styles={styles.date}>{getFormattedDate(regdt)}</BoardList.Contents.View>
                </BoardList.Contents.LineBreak>
              </BoardList.Contents.Link>
            ))}
        </BoardList.Contents>
      </BoardList>
      {!listEmpty && !isError && <BoardPaging isLoading={isFetching} />}
    </>
  );
}
