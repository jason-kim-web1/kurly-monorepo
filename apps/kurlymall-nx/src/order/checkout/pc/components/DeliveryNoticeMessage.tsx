import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { ContinuityMessageBasicStyle, ContinuityMessageReplaceStyle } from '../../shared/interfaces';
import ContinutyTextContent from './ContinutyTextContent';

const defaultFontWeight = {
  default: 400,
  bold: 500,
};

const Wrapper = styled.div<{ color?: string; bold?: boolean }>`
  width: 284px;
  padding: 20px 22.5px;
  border: solid 1px ${COLOR.btnGray};
  border-top: none;
  background-color: ${COLOR.kurlyWhite};
  font-size: 12px;
  font-weight: ${({ bold }) => (bold ? defaultFontWeight.bold : defaultFontWeight.default)};
  line-height: 20px;
  text-align: center;
  color: ${({ color }) => (color ? color : COLOR.kurlyGray800)};
  white-space: pre-line;
  font-weight: 500;
`;

export default function DeliveryNoticeMessage({
  message,
  basicStyle,
  replaceStyles,
}: {
  message: string;
  basicStyle?: ContinuityMessageBasicStyle;
  replaceStyles?: ContinuityMessageReplaceStyle[];
}) {
  if (!message) {
    return null;
  }

  if (!basicStyle || !replaceStyles) {
    return <Wrapper>{message}</Wrapper>;
  }

  return (
    <Wrapper color={basicStyle?.color} bold={basicStyle?.bold}>
      <ContinutyTextContent message={message} basicStyle={basicStyle} replaceStyles={replaceStyles} />
    </Wrapper>
  );
}
