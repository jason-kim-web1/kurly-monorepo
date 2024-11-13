import { getContentWithReplaceStyles } from './get-content-with-replace-styles';

describe('getContentWithReplaceStyles', () => {
  context('text prop의 일부가 replaceStyles prop text에 포함되어 있는 경우', () => {
    it.each([
      {
        props: {
          text: '지금 주문하시면\n내일 밤 9시~새벽 1시에 배송될 수 있어요.',
          replaceStyles: [
            {
              text: '밤 9시',
              color: '#5F0080',
              bold: true,
            },
          ],
        },
        expected: [
          { bold: undefined, color: undefined, text: '지금 주문하시면\n내일 ' },
          { bold: true, color: '#5F0080', text: '밤 9시' },
          { bold: undefined, color: undefined, text: '~새벽 1시에 배송될 수 있어요.' },
        ],
      },
      {
        props: {
          text: '지금 주문하시면\n내일 밤 9시~새벽 1시에 배송될 수 있어요.',
          replaceStyles: [
            {
              text: '밤 9시',
              color: '#5F0080',
              bold: true,
            },
            {
              text: '새벽 1시',
              color: '#5F0080',
              bold: true,
            },
          ],
        },
        expected: [
          { bold: undefined, color: undefined, text: '지금 주문하시면\n내일 ' },
          { bold: true, color: '#5F0080', text: '밤 9시' },
          { bold: undefined, color: undefined, text: '~' },
          { bold: true, color: '#5F0080', text: '새벽 1시' },
          { bold: undefined, color: undefined, text: '에 배송될 수 있어요.' },
        ],
      },
      {
        props: {
          text: '지금 주문하시면\n내일 밤 9시~새벽 1시에 배송될 수 있어요.',
          replaceStyles: [
            {
              text: '밤 9시',
              color: '#5F0080',
              bold: true,
            },
            {
              text: '주문',
              color: '#5F0080',
              bold: true,
            },
            {
              text: '새벽 1시',
              color: '#5F0080',
              bold: true,
            },
          ],
        },
        expected: [
          { bold: undefined, color: undefined, text: '지금 ' },
          { bold: true, color: '#5F0080', text: '주문' },
          { bold: undefined, color: undefined, text: '하시면\n내일 ' },
          { bold: true, color: '#5F0080', text: '밤 9시' },
          { bold: undefined, color: undefined, text: '~' },
          { bold: true, color: '#5F0080', text: '새벽 1시' },
          { bold: undefined, color: undefined, text: '에 배송될 수 있어요.' },
        ],
      },
    ])(
      'text, color, bold 값을 가진 Content 배열 오브젝트로 변환 후 Content 배열 오브젝트를 반환한다',
      ({ props, expected }) => {
        expect(getContentWithReplaceStyles(props)).toStrictEqual(expected);
      },
    );
  });

  context('text prop의 일부가 replaceStyles prop text에 포함되어 있지 않는 경우', () => {
    it('text를 Content 배열 오브젝트 형식으로 변환 후 반환한다.', () => {
      const props = {
        text: '지금 주문하시면\n내일 밤 9시~새벽 1시에 배송될 수 있어요.',
        replaceStyles: [
          {
            text: '밤 10시',
            color: '#5F0080',
            bold: true,
          },
        ],
      };

      expect(getContentWithReplaceStyles(props)).toStrictEqual([
        { text: '지금 주문하시면\n내일 밤 9시~새벽 1시에 배송될 수 있어요.' },
      ]);
    });
  });

  context('replaceStyles prop을 넣지 않는 경우', () => {
    it('text를 Content 배열 오브젝트 형식으로 변환 후 반환한다.', () => {
      const props = {
        text: '지금 주문하시면\n내일 밤 9시~새벽 1시에 배송될 수 있어요.',
      };

      expect(getContentWithReplaceStyles(props)).toStrictEqual([
        { text: '지금 주문하시면\n내일 밤 9시~새벽 1시에 배송될 수 있어요.' },
      ]);
    });
  });
});
