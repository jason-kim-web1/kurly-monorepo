import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Count = styled.span`
  font-size: 14px;
  line-height: 18px;
  color: ${COLOR.kurlyGray800};
`;

export default function FavoriteListCount({ favoriteListSize }: { favoriteListSize: number }) {
  return <Count>총 {favoriteListSize}개</Count>;
}
