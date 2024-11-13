import { css } from '@emotion/react';
import styled from '@emotion/styled';
import format from 'date-fns/format';
import { motion } from 'framer-motion';

import RawHTML from '../../../../../shared/components/layouts/RawHTML';
import COLOR from '../../../../../shared/constant/colorset';

import { BoardList } from '../../../../../board/components/pc/List';

const styles = {
  title: css`
    width: 620px;
    padding: 20px;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    border-bottom: 1px solid ${COLOR.bg};
  `,
  status: css`
    width: 100px;
    text-align: center;
    font-size: 14px;
    line-height: 22px;
    border-bottom: 1px solid ${COLOR.bg};
  `,
};

const Title = styled.div`
  display: inline-block;
  overflow: hidden;
  max-width: 600px;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: top;
`;

const Icon = styled.span`
  padding: 2px 8px;
  margin-right: 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: ${COLOR.kurlyGray600};
  width: 39px;
  height: 22px;
  background: ${COLOR.kurlyGray150};
`;

const Text = styled.span`
  color: ${COLOR.kurlyGray450};
`;

const Contents = styled(motion.div)`
  max-width: 820px;
  padding: 20px 20px 30px;
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  word-break: break-all;
  background-color: ${COLOR.kurlyGray100};
  border-bottom: 1px solid ${COLOR.bg};
  img {
    margin-top: 20px;
  }
`;

function NoticeIcon() {
  return <Icon>공지</Icon>;
}

interface Props {
  title: string;
  contents: string;
  date: string;
  expanded: boolean;
  onClickItem(): void;
}

export default function InquiryQnaNotice({ title, contents, date, expanded, onClickItem }: Props) {
  return (
    <>
      <BoardList.Contents.ExpandLink onClick={onClickItem}>
        <BoardList.Contents.LineBreak>
          <BoardList.Contents.View styles={styles.title}>
            <Title>
              <NoticeIcon />
              {title}
            </Title>
          </BoardList.Contents.View>
          <BoardList.Contents.View styles={styles.status}>
            <Text>{format(new Date(date), 'yyyy.MM.dd')}</Text>
          </BoardList.Contents.View>
          <BoardList.Contents.View styles={styles.status}>-</BoardList.Contents.View>
        </BoardList.Contents.LineBreak>
      </BoardList.Contents.ExpandLink>
      <BoardList.Contents.ExpandView isOpen={expanded}>
        <Contents>
          <RawHTML html={contents} />
        </Contents>
      </BoardList.Contents.ExpandView>
    </>
  );
}
