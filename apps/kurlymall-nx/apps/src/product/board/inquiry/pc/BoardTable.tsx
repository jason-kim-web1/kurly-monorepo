import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { ProductInquiryPostItem } from '../types';
import BoardTableBody from './BoardTableBody';

const Container = styled.div``;

const Table = styled.table`
  width: 100%;
`;

const Thead = styled.thead`
  height: 58px;
  tr {
    th {
      font-weight: 500;
      letter-spacing: -0.5px;
      color: ${COLOR.kurlyGray800};
    }
    .title {
      width: 710px;
    }
    .author,
    .created-date,
    .status {
      width: 100px;
    }
  }
  border-top: 2px solid ${COLOR.kurlyGray800};
  border-bottom: 1px solid ${COLOR.kurlyGray800};
`;

interface Props {
  items: ProductInquiryPostItem[];
  pageSize: number;
  loading: boolean;
  isError: boolean;
}

export default function BoardTable({ items, pageSize, loading, isError }: Props) {
  return (
    <Container>
      <Table>
        <Thead>
          <tr>
            <th className="title">제목</th>
            <th className="author">작성자</th>
            <th className="created-date">작성일</th>
            <th className="status">답변상태</th>
          </tr>
        </Thead>
        <BoardTableBody items={items} pageSize={pageSize} loading={loading} isError={isError} />
      </Table>
    </Container>
  );
}
