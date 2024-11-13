import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { PICKUP_POLICY } from '../../shared/constants/order-success-policy';

const Text = styled.li`
  position: relative;
  padding: 0 6px 0 7px;
  font-size: 12px;
  color: ${COLOR.kurlyGray450};
  line-height: 16px;

  + li {
    margin-top: 4px;
  }

  &:before {
    content: '・';
    position: absolute;
    left: -2px;
    top: 0;
    width: 8px;
    font-size: 12px;
    text-align: center;
  }
`;

const List = styled.ul`
  padding-top: 14px;
`;

export default function PickupTerms() {
  return (
    <List>
      {PICKUP_POLICY.map((policy) => (
        <Text key={policy}>{policy}</Text>
      ))}
    </List>
  );
}
