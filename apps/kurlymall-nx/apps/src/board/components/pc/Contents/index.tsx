import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';

import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

import COLOR from '../../../../shared/constant/colorset';
import Loading from '../Loading';
import { PAGE_SIZE_LIMIT } from '../../../constants';
import { slideToggleVariant } from '../../../../shared/styles/motions/common/common';

interface BoardContentsProps {
  isError: boolean;
  isLoading: boolean;
  isEmpty: boolean;
}

interface BoardContentsViewProps {
  styles?: SerializedStyles;
}

interface BoardLinkProps {
  href: string;
}

interface BoardExpandLinkProps {
  onClick: () => void;
}

interface BoardExpandViewProps {
  isOpen: boolean;
}

const BoardContents = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ContentsLineBreak = styled.div<{ styles?: SerializedStyles }>`
  display: flex;
  flex-direction: row;
  ${({ styles }) => styles && { ...styles }}
`;

const BoardContentsExpendLink = styled.li`
  cursor: pointer;
`;

const BoardContentsView = styled.div<{ styles?: SerializedStyles }>`
  text-align: center;
  padding: 20px 0;
  color: ${COLOR.kurlyGray700};
  ${({ styles }) => styles && { ...styles }}
`;

const BoardDescriptionView = styled.div`
  width: 100%;
  height: 200px;
  line-height: 200px;
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.kurlyGray800};
  text-align: center;
`;

const ListItem = styled(motion.li)`
  overflow: hidden;
  height: 240px;
`;

const View = ({ children, styles }: PropsWithChildren<BoardContentsViewProps>) => {
  return <BoardContentsView styles={styles}>{children}</BoardContentsView>;
};

const ContentsLink = ({ children, href }: PropsWithChildren<BoardLinkProps>) => {
  return (
    <li>
      <Link href={href} passHref>
        <a href={href}>{children}</a>
      </Link>
    </li>
  );
};

const ContentsExpandLink = ({ children, onClick }: PropsWithChildren<BoardExpandLinkProps>) => {
  return <BoardContentsExpendLink onClick={onClick}>{children}</BoardContentsExpendLink>;
};

const ContentsExpandView = ({ children, isOpen }: PropsWithChildren<BoardExpandViewProps>) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <ListItem
          key="slide-inner"
          initial="hide"
          animate="view"
          exit="hide"
          variants={slideToggleVariant}
          transition={{
            type: 'keyframes',
          }}
        >
          {children}
        </ListItem>
      )}
    </AnimatePresence>
  );
};

const ContentsMain = ({ children, isError, isLoading, isEmpty }: PropsWithChildren<BoardContentsProps>) => {
  if (isError) {
    return <BoardDescriptionView>게시물을 불러올 수 없습니다 다시 시도 해주세요!</BoardDescriptionView>;
  }

  if (isLoading) {
    return <Loading numberOfRows={PAGE_SIZE_LIMIT} />;
  }

  if (isEmpty) {
    return <BoardDescriptionView>게시글이 없습니다.</BoardDescriptionView>;
  }

  return <BoardContents>{children}</BoardContents>;
};

export const Contents = Object.assign(ContentsMain, {
  View,
  Link: ContentsLink,
  LineBreak: ContentsLineBreak,
  ExpandLink: ContentsExpandLink,
  ExpandView: ContentsExpandView,
});
