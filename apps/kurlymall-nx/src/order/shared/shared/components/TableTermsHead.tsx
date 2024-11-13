import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { isPC } from '../../../../../util/window/getDevice';

const TableHead = styled.th`
  font-size: 14px;
  font-weight: ${isPC ? 500 : 600};
  line-height: 19px;
  background-color: ${COLOR.kurlyGray100};
`;

export function TableTermsHead({ tableHead }: { tableHead: string[] }) {
  return (
    <thead>
      <tr>
        {tableHead.map((title) => {
          return <TableHead key={title}>{title}</TableHead>;
        })}
      </tr>
    </thead>
  );
}
