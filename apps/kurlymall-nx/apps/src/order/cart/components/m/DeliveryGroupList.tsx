import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import DeliveryGroupContents from '../DeliveryGroupList/DeliveryGroupContents';
import useCartDetailQuery from '../../queries/useCartDetailQuery';

const Wrapper = styled.div`
  padding: ${vars.spacing.$16} ${vars.spacing.$16} ${vars.spacing.$32};
`;

export default function DeliveryGroupList() {
  const { data: cartDetail } = useCartDetailQuery();

  if (!cartDetail) {
    return null;
  }

  return (
    <Wrapper>
      <DeliveryGroupContents cartDetail={cartDetail} />
    </Wrapper>
  );
}
