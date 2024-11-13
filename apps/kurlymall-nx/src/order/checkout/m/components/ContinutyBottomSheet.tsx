import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { ContinuityMessageBasicStyle, ContinuityMessageReplaceStyle } from '../../shared/interfaces';
import BottomSheet from '../../../../shared/components/BottomSheet/BottomSheet';
import ContinutyTextContent from '../../pc/components/ContinutyTextContent';

const defaultFontWeight = {
  default: 400,
  bold: 600,
};

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 16px 8px 32px;
`;

const Text = styled.p<{ color?: string; bold?: boolean }>`
  font-size: 18px;
  font-weight: ${({ bold }) => (bold ? defaultFontWeight.bold : defaultFontWeight.default)};
  line-height: 23px;
  color: ${({ color }) => (color ? color : COLOR.kurlyGray800)};
  text-align: center;
`;

const SimpleStyleSubText = styled.p`
  width: 100%;
  background: #f9f6fc;
  border-radius: 6px;
  text-align: center;
  margin: 16px 0 0;
  padding: 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.loversLavender};
`;

export default async function ContinuityBottomSheet({
  message,
  subMessage,
  basicStyle,
  replaceStyles,
  showSubText = true,
  showCancelButton = true,
  confirmButtonText = '결제하기',
}: {
  message: string;
  subMessage?: string;
  basicStyle?: ContinuityMessageBasicStyle;
  replaceStyles?: ContinuityMessageReplaceStyle[];
  showSubText?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
}) {
  const isSimpleStyle = !!subMessage;

  const result = await BottomSheet({
    showCancelButton,
    confirmButtonText,
    contents: (
      <Contents>
        <Text color={basicStyle?.color} bold={basicStyle?.bold}>
          <ContinutyTextContent
            message={message}
            basicStyle={basicStyle}
            replaceStyles={replaceStyles}
            defaultFontWeight={defaultFontWeight}
          />
        </Text>
        {showSubText && isSimpleStyle && <SimpleStyleSubText>{subMessage}</SimpleStyleSubText>}
      </Contents>
    ),
  });

  return result;
}
