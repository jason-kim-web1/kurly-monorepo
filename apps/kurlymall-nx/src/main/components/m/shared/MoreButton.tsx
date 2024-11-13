import styled from '@emotion/styled';

import { categoryArrowButton } from '../../../../shared/images';
import COLOR from '../../../../shared/constant/colorset';

const Container = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: normal;
  color: ${COLOR.mainPurple};
  white-space: nowrap;
  padding-left: 6px;
  img {
    width: 18px;
  }
`;

export function ButtonMore() {
  return (
    <Container>
      전체보기
      <img src={categoryArrowButton} alt="더보기" loading="lazy" />
    </Container>
  );
}
