import styled from '@emotion/styled';

import { emptyResultText } from '../../../../search/shared/constants';
import { ExclamationMark } from '../../../../shared/icons';
import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  height: 555px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Text = styled.div`
  font-size: 16px;
  color: ${COLOR.benefitTextGray};
`;

const EmptyProduct = () => {
  return (
    <Container>
      <ExclamationMark stroke={COLOR.noResultExclamationMark} fill={COLOR.noResultExclamationMark} />
      <Text>{emptyResultText.default}</Text>
    </Container>
  );
};

export { EmptyProduct };
