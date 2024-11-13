import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Title = styled.strong`
  display: block;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: normal;
  color: ${COLOR.kurlyGray400};
`;

export default function EmptyTitle() {
  return <Title>찜한 상품이 없습니다.</Title>;
}
