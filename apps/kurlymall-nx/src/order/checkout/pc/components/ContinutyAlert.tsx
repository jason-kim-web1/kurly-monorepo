import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { ContinuityMessageBasicStyle, ContinuityMessageReplaceStyle } from '../../shared/interfaces';
import Alert from '../../../../shared/components/Alert/Alert';
import ContinutyTextContent from './ContinutyTextContent';

const defaultFontWeight = {
  default: 400,
  bold: 500,
};

const Text = styled.p<{ color?: string; bold?: boolean }>`
  font-weight: ${({ bold }) => (bold ? defaultFontWeight.bold : defaultFontWeight.default)};
  color: ${({ color }) => (color ? color : COLOR.kurlyGray800)};
`;

export default async function ContinuityAlert({
  message,
  basicStyle,
  replaceStyles,
}: {
  message: string;
  basicStyle?: ContinuityMessageBasicStyle;
  replaceStyles?: ContinuityMessageReplaceStyle[];
}) {
  const result = await Alert({
    contents: (
      <Text color={basicStyle?.color} bold={basicStyle?.bold}>
        <ContinutyTextContent message={message} basicStyle={basicStyle} replaceStyles={replaceStyles} />
      </Text>
    ),
    confirmButtonText: '계속 주문하기',
  });

  return result;
}
