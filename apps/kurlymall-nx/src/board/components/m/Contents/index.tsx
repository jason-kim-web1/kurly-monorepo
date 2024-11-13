import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';

import Link from 'next/link';

import COLOR from '../../../../shared/constant/colorset';
import Loading from '../../../../shared/components/Loading/Loading';

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

const BoardContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentsLineBreak = styled.div<{ styles?: SerializedStyles }>`
  display: flex;
  flex-direction: column;
  ${({ styles }) => styles && { ...styles }}
`;

const BoardContentsView = styled.div<{ styles?: SerializedStyles }>`
  color: ${COLOR.kurlyGray450};
  letter-spacing: -0.5px;
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

const View = ({ children, styles }: PropsWithChildren<BoardContentsViewProps>) => {
  return <BoardContentsView styles={styles}>{children}</BoardContentsView>;
};

const ContentsLink = ({ children, href }: PropsWithChildren<BoardLinkProps>) => {
  return (
    <Link href={href} passHref prefetch={false}>
      <a href={href}>{children}</a>
    </Link>
  );
};

const ContentsMain = ({ children, isError, isLoading, isEmpty }: PropsWithChildren<BoardContentsProps>) => {
  if (!isLoading && isError) {
    return <BoardDescriptionView>게시물을 불러올 수 없습니다 다시 시도 해주세요!</BoardDescriptionView>;
  }

  if (!isLoading && isEmpty) {
    return <BoardDescriptionView>게시글이 없습니다.</BoardDescriptionView>;
  }

  return (
    <BoardContents>
      {isLoading && <Loading />}
      {children}
    </BoardContents>
  );
};

export const Contents = Object.assign(ContentsMain, {
  View,
  Link: ContentsLink,
  LineBreak: ContentsLineBreak,
});
