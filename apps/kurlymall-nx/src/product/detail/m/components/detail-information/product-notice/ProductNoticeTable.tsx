import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import COLOR from '../../../../../../shared/constant/colorset';

const Container = styled.div`
  padding: 0 16px;
  margin-top: 7px;
`;

const BlankRowBox = styled.div`
  width: 100%;
  min-height: 220px;
`;

const TableWrapper = styled.dl`
  display: flex;
  border-top: 1px solid ${COLOR.kurlyGray200};
  font-size: 14px;
  line-height: 19px;

  &:first-of-type {
    border-top: none;
  }
`;

const ItemKey = styled.dt`
  width: 102px;
  padding: 12px 0 12px;
  word-break: break-all;
  white-space: pre-line;
`;

const ItemValue = styled.dd`
  display: flex;
  flex: 1;
  padding: 11px 14px 12px;
  color: ${COLOR.kurlyGray600};
  word-break: break-all;
  white-space: pre-line;
`;

interface Props {
  notice: {
    title: string;
    description: string;
  }[];
}

export default function ProductNoticeTable({ notice }: Props) {
  return (
    <Container>
      {isEmpty(notice) ? (
        <BlankRowBox />
      ) : (
        notice.map(({ title, description }) => (
          <TableWrapper key={title}>
            <ItemKey>{title}</ItemKey>
            <ItemValue>{description}</ItemValue>
          </TableWrapper>
        ))
      )}
    </Container>
  );
}
