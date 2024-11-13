import { isNull } from 'lodash';

import styled from '@emotion/styled';

import { PickupPlace } from '../../../shared/interfaces';
import COLOR from '../../../../../shared/constant/colorset';
import { isPC } from '../../../../../../util/window/getDevice';

const List = styled.ul`
  display: flex;
  margin-top: ${isPC ? 12 : 8}px;
`;

const Item = styled.li`
  padding: 4px 6px;
  background-color: ${COLOR.bg};
  border-radius: 4px;
  color: ${COLOR.kurlyGray500};
  font-size: 12px;
  font-weight: ${isPC ? 500 : 600};
  + li {
    margin-left: 8px;
  }
`;

export default function SpecialInformation({
  closeWeekend,
  specialInformation,
}: Pick<PickupPlace, 'closeWeekend' | 'specialInformation'>) {
  if (!closeWeekend && isNull(specialInformation)) {
    return null;
  }

  return (
    <List>
      {closeWeekend && <Item>주말 휴무</Item>}
      {specialInformation && <Item>{specialInformation}</Item>}
    </List>
  );
}
