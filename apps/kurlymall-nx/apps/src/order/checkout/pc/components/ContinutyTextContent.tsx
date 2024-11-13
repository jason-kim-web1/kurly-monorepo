import { ContinuityMessageBasicStyle, ContinuityMessageReplaceStyle } from '../../shared/interfaces';
import { getContentWithReplaceStyles } from '../../../../shared/utils/get-content-with-replace-styles';

export default function ContinutyTextContent({
  message,
  basicStyle,
  replaceStyles,
  defaultFontWeight = {
    default: 400,
    bold: 500,
  },
}: {
  message: string;
  basicStyle?: ContinuityMessageBasicStyle;
  replaceStyles?: ContinuityMessageReplaceStyle[];
  defaultFontWeight?: {
    default: number;
    bold: number;
  };
}) {
  const contents = getContentWithReplaceStyles({ text: message, replaceStyles });

  return (
    <>
      {contents.map(({ text, color, bold }) => {
        const isTextBold = bold ?? basicStyle?.bold;
        const fontWeight = isTextBold ? defaultFontWeight.bold : defaultFontWeight.default;

        return (
          <span
            key={text}
            style={{
              color,
              fontWeight,
            }}
          >
            {text}
          </span>
        );
      })}
    </>
  );
}
