import styled from '@emotion/styled';

import { Divider } from '../../../../shared/components/Divider/Divider';
import { ContinuityMessageBasicStyle, ContinuityMessageReplaceStyle } from '../../shared/interfaces';
import COLOR from '../../../../shared/constant/colorset';
import ContinutyTextContent from '../../pc/components/ContinutyTextContent';

const defaultFontWeight = {
  default: 400,
  bold: 700,
};

const Wrapper = styled.p<{ color?: string; bold?: boolean }>`
  padding: 20px;
  font-size: 14px;
  font-weight: ${({ bold }) => (bold ? defaultFontWeight.bold : defaultFontWeight.default)};
  line-height: 19px;
  white-space: pre-line;
  color: ${({ color }) => (color ? color : COLOR.kurlyGray800)};
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
    return (
      <>
        <Wrapper>{message}</Wrapper>
        <Divider />
      </>
    );
  }

  return (
    <>
      <Wrapper color={basicStyle?.color} bold={basicStyle?.bold}>
        <ContinutyTextContent
          message={message}
          basicStyle={basicStyle}
          replaceStyles={replaceStyles}
          defaultFontWeight={defaultFontWeight}
        />
      </Wrapper>
      <Divider />
    </>
  );
}
