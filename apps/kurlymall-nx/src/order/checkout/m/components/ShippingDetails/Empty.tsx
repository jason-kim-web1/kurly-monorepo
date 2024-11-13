import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

import AddressArrowIcon from '../../../../../shared/components/icons/order/checkout/AddressArrowIcon';

const Message = styled.p<{ fontSize: number; fontWeight: number; lineHeight: number }>`
  color: ${COLOR.invalidRed};
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight}px;
  line-height: ${({ lineHeight }) => lineHeight}px;
`;

interface Props {
  text: string;
  hasArrow?: boolean;
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
}

export default function Empty({ text, hasArrow, fontSize = 16, fontWeight = 500, lineHeight = 21 }: Props) {
  return (
    <Message fontSize={fontSize} fontWeight={fontWeight} lineHeight={lineHeight}>
      {text}
      {hasArrow && <AddressArrowIcon />}
    </Message>
  );
}
