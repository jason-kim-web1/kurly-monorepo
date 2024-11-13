import styled from '@emotion/styled';

import RawHTML from '../../../../../shared/components/layouts/RawHTML';

const Icon = styled.span({
  width: '30px',
  height: '20px',
  padding: '4px 6px',
  marginRight: '8px',
  borderRadius: '3px',
  fontSize: '10px',
  fontWeight: 'bold',
  backgroundColor: 'rgba(51, 51, 51, 0.06)',
});

function NoticeIcon() {
  return <Icon>공지</Icon>;
}

const Title = styled.div<{ displayOverflow: boolean }>`
  padding: 0.47rem 1.25rem;
  font-size: 14px;
  line-height: 20px;
  color: black;
  ${({ displayOverflow }) =>
    displayOverflow
      ? ''
      : `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `}
  word-break: break-all;
`;

const Contents = styled.div({
  padding: '20px',
  backgroundColor: '#fafafa',
  overflow: 'hidden',
});

interface Props {
  title: string;
  contents: string;
  expanded: boolean;
  onClickItem?(): void;
  displayOverflow?: boolean;
}

export default function InquiryQnaNotice({ title, contents, expanded, onClickItem, displayOverflow = false }: Props) {
  return (
    <>
      <Title onClick={onClickItem} displayOverflow={displayOverflow}>
        <NoticeIcon />
        {title}
      </Title>
      {expanded && (
        <Contents>
          <RawHTML html={contents} />
        </Contents>
      )}
    </>
  );
}
