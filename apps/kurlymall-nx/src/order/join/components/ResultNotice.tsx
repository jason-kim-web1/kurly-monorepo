import styled from '@emotion/styled';

import InformationList from '../../../shared/components/InformationList/InformationList';
import { getOrderSuccessPolicy } from '../../checkout/shared/utils/getCheckoutCompletePolicy';

const Wrapper = styled.div`
  margin-top: 24px;
`;

export default function ResultNotice() {
  const policyText = getOrderSuccessPolicy({});

  return (
    <Wrapper>
      <InformationList size="medium" contents={policyText} />
    </Wrapper>
  );
}
