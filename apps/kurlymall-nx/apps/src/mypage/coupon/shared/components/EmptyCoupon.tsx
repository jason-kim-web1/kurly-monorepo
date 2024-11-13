import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { isPC } from '../../../../../util/window/getDevice';

const Wrapper = styled.div`
  width: 100%;
  font-size: 16px;
  color: ${COLOR.kurlyGray450};

  &.pc {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 700px;
  }
  &.mobile {
    padding-top: 28vh;
    text-align: center;
  }
`;

interface Props {
  text: string;
}

export default function EmptyCoupon({ text }: Props) {
  return <Wrapper className={isPC ? 'pc' : 'mobile'}>{text}</Wrapper>;
}
