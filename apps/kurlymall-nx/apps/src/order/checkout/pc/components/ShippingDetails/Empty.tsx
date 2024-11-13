import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const Message = styled.p`
  color: ${COLOR.invalidRed};
  font-size: 14px;
  line-height: 24px;
`;

interface Props {
  text: string;
}

export default function Empty({ text }: Props) {
  return <Message>{text}</Message>;
}
