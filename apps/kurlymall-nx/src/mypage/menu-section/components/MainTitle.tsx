import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

const Title = styled.div`
  width: 100%;
  padding: 12px 0 6px;
  font-weight: 400;
  line-height: 20px;
  color: ${COLOR.kurlyGray400};
`;

interface Props {
  title: string;
}

export default function MainTitle({ title }: Props) {
  return <Title>{title}</Title>;
}
