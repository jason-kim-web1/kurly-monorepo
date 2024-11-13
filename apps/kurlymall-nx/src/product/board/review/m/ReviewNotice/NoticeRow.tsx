import { NoticeBadge, NoticeContents, NoticeRowHeader, NoticeTitle } from './styled-components';

interface Props {
  id: number;
  title: string;
  contents: string;
  isExpanded: boolean;
  onToggle(): void;
}

export default function NoticeRow({ title, contents, isExpanded, onToggle }: Props) {
  return (
    <div>
      <NoticeRowHeader>
        <NoticeBadge>공지</NoticeBadge>
        <NoticeTitle onClick={onToggle}>{title}</NoticeTitle>
      </NoticeRowHeader>
      {isExpanded ? <NoticeContents onClick={onToggle}>{contents}</NoticeContents> : null}
    </div>
  );
}
