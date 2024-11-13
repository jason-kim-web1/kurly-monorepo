import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

interface Props {
  id: number;
  title: string;
  contents: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const Wrapper = styled.div`
  padding: 21px 20px 20px;
  border-bottom: 1px solid ${COLOR.kurlyGray200};
`;

const Badge = styled.span`
  display: inline-block;
  height: 22px;
  width: 42px;
  border-radius: 4px;
  background-color: ${COLOR.bg};
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  text-align: center;
  color: ${COLOR.kurlyGray600};
  vertical-align: 2px;
`;

const Title = styled.button`
  margin-left: 9px;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  color: ${COLOR.kurlyGray800};
`;

const Contents = styled.p`
  width: 100%;
  padding: 25px 20px 20px;
  border-bottom: 1px solid ${COLOR.kurlyGray200};
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  background-color: ${COLOR.kurlyGray100};
  color: ${COLOR.kurlyGray800};
  white-space: pre-line;

  :hover {
    cursor: pointer;
  }
`;

export default function ReviewNoticeRow({ title, contents, isExpanded, onToggle }: Props) {
  return (
    <>
      <Wrapper>
        <Badge>공지</Badge>
        <Title onClick={onToggle}>{title}</Title>
      </Wrapper>
      {isExpanded ? <Contents onClick={onToggle}>{contents}</Contents> : null}
    </>
  );
}
