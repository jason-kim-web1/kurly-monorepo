import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Tr = styled.tr`
  td {
    font-size: 16px;
    font-weight: 500;
    color: ${COLOR.kurlyGray800};
    padding: 117px 0;
    text-align: center;
    cursor: default;
  }
`;

interface Props {
  message: string;
}

export default function BoardTableBodyMessage({ message }: Props) {
  return (
    <tbody>
      <Tr>
        <td colSpan={4}>{message}</td>
      </Tr>
    </tbody>
  );
}
