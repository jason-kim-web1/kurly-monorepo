import { notAllowedCharacters, reformattedString, splitTexts } from './text-formatter';

describe('허용하지 않는 문자 찾기', () => {
  context('허용하지 않는 문자가 있으면', () => {
    it('허용하지 않는 문자 전체의 배열을 return 한다.', () => {
      const text =
        '😀😃🤓🤓🤓abc123뷁!@# ()~-.,@#*\'/^+!<>:☆[];"_★”“’‘→×♤※♧ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ$%&&%$%$가나^다a&bc123!@#';

      const result = notAllowedCharacters(text, false);
      expect(result).toEqual(['😀', '😃', '🤓', '🤓', '🤓', '뷁', '$', '%', '&', '&', '%', '$', '%', '$', '&']);
    });
  });

  context('허용하지 않는 한글이 있으면', () => {
    it('허용하지 않는 문자의 배열을 return 한다.', () => {
      const text = '가나다뷁333';

      const result = notAllowedCharacters(text, false);

      expect(result).toEqual(['뷁']);
    });
  });

  context('허용하지 않는 문자가 없으면', () => {
    it('빈 배열을 반환한다.', () => {
      const text = '가나다라1234abcd';

      const result = notAllowedCharacters(text, false);

      expect(result).toEqual([]);
    });
  });
});

describe('reformattedString 테스트', () => {
  context('문자열, 허용하지 않는 문자 배열이 입력되면', () => {
    const text = '인천$ 남구 뷁학익동 %&🤓🤣😛!@#$%^&*()';
    const notAllowed = notAllowedCharacters(text, false);

    it('허용하지 않는 문자들을 제거한 문자열을 반환한다.', () => {
      const result = reformattedString(text, notAllowed);

      expect(result).toBe('인천 남구 학익동 !@#^*()');
    });
  });

  context('문자열이 빈 문자열이면', () => {
    const text = '';
    const notAllowed = notAllowedCharacters(text, false);

    it('빈 문자열 그대로 반환한다.', () => {
      const result = reformattedString(text, notAllowed);

      expect(result).toBe('');
    });
  });
});

describe('splitTexts', () => {
  context('<br/> 이 들어간 텍스트', () => {
    given('text', () => '강남구<br/>컬리<br/>15층');
    it('텍스트를 분리하여 보여준다.', () => {
      const result = splitTexts(given.text);

      expect(result).toStrictEqual([
        {
          id: 0,
          text: '강남구',
        },
        {
          id: 1,
          text: '컬리',
        },
        {
          id: 2,
          text: '15층',
        },
      ]);
    });
  });

  context('\n 이 들어간 텍스트', () => {
    given('text', () => '강남구\n컬리\n15층');
    it('텍스트를 분리하여 보여준다.', () => {
      const result = splitTexts(given.text);

      expect(result).toStrictEqual([
        {
          id: 0,
          text: '강남구',
        },
        {
          id: 1,
          text: '컬리',
        },
        {
          id: 2,
          text: '15층',
        },
      ]);
    });
  });
});

describe('배송지 등록/수정 필드일때, 더블 언더바 (__) 테스트', () => {
  context('_ 가 1개만 입력되면', () => {
    it('빈 배열을 반환한다.', () => {
      const text = '인천시 남구 학익동 _';

      const result = notAllowedCharacters(text, true);

      expect(result).toEqual([]);
    });
  });

  context('_ 가 2개 입력되면', () => {
    it('_ 2개 배열을 리턴한다.', () => {
      const text = '인천시 남구 학익동 __';

      const result = notAllowedCharacters(text, true);
      expect(result).toEqual(['__']);
    });
  });
});
