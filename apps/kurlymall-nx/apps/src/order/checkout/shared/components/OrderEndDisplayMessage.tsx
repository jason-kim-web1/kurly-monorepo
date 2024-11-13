import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { DisplayMessage } from '../../../../shared/interfaces';
import { getContentWithReplaceStyles } from '../../../../shared/utils/get-content-with-replace-styles';
import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.div<{ backgroundColor: string; subText: string }>`
  display: flex;
  flex-direction: column;
  padding: ${({ subText }) => `${subText ? '15px' : vars.spacing.$16} ${vars.spacing.$20}`};
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin-bottom: ${vars.spacing.$8};
  border-radius: 6px;
`;

const MainText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;
  font-size: 13px;
  line-height: 18px;
`;

const SubText = styled.div`
  margin-top: ${vars.spacing.$4};
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray500};
`;

export default function OrderEndDisplayMessage({
  displayMessage,
  defaultFontWeight = {
    default: 400,
    bold: 600,
  },
}: {
  displayMessage: DisplayMessage;
  defaultFontWeight?: {
    default: number;
    bold: number;
  };
}) {
  const {
    deliveryNotice: { text, basicStyle, replaceStyles },
  } = displayMessage;

  const contents = getContentWithReplaceStyles({ text, replaceStyles });

  return (
    <Wrapper backgroundColor={basicStyle.backgroundColor} subText={displayMessage.deliveryNotice.subText}>
      <MainText>
        {contents.map(({ text: contentText, color, bold }) => {
          const isTextBold = bold ?? basicStyle?.bold;
          const fontWeight = isTextBold ? defaultFontWeight.bold : defaultFontWeight.default;

          return (
            <span
              key={contentText}
              style={{
                color,
                fontWeight,
              }}
            >
              {contentText}
            </span>
          );
        })}
      </MainText>
      {displayMessage.deliveryNotice.subText && <SubText>{displayMessage.deliveryNotice.subText}</SubText>}
    </Wrapper>
  );
}
