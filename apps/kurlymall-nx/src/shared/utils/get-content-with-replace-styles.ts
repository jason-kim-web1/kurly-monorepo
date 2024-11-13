import { ContinuityMessageReplaceStyle } from '../../order/checkout/shared/interfaces';

interface Content {
  text: string;
  color?: string;
  bold?: boolean;
}

/**
 * text prop의 일부가 replaceStyles prop text에 포함되어 있는 경우 text, color, bold 값을 가진 Content 배열 오브젝트로 변환합니다.
 * 그 후 Content 배열 오브젝트를 반환합니다.
 *
 * @param { string } param.text 텍스트 값
 * @param { ContinuityMessageReplaceStyle } param.replaceStyles replaceStyles 값
 * @return { Content[] } text, color, bold 값을 가진 배열 오브젝트
 */
export const getContentWithReplaceStyles = ({
  text,
  replaceStyles,
}: {
  text: string;
  replaceStyles?: ContinuityMessageReplaceStyle[];
}) => {
  if (!replaceStyles) {
    return [{ text }];
  }

  return replaceStyles.reduce(
    (contents: Content[], replaceStyle) =>
      contents.reduce((result: Content[], content) => {
        if (content.text.includes(replaceStyle.text)) {
          const splitMessage = content.text.split(replaceStyle.text);

          if (splitMessage[0] !== '') {
            result.push({ text: splitMessage[0], color: content.color, bold: content.bold });
          }

          result.push({ text: replaceStyle.text, color: replaceStyle.color, bold: replaceStyle.bold });

          if (splitMessage[1] !== '') {
            result.push({ text: splitMessage[1], color: content.color, bold: content.bold });
          }
        } else {
          result.push(content);
        }

        return result;
      }, []),
    [{ text }],
  );
};
