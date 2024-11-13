import { isEmpty } from 'lodash';

import { css } from '@emotion/react';

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { BoardList } from '../../components/pc/List';
import BoardPaging from '../../components/pc/Pagination';
import useFaqListQuery from '../../hooks/useFaqListQuery';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import COLOR from '../../../shared/constant/colorset';
import { FaqListInterface } from '../../../shared/api/board/faq';
import { RESOURCE_URL } from '../../../shared/configs/config';

const AnswerWrapper = styled.div`
  position: relative;
  padding: 30px 30px 30px 70px;
  text-align: left;
  color: ${COLOR.kurlyGray700};
  white-space: pre-line;

  ::after {
    content: '';
    position: absolute;
    top: 30px;
    left: 30px;
    width: 24px;
    height: 12px;
    background: ${`url('${RESOURCE_URL}/images/common/icon_faq.gif') no-repeat 0 0`};
  }
`;

const styles = {
  no: css`
    flex-basis: 70px;
  `,
  category: css`
    flex-basis: 135px;
  `,
  question: css`
    flex: 1;
    text-align: left;
    padding-left: 20px;
  `,
  wrapper: css`
    border-bottom: 1px solid ${COLOR.bg};
  `,
};

interface Props {
  selectedFilter: FaqListInterface;
}

export default function FaqListContainer({ selectedFilter }: Props) {
  const { data, isFetching, isError, queryKey, setType, setCurrentPage, setLastPage } = useFaqListQuery();

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const listEmpty = useMemo(() => !data || isEmpty(data?.data), [data]);

  const onClickExpand = useCallback(
    (no: number) => {
      if (no === openFaq) {
        setOpenFaq(null);
      } else {
        setOpenFaq(no);
      }
    },
    [openFaq],
  );

  useEffect(() => {
    setType(selectedFilter.value);
    setCurrentPage(0);
    setLastPage(null);
  }, [selectedFilter.value, setCurrentPage, setLastPage, setType]);

  return (
    <>
      <BoardList>
        <BoardList.Header>
          <BoardList.Header.Row width={70}>번호</BoardList.Header.Row>
          <BoardList.Header.Row width={135}>카테고리</BoardList.Header.Row>
          <BoardList.Header.Row grow={1}>제목</BoardList.Header.Row>
        </BoardList.Header>
        <BoardList.Contents isLoading={isFetching} isError={isError} isEmpty={listEmpty}>
          {data?.data?.map(({ no, category, question, answer }, index) => (
            <Fragment key={`${queryKey.join('')}-${index}`}>
              <BoardList.Contents.ExpandLink onClick={() => onClickExpand(no)}>
                <BoardList.Contents.LineBreak styles={styles.wrapper}>
                  <BoardList.Contents.View styles={styles.no}>{no}</BoardList.Contents.View>
                  <BoardList.Contents.View styles={styles.category}>{category}</BoardList.Contents.View>
                  <BoardList.Contents.View styles={styles.question}>
                    <RawHTML html={question ?? ''} />
                  </BoardList.Contents.View>
                </BoardList.Contents.LineBreak>
              </BoardList.Contents.ExpandLink>
              <BoardList.Contents.ExpandView isOpen={openFaq === no}>
                <AnswerWrapper>
                  <RawHTML html={answer ?? ''} />
                </AnswerWrapper>
              </BoardList.Contents.ExpandView>
            </Fragment>
          ))}
        </BoardList.Contents>
      </BoardList>
      {!listEmpty && !isError && <BoardPaging isLoading={isFetching} />}
    </>
  );
}
