export const filterDataFixture = [
  {
    key: 'category',
    name: '카테고리',
    template: 'checkbox',
    isQuick: true,
    values: [
      {
        key: '912005',
        name: '떡볶이·튀김·순대',
        value: '',
        productCounts: 24,
      },
      {
        key: '249001',
        name: '과자·스낵·쿠키',
        value: '',
        productCounts: 17,
      },
      {
        key: '912001',
        name: '샐러드·닭가슴살',
        value: '',
        productCounts: 10,
      },
    ],
    groupByKey: {
      '912005': {
        key: '912005',
        name: '떡볶이·튀김·순대',
        value: '',
        productCounts: 24,
      },
      '249001': {
        key: '249001',
        name: '과자·스낵·쿠키',
        value: '',
        productCounts: 17,
      },
      '912001': {
        key: '912001',
        name: '샐러드·닭가슴살',
        value: '',
        productCounts: 10,
      },
    },
    keyList: ['912005', '249001', '912001'],
    sortedKeyList: ['912005', '249001', '912001'],
  },
  {
    key: 'price',
    name: '가격',
    template: 'radio_button',
    isQuick: true,
    values: [
      {
        key: '-3700',
        name: '3,700원 미만',
        value: '',
        productCounts: 0,
      },
      {
        key: '3700-5200',
        name: '3,700원 ~ 5,200원',
        value: '',
        productCounts: 0,
      },
      {
        key: '5200-',
        name: '5,200원 이상',
        value: '',
        productCounts: 0,
      },
    ],
    groupByKey: {
      '-3700': {
        key: '-3700',
        name: '3,700원 미만',
        value: '',
        productCounts: 0,
      },
      '3700-5200': {
        key: '3700-5200',
        name: '3,700원 ~ 5,200원',
        value: '',
        productCounts: 0,
      },
      '5200-': {
        key: '5200-',
        name: '5,200원 이상',
        value: '',
        productCounts: 0,
      },
    },
    keyList: ['-3700', '3700-5200', '5200-'],
    sortedKeyList: ['-3700', '3700-5200', '5200-'],
  },
  {
    key: 'brand',
    name: '브랜드',
    template: 'sorted_checkbox',
    isQuick: true,
    values: [
      {
        key: 'xcw9an',
        name: '감자밭',
        value: '',
        productCounts: 3,
      },
      {
        key: 'bnozy0',
        name: '곰표x콜린스그린',
        value: '',
        productCounts: 1,
      },
      {
        key: 'upxayf',
        name: '교촌',
        value: '',
        productCounts: 1,
      },
    ],
    groupByKey: {
      xcw9an: {
        key: 'xcw9an',
        name: '감자밭',
        value: '',
        productCounts: 3,
      },
      bnozy0: {
        key: 'bnozy0',
        name: '곰표x콜린스그린',
        value: '',
        productCounts: 1,
      },
      upxayf: {
        key: 'upxayf',
        name: '교촌',
        value: '',
        productCounts: 1,
      },
    },
    keyList: ['xcw9an', 'bnozy0', 'upxayf'],
    sortedKeyList: ['xcw9an', 'bnozy0', 'upxayf'],
  },
  {
    key: 'benefit',
    name: '혜택',
    template: 'checkbox',
    isQuick: true,
    values: [
      {
        key: 'limited',
        name: '한정수량',
        value: '',
        productCounts: 6,
      },
    ],
    groupByKey: {
      limited: {
        key: 'limited',
        name: '한정수량',
        value: '',
        productCounts: 6,
      },
    },
    keyList: ['limited'],
    sortedKeyList: ['limited'],
  },
  {
    key: 'type',
    name: '유형',
    template: 'checkbox',
    isQuick: true,
    values: [
      {
        key: 'kurly_only',
        name: 'Kurly Only',
        value: '',
        productCounts: 37,
      },
    ],
    groupByKey: {
      kurly_only: {
        key: 'kurly_only',
        name: 'Kurly Only',
        value: '',
        productCounts: 37,
      },
    },
    keyList: ['kurly_only'],
    sortedKeyList: ['kurly_only'],
  },
  {
    key: 'exclusion',
    name: '특정상품 제외',
    template: 'checkbox',
    isQuick: true,
    values: [
      {
        key: 'exclude_pet',
        name: '반려동물 상품',
        value: '',
        productCounts: 3,
      },
    ],
    groupByKey: {
      exclude_pet: {
        key: 'exclude_pet',
        name: '반려동물 상품',
        value: '',
        productCounts: 3,
      },
    },
    keyList: ['exclude_pet'],
    sortedKeyList: ['exclude_pet'],
  },
];
