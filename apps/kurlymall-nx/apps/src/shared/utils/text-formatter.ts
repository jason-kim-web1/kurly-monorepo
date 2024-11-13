import { css } from '@emotion/react';

import {
  EMOJI_REGEX,
  ONLY_TEXT_WITHOUT_SPACE_REGEX,
  KEYBOARD_SPECIAL_CHARACTERS,
  getAllowHangul,
  AVAILABLE_SPECIAL_CHARACTERS_REGEX,
} from '../constant';

// 말줄임 처리 CSS
export const multiMaxLineText = (line = 2) => css`
  display: -webkit-box;
  overflow: hidden;
  word-break: break-all;
  white-space: normal;
  -webkit-line-clamp: ${line};
  -webkit-box-orient: vertical;
`;

// 미지원 문자열 필터링
export const findNotAllowText = (text: string) => {
  // 1차 : 이모지를 거른다.
  const removeEmoji: string = text.replace(EMOJI_REGEX, '');

  // 2차 : 영어, 숫자, 특수문자를 거른다.
  const removeNotKorean: string = removeEmoji?.replace(
    /[a-z|A-Z|0-9| |(|)|~|\-|.|,|@|#|*|'|/|^|+|!|<|>|:|☆|[|\]|;|"|_|★|”|“|’|‘|→|×|♤|※|♧|ⅰ|ⅱ|ⅲ|ⅳ|ⅴ|ⅵ|ⅶ|ⅷ|ⅸ|ⅹ|Ⅰ|Ⅱ|Ⅲ|Ⅳ|Ⅴ|Ⅵ|Ⅶ|Ⅷ|Ⅸ|Ⅹ]/g,
    '',
  );

  // 3차 : 미지원 문자열을 찾는다.
  const isNotAllowText: RegExpMatchArray = removeNotKorean.match(ONLY_TEXT_WITHOUT_SPACE_REGEX) || [];

  // 이모지가 정규식으로 제대로 걸러지지 않으므로 다시 한번 거릅니다.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredEmojiSpace = isNotAllowText?.reduce((acc: any, cur: any) => {
    if (cur.charCodeAt(0) !== 65039) {
      acc.push(cur);
    }
    return acc;
  }, []);

  return filteredEmojiSpace;
};

/**
 * 문자열에서 허용하지 않는 문자를 제거한 문자열을 return 한다.
 *
 * @param str 입력 값에 입력한 문자열
 * @param notAllowedText 허용하지 않는 문자의 배열
 * @returns 입력 문자열에서 허용하지 않는 문자들을 제거한 문자열
 */
export const reformattedString = (str: string, notAllowedText: string[]) => {
  return str.replace(new RegExp(`[${notAllowedText.join('|')}]`, 'g'), '');
};

/**
 * 입력 문자열에서 허용하지 않는 문자들을 반환한다.
 *
 * @param text 입력된 문자열
 * @param isAddressField 배송지 등록/수정 필드 여부 (예외적으로 더블 언더바(__)가 비허용됨)
 * @returns 허용하지 않는 단어들이 있는 배열
 */

const NOT_ALLOWED_TEXT = '__';
export const notAllowedCharacters = (text: string, isAddressField: boolean) => {
  const filteredText = Array.from(
    text
      .replace(AVAILABLE_SPECIAL_CHARACTERS_REGEX, '')
      .replace(new RegExp(`[${getAllowHangul()}]`, 'g'), '')
      .replace(/[A-Za-z0-9]/g, '')
      .replace(new RegExp(`(?:[${KEYBOARD_SPECIAL_CHARACTERS}])+`, 'g'), ''),
  );

  const invalidAddressField = isAddressField && text.includes(NOT_ALLOWED_TEXT);

  if (invalidAddressField) {
    return [...filteredText, NOT_ALLOWED_TEXT];
  }

  return filteredText;
};

export const splitTexts = (text: string) =>
  text
    .replace(/<br\/?>/g, '\n')
    .split('\n')
    .map((it, index) => ({ id: index, text: it }));
