import { FilterGroup } from '../../shared/api';
import { createGroupByInitialCharacter } from './productList.service';
import { sentryCaptureError } from '../../shared/services';

jest.mock('../../shared/services');
jest.mock('../../shared/configs/config');

describe('product list service 테스트 코드', () => {
  describe('필터 문자 네비게이터 그룹핑 로직 테스트', () => {
    const brandFilterGroup = <FilterGroup>{
      name: 'brand',
      key: 'brand',
      template: 'sorted_checkbox',
      is_quick: true,
      values: [],
    };

    context('문자가 a와 z 사이에 속하는 소문자 알파벳이라면', () => {
      const brandFilterStartsWithSmallAlphabet = [
        {
          key: 'nw4kt3',
          name: 'KF365',
          value: 'k', // small letter k
          product_counts: 1,
        },
      ];

      brandFilterGroup.values = brandFilterStartsWithSmallAlphabet;
      const filterGroupedByInitialCharacter = createGroupByInitialCharacter(brandFilterGroup);

      // 알파벳으로 시작하는 브랜드 필터가 충분히 많지 않기 때문에, 한글과 다르게 영문은 A-Z로 한번에 그룹핑됨
      it('A-Z로 그룹핑되어 key의 배열을 반환한다.', () => {
        const filterGroupedByAtoZ = filterGroupedByInitialCharacter.get('A-Z');
        expect(filterGroupedByAtoZ).toEqual(['nw4kt3']);
      });
    });

    context('문자가 A와 Z 사이에 속하는 대문자 알파벳이라면', () => {
      const brandFilterStartsWithCapitalAlphabet = [
        {
          key: 'hy9zk3',
          name: "Kurly's",
          value: 'K', // Capital K
          product_counts: 58,
        },
      ];

      brandFilterGroup.values = brandFilterStartsWithCapitalAlphabet;
      const filterGroupedByInitialCharacter = createGroupByInitialCharacter(brandFilterGroup);

      // 영문으로 시작하는 브랜드의 경우, value는 소문자로 내려와야 함
      it('센트리 에러를 보낸다.', () => {
        const error = `브랜드 필터 ${brandFilterStartsWithCapitalAlphabet[0].name}의 value 값이 대문자로 저장되어 있습니다.`;
        expect(sentryCaptureError).toHaveBeenCalledWith(error);
      });

      it('A-Z로 그룹핑되어 key의 배열을 반환한다.', () => {
        const filterGroupedByAtoZ = filterGroupedByInitialCharacter.get('A-Z');
        expect(filterGroupedByAtoZ).toEqual(['hy9zk3']);
      });
    });

    context('문자가 한글 자음이라면', () => {
      const brandFilterStartsWithHangul = [
        {
          key: 'market',
          name: '마켓컬리',
          value: 'ㅁ', // 한글 자음 ㅁ
          product_counts: 8,
        },
        {
          key: 'beauty',
          name: '뷰티컬리',
          value: 'ㅂ', // 한글 자음 ㅂ
          product_counts: 10,
        },
      ];

      brandFilterGroup.values = brandFilterStartsWithHangul;
      const filterGroupedByInitialCharacter = createGroupByInitialCharacter(brandFilterGroup);

      it('각 글자로 그룹핑되어 key의 배열을 반환한다.', () => {
        const filterGroupedByMieum = filterGroupedByInitialCharacter.get('ㅁ');
        expect(filterGroupedByMieum).toEqual(['market']);

        const filterGroupedByBieub = filterGroupedByInitialCharacter.get('ㅂ');
        expect(filterGroupedByBieub).toEqual(['beauty']);
      });
    });

    context('문자가 빈 값으로 내려오면', () => {
      const brandFilterStartsWithEtcLetters = [
        {
          key: 'wxpqux',
          name: '33떡볶이',
          value: '', // 숫자면 빈 값
          product_counts: 1,
        },
        {
          key: 'atsign',
          name: '@유동골뱅이',
          value: '', // 특수문자면 빈 값
          product_counts: 2,
        },
      ];

      brandFilterGroup.values = brandFilterStartsWithEtcLetters;
      const filterGroupedByInitialCharacter = createGroupByInitialCharacter(brandFilterGroup);

      it('ETC로 그룹핑되어 key의 배열을 반환한다.', () => {
        const filterGroupedByETC = filterGroupedByInitialCharacter.get('ETC');
        expect(filterGroupedByETC).toEqual(['wxpqux', 'atsign']);
      });
    });
  });

  describe('필터 문자 네비게이터 그룹핑 순서 테스트', () => {
    const brandFilterValues = [
      {
        key: 'market',
        name: '마켓컬리',
        value: 'ㅁ', // 한글 자음 ㅁ
        product_counts: 8,
      },
      {
        key: 'filter',
        name: '필터',
        value: 'ㅍ', // 한글 자음 ㅍ
        product_counts: 10,
      },
      {
        key: 'nw4kt3',
        name: 'KF365',
        value: 'k', // small letter k
        product_counts: 1,
      },
      {
        key: 'hy9zk3',
        name: "Kurly's",
        value: 'K', // Capital K
        product_counts: 58,
      },
      {
        key: 'wxpqux',
        name: '33떡볶이',
        value: '', // 숫자, 특수문자 외
        product_counts: 1,
      },
      {
        key: 'beauty',
        name: '뷰티컬리',
        value: '', // 숫자, 특수문자 외
        product_counts: 10,
      },
    ];

    const brandFilterGroup = <FilterGroup>{
      name: 'brand',
      key: 'brand',
      template: 'sorted_checkbox',
      is_quick: true,
      values: brandFilterValues,
    };

    context('brandFilterValues가 한글 자모 -> A-Z -> ETC 순서로 내려온다면', () => {
      const filterGroupedByInitialCharacter = createGroupByInitialCharacter(brandFilterGroup);

      // 해당 로직에 대한 프론트의 처리 없이 서버에서 내려온 순서대로 그룹핑됨
      it('전체 -> 한글 자모 -> A-Z -> ETC 순서로 그룹핑된다.', () => {
        const filterGroupKeys = Array.from(filterGroupedByInitialCharacter.keys());
        expect(filterGroupKeys).toStrictEqual(['전체', 'ㅁ', 'ㅍ', 'A-Z', 'ETC']);
      });

      it('전체 및 각 문자에 알맞게 그룹핑되어 각 key들의 배열을 반환한다.', () => {
        const filterGroupValues = Array.from(filterGroupedByInitialCharacter.values());
        expect(filterGroupValues).toStrictEqual([
          ['market', 'filter', 'nw4kt3', 'hy9zk3', 'wxpqux', 'beauty'], // '전체'
          ['market'], // 'ㅁ'
          ['filter'], // 'ㅍ'
          ['nw4kt3', 'hy9zk3'], // 'A-Z'
          ['wxpqux', 'beauty'], // 'ETC'
        ]);
      });
    });
  });
});
