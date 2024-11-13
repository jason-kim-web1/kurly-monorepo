import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

const Message = styled.div`
  padding-top: 18px;
  font-size: 16px;
  color: ${COLOR.kurlyGray400};
  line-height: 20px;
`;

interface Props {
  value: string;
}

export default function NoDataMessage({ value }: Props) {
  return <Message>{value}</Message>;
}
