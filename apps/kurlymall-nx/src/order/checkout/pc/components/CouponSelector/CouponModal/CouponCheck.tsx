import styled from '@emotion/styled';

import SelectedIcon from '../../../../../../shared/components/icons/cart/SelectedIcon';

const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export const CouponCheck = ({ isCheck }: { isCheck: boolean }) => {
  if (!isCheck) return null;

  return (
    <Wrapper>
      <SelectedIcon data-testid="selected-icon" />
    </Wrapper>
  );
};
