import type { ShowcaseDataResponse } from '../types/reponse';

const SHOWCASE_FIXTURE: ShowcaseDataResponse = {
  data: {
    collectionSetCode: '146',
    INTRO_A: {
      titleList: ['SHOW', 'CASE'],
      startDate: '2024-07-01',
      endDate: '2024-07-30',
      image: 'https://res.kurly.com/events/showcase/202407/main-2.jpg',
      meta: {
        bgColor: '#000',
      },
    },
    INTRO_B: {
      bgImage: 'https://res.kurly.com/events/showcase/202407/main-2.jpg',
      elementMap: [
        [
          {
            type: 'text',
            value: '깐깐한',
            isOuterLine: false,
          },
          {
            type: 'image',
            value: 'https://res.kurly.com/events/showcase/202407/teaser-b/product-element-1.png',
            isOuterLine: false,
          },
          {
            type: 'text',
            value: '기준',
            isOuterLine: false,
          },
        ],
        [
          {
            type: 'text',
            value: '컬리만의',
            isOuterLine: false,
          },
          {
            type: 'svg',
            value: 'CARROT_ARROW',
            isOuterLine: false,
          },
        ],
        [
          {
            type: 'image',
            value: 'https://res.kurly.com/events/showcase/202407/teaser-b/product-element-2.png',
            isOuterLine: false,
          },
          {
            type: 'text',
            value: '7월 신상품',
            isOuterLine: true,
          },
        ],
        [
          {
            type: 'text',
            value: '쇼케이스',
            isOuterLine: false,
          },
          {
            type: 'gif',
            value: 'https://res.kurly.com/events/showcase/202407/teaser-b/product-element-3.png',
            isOuterLine: false,
          },
        ],
      ],
      subDescription: '컬리 상품위원회의 70개가 넘는\n깐깐한 기준을 통과했습니다.\n6월에 선택된 신제품을 만나보세요',
    },
    productList: [
      {
        contentNo: 1000611361,
        name: '모모스커피 싱글오리진 원두',
        price: 16000,
        discountRate: 0,
        status: {
          isPurchase: false,
          isSoldOut: false,
        },
        contentList: [
          {
            type: 'INTRO_A',
            title: '모모스커피\n싱글오리진 원두',
            content: [
              {
                description: '초여름에 어울리는 산뜻한 원두로 찾아왔어요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-1-1.jpg',
              },
            ],
          },
          {
            type: 'INTRO_B',
            title: '복숭아, 오렌지와 같은\n달콤함과 산미가 전해진\n답니다.',
            content: [
              {
                description:
                  '에티오피아 라레사 농장에서 수확한 원두를 로스팅해 산뜻한 풍미를 자랑해요. 기분 좋은 산미와 복숭아, 오렌지를 연상시키는 과일 풍미, 그리고 자스민의 은은한 여운이 오래 지속됩니다.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-1-2.jpg',
              },
            ],
          },
          {
            type: 'INTRO_C',
            title: '부산 스페셜티 커피의 자존심, 모모스커피',
            content: [
              {
                description:
                  '부산으로 커피 투어를 떠나는 사람이라면 꼭 들러야 하는 곳이 있습니다. 오랜 시간 부산에서 묵묵히 자리를 지켜오며 스페셜티 커피를 소개해온 모모스 커피예요.\n\n모모스 커피의 전주연 바리스타는 2019년 월드 바리스타 챔피언쉽 우승이라는 값진 영광을 거두기도 했는데요, 커피를 즐기는 사람과 커피를 만드는 사람 그리고 커피를 키워낸 생산자가 함께 행복하길 바라는 마음으로 오늘도 한 잔 한 잔의 커피에 온 정성을 쏟고 있습니다.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-1-3.jpg',
              },
            ],
          },
        ],
      },
      {
        contentNo: 1000626434,
        name: '[로파치노] 시가 휘낭시에 세트 2종',
        price: 8820,
        discountRate: 10,
        status: {
          isPurchase: false,
          isSoldOut: false,
        },
        contentList: [
          {
            type: 'INTRO_A',
            title: '로파치노\n시가 휘낭시에',
            content: [
              {
                description: '쿠바의 시가 농장에서 영감을\n얻어 만들었어요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-2-1.jpg',
              },
            ],
          },
          {
            type: 'INTRO_B',
            title: '색다른 디저트 선물을\n건네고 싶을 때 추천해요.',
            content: [
              {
                description:
                  '클래식한 시가처럼 길쭉한 모양\n으로 만들어, 입에 물면 고급 시가를 피우는 것만 같은 착각을 불러 일으킬 정도죠. 진하게 내린 에스프레소와 함께 즐겨 보세요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-2-2.jpg',
              },
            ],
          },
        ],
      },
      {
        contentNo: 1000608637,
        name: '치밥하기 좋은 순살 바베큐치킨',
        price: 11192,
        discountRate: 20,
        status: {
          isPurchase: false,
          isSoldOut: false,
        },
        contentList: [
          {
            type: 'INTRO_A',
            title: '치밥하기 좋은 순살 바베큐치킨',
            content: [
              {
                description: '배달 음식으로 즐기던 맛, 편하게 만나보세요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-3-1.jpg',
              },
            ],
          },
          {
            type: 'INTRO_B',
            title: '흰 쌀밥과 잘 어울리는\n매콤달콤 양념 닭구이',
            content: [
              {
                description:
                  '흰 쌀밥과 최고의 궁합을 자랑하는 매콤달콤 감칠맛! 국내산 닭다리살에 떡과 고추 고명까지 빠짐없이 담았답니다. 신라면 정도의 맵기로 완성했으니 부담없이 즐겨보세요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-3-2.jpg',
              },
            ],
          },
          {
            type: 'TIP',
            title: '',
            content: [
              {
                description:
                  '남은 소스와 치킨을 흰 쌀밥과 함께 비벼보세요. 더욱 든든하고 맛 좋은 한 끼를 즐길 수 있어요.\n\n삶아낸 라면, 당면 등의 사리를 넣고 볶으면 또 다른 별미로 즐길 수 있어요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-3-3.jpg',
              },
            ],
          },
        ],
      },
      {
        contentNo: 1000622083,
        name: '[태우한우] 1+ 한우 생갈비 450g',
        price: 56905,
        discountRate: 5,
        status: {
          isPurchase: false,
          isSoldOut: false,
        },
        contentList: [
          {
            type: 'INTRO_A',
            title: '태우한우\n1+ 한우 생갈비',
            content: [
              {
                description: '입안 가득 퍼지는 소고기의 육향에 매료될 거예요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-4-1.jpg',
              },
            ],
          },
          {
            type: 'INTRO_B',
            title: '불판 위에 구워 갈비살의 진수를 경험해 보세요.',
            content: [
              {
                description:
                  '나란히 붙어 있는 뼈의 위치에 따라 이름도 맛도 각양각색인 갈비살. 태우한우 생갈비는 총 13개의 뼈로 구성된 한우 갈비 중 가장 살밥이 많은 4~8번 갈비를 선별했어요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-4-2.jpg',
              },
            ],
          },
          {
            type: 'INTRO_C',
            title: '소 한마리에서 엄선한\n단 1%',
            content: [
              {
                description:
                  '태우 한우의 1+ 한우 생갈비는 살과 마블링이 풍부한 4~8번 갈빗대만을 선별했어요. 꼼꼼히 선별한 갈빗대에서도 살코기가 두툼한 부분만 한 번 더 골라 작업하죠. 소 1마리에서 단 1% 밖에 되지 않는 비율입니다.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-4-3.jpg',
              },
            ],
          },
          {
            type: 'INTRO_C',
            title: '일부러 남겨두는 지방',
            content: [
              {
                description:
                  '갈빗대와 살코기 사이에는 ‘근간 지방’이라고 불리는 부분이 있어요. 소의 갈빗대에 필연적으로 붙어있는 지방층이죠.\n\n근간 지방을 과하게 제거하면 뼈와 살코기가 서로 끊어지고, 뼈갈비 특유의 씹는 맛과 고소한 풍미를 잃기 쉬워요. 그래서 품질을 떨어뜨리지 않는 선에서 근간 지방의 정선을 최소화했답니다.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-4-1.jpg',
              },
            ],
          },
        ],
      },
      {
        contentNo: 1000327815,
        name: '[오넛티] 피스타치오 스프레드 2종',
        price: 0,
        discountRate: 0,
        status: {
          isPurchase: false,
          isSoldOut: false,
        },
        contentList: [
          {
            type: 'INTRO_A',
            title: '오넛\n피스타치오 스프레드',
            content: [
              {
                description: '깊고 진한 고소함, 한 번 열면 닫을 수 없어요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-5-1.jpg',
              },
            ],
          },
          {
            type: 'INTRO_B',
            title: '100% 넛츠로 만든 강렬한 풍미',
            content: [
              {
                description:
                  '다른 첨가물, 물이나 기름 없이 오로지 피스타치오와 마카다미아만을 그라인딩해 만들었습니다. 고소함을 극대화 해주는 스프레드 특유의 입자감을 느껴보세요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-5-2.jpg',
              },
            ],
          },
          {
            type: 'INTRO_C',
            title: '피스타치오 스프레드,\n더 맛있게 먹는 법',
            content: [
              {
                description:
                  '빵과 과일에만 발라 먹지 마세요. 아이스크림에 한 스푼 올려서 먹으면 담백하면서도 넛버터의 진한 고소함이 느껴지는 디저트를 만날 수 있어요. ',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-5-3.jpg',
              },
            ],
          },
        ],
      },
      {
        contentNo: 0,
        name: '[성수동 분식] 마라 닭갈비 떡볶이',
        price: 0,
        discountRate: 0,
        status: {
          isPurchase: false,
          isSoldOut: false,
        },
        contentList: [
          {
            type: 'INTRO_A',
            title: '성수동 분식\n마라 닭갈비 떡볶이',
            content: [
              {
                description: '마라의 매력에 빠졌다면 마음에 드실 거예요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-6-1.jpg',
              },
            ],
          },
          {
            type: 'INTRO_B',
            title: '한번에 즐기는 마라맛 떡볶이와 닭갈비',
            content: [
              {
                description:
                  '혀 끝을 자극하는 얼얼한 매력의 이색 떡볶이 입니다. 두가지 타입의 소스로 매운맛 강도를 선택할 수 있어요. 말랑한 밀떡과 닭고기를 번갈아 콕콕 찍어 든든하게 즐겨보세요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-6-2.jpg',
              },
            ],
          },
        ],
      },
      {
        contentNo: 0,
        name: '노티드\n크림 도넛 2종',
        price: 0,
        discountRate: 0,
        status: {
          isPurchase: false,
          isSoldOut: false,
        },
        contentList: [
          {
            type: 'INTRO_A',
            title: '노티드\n크림 도넛 2종',
            content: [
              {
                description: '풍성하게 채운 크림으로 달콤한 행복을 만들어요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-7-1.jpg',
              },
            ],
          },
          {
            type: 'INTRO_B',
            title: '노티드 시그니처 상품을 컬리에서 만나보세요.',
            content: [
              {
                description:
                  '노티드 베스트셀러인 우유 생크림 도넛과 클래식 바닐라 도넛이 컬리를 찾아왔습니다. 시그니처 크림과 바닐라 빈이 가득 들어간 풍부한 맛을 느껴보세요. 더욱 더 행복해질거예요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-7-2.jpg',
              },
            ],
          },
        ],
      },
      {
        contentNo: 0,
        name: '[올드페리도넛] 고메도넛 8구세트',
        price: 0,
        discountRate: 0,
        status: {
          isPurchase: false,
          isSoldOut: false,
        },
        contentList: [
          {
            type: 'INTRO_A',
            title: '올드페리도넛\n고메도넛 8구세트',
            content: [
              {
                description: '소중한 사람을 위해 특별한 선물을 준비하세요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-8-1.jpg',
              },
            ],
          },
          {
            type: 'INTRO_B',
            title: '주악 모양으로 재해석한 미니도넛 선물세트',
            content: [
              {
                description:
                  "'서울 3대도넛 맛집'에 빠지지 않는 올드페리도넛의 새로운 상품이 컬리를 찾아왔어요. 고급스러운 패키지와 함께 검은 깨약과, 말차 앙버터, 피칸몽블랑, 애플시나몬 4가지 맛을 소중한 사람과 함께 나눠요.",
                image: 'https://res.kurly.com/events/showcase/202407/products/product-8-2.jpg',
              },
            ],
          },
        ],
      },
      {
        contentNo: 0,
        name: '[오봉집] 낙지볶음',
        price: 0,
        discountRate: 0,
        status: {
          isPurchase: false,
          isSoldOut: false,
        },
        contentList: [
          {
            type: 'INTRO_A',
            title: '오봉집\n낙지볶음',
            content: [
              {
                description: '매장에서 먹던 매콤한 불맛 그대로',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-9-1.jpg',
              },
            ],
          },
          {
            type: 'INTRO_B',
            title: '입에 감기는 감칠맛에 젓가락질을 멈출 수 없어요',
            content: [
              {
                description:
                  '점점 더워지는 날씨, 매운 양념에 무쳐 센 불에 볶아낸 낚지볶음은 사라진 입맛을 돋아줄 반찬으로 제격입니다. 매장 레시피와 동일한 소스를 사용해서 집에서도 매장과 똑같은 매운맛을 즐길 수 있어요.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-9-2.jpg',
              },
            ],
          },
        ],
      },
      {
        contentNo: 1000327817,
        name: '[백봉오골계] 유정란 10구',
        price: 0,
        discountRate: 0,
        status: {
          isPurchase: false,
          isSoldOut: false,
        },
        contentList: [
          {
            type: 'INTRO_A',
            title: '백봉 오골계\n유정란 10구',
            content: [
              {
                description: '행복한 닭이 낳은 건강한 달걀',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-10-1.jpg',
              },
            ],
          },
          {
            type: 'INTRO_B',
            title: '매일 먹는 달걀, 조금 더 꼼꼼히 골라보세요',
            content: [
              {
                description:
                  '이제 컬리에서도 오골계 유정란을 만나실 수 있습니다. HACCP 인증 시설에서 위생적으로 제조한 백봉 오골계란은 난각번호 1번 상품으로 믿을 수 있는 품질을 보증합니다.',
                image: 'https://res.kurly.com/events/showcase/202407/products/product-10-2.jpg',
              },
            ],
          },
        ],
      },
      {
        // NOTE: 컬렉션 연동을 위한 테스트 데이터
        contentNo: 1000327819,
        name: '쇼케이스 테스트',
        price: 444,
        discountRate: 44,
        status: {
          isPurchase: false,
          isSoldOut: false,
        },
        contentList: [
          {
            type: 'INTRO_A',
            title: '쇼케이스 테스트',
            content: [
              {
                description: '테스트 테스트 테스트',
                image: '',
              },
            ],
          },
        ],
      },
    ],
    productSlide: {
      title: '관련 상품',
      description: '7월 쇼케이스 상품이에요',
    },
  },
  meta: {
    name: '7월 신상품',
    code: 202407,
    imageUrl:
      'https://product-image-stg.kurly.com/cdn-cgi/image/width=1050,height=200,fit=crop,quality=85/banner/event/e57d9391-d922-4296-ae6d-9e29d3b11434.png',
    shareUrl: 'https://www.kurly.com/events/showcase/202407',
  },
};

export { SHOWCASE_FIXTURE };
