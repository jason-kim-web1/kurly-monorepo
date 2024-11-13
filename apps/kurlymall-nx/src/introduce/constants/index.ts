import { RESOURCE_URL } from '../../shared/configs/config';
import { BOARD_PATH, INQUIRY_PATH, INTRODUCE_PATH, PRODUCT_PATH } from '../../shared/constant';
import {
  IntroduceContent,
  IntroduceMenu,
  QualityStandard,
  SubMenuLists,
  SustainableDistribution,
  ThumbContent,
} from '../interfaces';

export const DEFAULT_ACTIVE_NAME = '';

export const imgUrl = `${RESOURCE_URL}/images/event/introduce`;

export const INTRODUCE_IMAGE_URL = {
  icoArrowPurple: `${imgUrl}/0720/pc/ico_arrow.jpg`,
  icoArrowRight: `${imgUrl}/0720/mobile/ico_arrow.jpg`,
  icoArrowUp: `${imgUrl}/0720/mobile/ico_up.jpg`,
  icoArrowOff: `${imgUrl}/0720/pc/btn_off.png`,
  icoArrowOn: `${imgUrl}/0720/pc/btn_on.png`,
  icoRecruit: `${imgUrl}/0720/pc/img_link.jpg`,
  introdueMain: `${imgUrl}/0720/pc/intro_main_v2.jpg`,
  introdueMainMo: `${imgUrl}/0720/mobile/intro_main_v2.jpg`,
  introdueMain2: `${imgUrl}/210801/pc/intro_main2.jpg?ver=1`,
  introdueMain2Mo: `${imgUrl}/210801/m/intro_main2.jpg`,
  qualityStandardMain: `${imgUrl}/0720/pc/img_cont1.jpg`,
  qualityStandardMainMo: `${imgUrl}/0720/mobile/img_cont1.jpg`,
  solutionMain: `${imgUrl}/0720/pc/img_cont2.jpg`,
  solutionMainMo: `${imgUrl}/0720/mobile/img_cont2.jpg`,
  pricePolicyMain: `${imgUrl}/0720/pc/img_cont3.jpg`,
  pricePolicyMainMo: `${imgUrl}/0720/mobile/img_cont3.jpg`,
  customerSystemMain: `${imgUrl}/0720/pc/img_cont4.jpg`,
  customerSystemMainMo: `${imgUrl}/0720/mobile/img_cont4.jpg`,
  JointGrowthCont: `${imgUrl}/200714/pc/img_main.jpg`,
  JointGrowthContMo: `${imgUrl}/200714/m/img_main.jpg`,
  sustainableMain: `${imgUrl}/200714/pc/img_cont5.jpg`,
  sustainableMainMo: `${imgUrl}/200714/m/img_cont5.jpg`,
  cycleImage: `${imgUrl}/200714/pc/img_cycle_v2.png`,
  cycleImageMo: `${imgUrl}/200714/m/img_cycle.png`,
  jointGrowthMain: `${imgUrl}/200714/pc/img_main.jpg`,
  jointGrowthMainMo: `${imgUrl}/200714/m/img_main.jpg`,
  jointGrowthSub: `${imgUrl}/200714/pc/img_joint.jpg`,
  jointGrowthSubMo: `${imgUrl}/200714/m/img_joint.jpg`,
  productSelectionMain: `${imgUrl}/210801/pc/img_main2.jpg`,
  productSelectionMainMo: `${imgUrl}/200714/m/img_main2.jpg`,
  packagingMain: `${imgUrl}/210801/pc/img_main3.jpg?ver=2`,
  packagingMainMo: `${imgUrl}/210801/m/img_main3.jpg`,
  packagingSub: `${imgUrl}/210801/pc/img_list3_5.jpg`,
  packagingSubMo: `${imgUrl}/200714/m/img_salad_v2.jpg`,
  socialMain: `${imgUrl}/210801/pc/img_main4.jpg?ver=2`,
  socialMainMo: `${imgUrl}/210801/m/img_main4.jpg?ver=1`,
  socialSub1: `${imgUrl}/210801/pc/img_treeplanet.jpg?ver=2`,
  socialSubMo1: `${imgUrl}/210801/m/img_main5.jpg`,
  socialSub2: `${imgUrl}/210801/pc/img_treeplanet2.jpg?ver=2`,
};

export const STANDARD_FOOD_MENU: SubMenuLists[] = [
  {
    name: INTRODUCE_PATH.gmoFood.name,
    url: INTRODUCE_PATH.gmoFood.uri,
  },
  {
    name: INTRODUCE_PATH.japaneseFood.name,
    url: INTRODUCE_PATH.japaneseFood.uri,
  },
  {
    name: INTRODUCE_PATH.infantFood.name,
    url: INTRODUCE_PATH.infantFood.uri,
  },
  {
    name: INTRODUCE_PATH.foodAdditive.name,
    url: INTRODUCE_PATH.foodAdditive.uri,
  },
  {
    name: INTRODUCE_PATH.pesticideUse.name,
    url: INTRODUCE_PATH.pesticideUse.uri,
  },
  {
    name: INTRODUCE_PATH.petFood.name,
    url: INTRODUCE_PATH.petFood.uri,
  },
];

export const STANDARD_GUIDE_MENU: SubMenuLists[] = [
  {
    name: INTRODUCE_PATH.ecoOrganic.name,
    url: INTRODUCE_PATH.ecoOrganic.uri,
  },
  {
    name: INTRODUCE_PATH.ecoPlantationBreeding.name,
    url: INTRODUCE_PATH.ecoPlantationBreeding.uri,
  },
  {
    name: INTRODUCE_PATH.productionProcess.name,
    url: INTRODUCE_PATH.productionProcess.uri,
  },
  {
    name: INTRODUCE_PATH.safetyHygiene.name,
    url: INTRODUCE_PATH.safetyHygiene.uri,
  },
  {
    name: INTRODUCE_PATH.areaProducer.name,
    url: INTRODUCE_PATH.areaProducer.uri,
  },
  {
    name: INTRODUCE_PATH.healthFunctionalFood.name,
    url: INTRODUCE_PATH.healthFunctionalFood.uri,
  },
  {
    name: INTRODUCE_PATH.specialProduct.name,
    url: INTRODUCE_PATH.specialProduct.uri,
  },
];

export const INTRODUCE_MENU: IntroduceMenu[] = [
  {
    id: 0,
    name: INTRODUCE_PATH.introduce.name,
    url: INTRODUCE_PATH.introduce.uri,
  },
  {
    id: 1,
    name: INTRODUCE_PATH.qualityStandard.name,
    url: INTRODUCE_PATH.qualityStandard.uri,
    subMenuInfo: [
      {
        id: 0,
        title: '컬리의 생각',
        lists: STANDARD_FOOD_MENU,
      },
      {
        id: 1,
        title: '인증서 검토',
        lists: STANDARD_GUIDE_MENU,
      },
    ],
  },
  {
    id: 2,
    name: INTRODUCE_PATH.kurlyFreshSolution.name,
    url: INTRODUCE_PATH.kurlyFreshSolution.uri,
  },
  {
    id: 3,
    name: INTRODUCE_PATH.pricePolicy.name,
    url: INTRODUCE_PATH.pricePolicy.uri,
  },
  {
    id: 4,
    name: INTRODUCE_PATH.customerSystem.name,
    url: INTRODUCE_PATH.customerSystem.uri,
  },
  {
    id: 5,
    name: INTRODUCE_PATH.sustainableDistribution.name,
    url: INTRODUCE_PATH.sustainableDistribution.uri,
    subMenuInfo: [
      {
        id: 0,
        lists: [
          {
            name: INTRODUCE_PATH.jointGrowth.name,
            url: INTRODUCE_PATH.jointGrowth.uri,
          },
          {
            name: INTRODUCE_PATH.productSelection.name,
            url: INTRODUCE_PATH.productSelection.uri,
          },
          {
            name: INTRODUCE_PATH.packagingMaterials.name,
            url: INTRODUCE_PATH.packagingMaterials.uri,
          },
          {
            name: INTRODUCE_PATH.socialContribution.name,
            url: INTRODUCE_PATH.socialContribution.uri,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: '컬리의 인재상',
    url: 'https://kurly.career.greetinghr.com',
    isExternalLink: true,
  },
];

export const KURLY_NAME = INTRODUCE_MENU[0].name;

export const ABOUT_KURLY: ThumbContent[] = [
  {
    id: 0,
    imgUrl: INTRODUCE_IMAGE_URL.introdueMain,
    imgUrlMo: INTRODUCE_IMAGE_URL.introdueMainMo,
    title: '컬리의 시작',
    text: `
      이 세상에는 참 다양한 푸드마켓이 있습니다.
      하지만 우리와 꼭 맞는 마음을 가진 푸드마켓을 찾기란 쉽지 않았습니다.
      ‘그렇다면 우리가 직접 만들어보면 어떨까?’ 2015년 컬리는 그렇게 시작되었습니다.<br /><br />
      맛있는 음식이 삶의 가장 큰 즐거움이라 믿는 사람들이 뜻을 합쳤죠. 컬리의 팀원들은 이미 팀을 꾸리기 전부터 좋은 재료를
      위해서라면
      해외 직구, 백화점, 동네 마트, 재래 시장, 더 나아가 전국 방방곡곡의 산지를 찾아 다니며 품질과 가격을 비교하던 깐깐한
      소비자였습니다.
      이렇게 찾아낸 훌륭한 생산자와 최상의 먹거리들을 나와 내 가족만 알고 있기에는 너무 아쉬웠습니다.<br /><br />
      비싼 식자재만이 좋은 음식일 것이라고 막연하게 생각하고 있는 소비자에게는 진짜 맛을 소개해드리고 싶었고,
      뚝심 하나로 산골 오지에서 수십 년간 묵묵히 장을 담그는 명인, 시들어서 버릴지언정 무농약을 고집하는 농부에게는 안정적인
      판매 활로를 찾아드리고 싶었습니다.
    `,
  },
  {
    id: 1,
    imgUrl: INTRODUCE_IMAGE_URL.introdueMain2,
    imgUrlMo: INTRODUCE_IMAGE_URL.introdueMain2Mo,
    title: '컬리의 믿음, 그리고 지켜야 할 가치',
    text: `
      시작은 단순했지만 고민은 깊었습니다. 직원이 아닌 한 사람의 고객으로서도 오래도록 사랑할 수 있는 서비스를 만들고자 했기에,
      상품을 검토할 때 ‘잘 팔릴까’ 보다는 ‘내가 사고 싶은지’를 먼저 물었고, ‘많이 팔릴지’ 보다는 ‘많이 팔려야 마땅한지’를
      고민했고, 단기적으로 이익을 추구하기보다는 장기적으로 생산자와 소비자 모두에게 옳은 일을 하기 위해 치열하게 고민하고
      노력해왔습니다.<br /><br />
      그 과정에서 컬리가 꼭 지키고자 했던 가치들을 공유합니다. 이 가치들은 지금까지 그래왔듯 앞으로도 컬리가 성장하는 과정에서
      방향을 잃지 않도록 길을 밝혀주는 등대의 역할을 해줄 것이며, 동시에 컬리의 파트너인 생산자, 소비자, 그리고 주주 여러분께
      드리는 약속이기도 합니다.
    `,
  },
];

export const ABOUT_KURLY_LIST: IntroduceContent[] = [
  {
    id: 0,
    title: '1. 나와 내 가족이 사고 싶은 상품을 판매합니다.',
    text:
      '컬리는 미각적, 심미적으로 만족감을 주면서 사람의 몸에 이로운 상품이 우리의 삶까지 변화시킬 수 있다고 믿습니다. 내가 먹고 쓰는 것이 곧 ‘나’이니까요.' +
      '안전성, 맛, 상업성 등 여러 면에서 만족스러울 만한, 최상의 상품을 고르기 위해 직접 먹어보고 사용해 보며 여러 차례에 걸쳐 꼼꼼하게 검증합니다.',
    urlText: '컬리의 품질 기준 더 알아보기',
    url: INTRODUCE_PATH.qualityStandard.uri,
    imgUrl: `${imgUrl}/0720/pc/intro_cont1_v2.jpg`,
    imgUrlMo: `${imgUrl}/0720/mobile/intro_cont1_v2.jpg`,
  },
  {
    id: 1,
    title: '2. 물류 혁신을 통해 최상의 품질로 전해드립니다.',
    text:
      '오늘 주문하면 내일 아침 도착하는 샛별배송은 물류의 혁신이 없었다면 불가능한 일이었죠.' +
      '샛별배송을 포함한 Kurly Fresh Solution은 산지에서 식탁까지의 시간을 줄이고, 온도를 제어해 상품의 가치를 극대화합니다.' +
      '좋은 상품을 가장 좋은 상태로 고객님께 전해드리는 것. 컬리가 배송 시간부터 포장재까지 물류의 모든 것을 혁신한 이유이자, 컬리의 물류가 가지는 가치입니다.',
    urlText: 'Kurly Fresh Solution 더 알아보기',
    url: INTRODUCE_PATH.kurlyFreshSolution.uri,
    imgUrl: `${imgUrl}/0720/pc/intro_cont2.jpg`,
    imgUrlMo: `${imgUrl}/0720/mobile/intro_cont2.jpg`,
  },
  {
    id: 2,
    title: '3. 같은 품질에서 최선의 가격을 제공합니다.',
    text:
      '소비자에게는 품질만큼 가격도 좋은 상품의 기준이 됩니다. 하지만 생산자가 배제된 최저가 정책은 정답이 될 수 없습니다.' +
      '컬리가 업계 최초로 도입한 100% 생산자 직거래 및 매입 방식은 유통 중 발생하던 재고 손실을 최소화해 동일 품질의 상품을 가장 낮은 가격에 판매할 수 있도록 해줍니다.',
    urlText: '가격 정책 및 직거래 매입 방식 더 알아보기',
    url: INTRODUCE_PATH.pricePolicy.uri,
    imgUrl: `${imgUrl}/0720/pc/intro_cont3.jpg`,
    imgUrlMo: `${imgUrl}/0720/mobile/intro_cont3.jpg`,
  },
  {
    id: 3,
    title: '4. 고객의 행복을 먼저 생각합니다.',
    text:
      '컬리는 오늘의 만족을 넘어 고객님의 삶 속에서 행복을 드리는 서비스로 남기를 바랍니다. 그래서 오늘의 회사를 위한 일보다 장기적으로 소비자에게 옳은 일을 합니다.' +
      '고객만족보장제도는 고객님의 현재는 물론 미래까지도 세심하게 케어하고 싶은 컬리의 의지입니다.',
    urlText: '고객만족보장제도 더 알아보기',
    url: INTRODUCE_PATH.customerSystem.uri,
    imgUrl: `${imgUrl}/0720/pc/intro_cont4.jpg`,
    imgUrlMo: `${imgUrl}/0720/mobile/intro_cont4.jpg`,
  },
  {
    id: 4,
    title: '5. 지속 가능한 유통을 실현해 나갑니다.',
    text:
      '좋은 먹거리는 깨끗한 환경에서, 좋은 상품은 생산자에게 합리적인 유통 구조에서 시작되기에 컬리는 환경, 상품, 사람의 선순환을 이루는 지속 가능한 유통을 고민합니다.' +
      '지속 가능한 상품 선정부터 생산자와의 동반 성장, 친환경 포장재 개발, 사회에 대한 기여까지 장기적으로 소비자와 생산자 모두에게 옳은 일을 하기 위해 노력합니다.',
    urlText: '지속 가능한 유통 더 알아보기',
    url: INTRODUCE_PATH.sustainableDistribution.uri,
    imgUrl: `${imgUrl}/0720/pc/intro_cont5.jpg`,
    imgUrlMo: `${imgUrl}/0720/mobile/intro_cont5.jpg`,
  },
  {
    id: 5,
    title: '6. 함께 변화를 주도하고 새로운 기회를 만듭니다.',
    text:
      '컬리는 최고의 인재들이 모여 산업을 바꾸고 이를 통해 가치를 창출하는 것이 기업의 존재 이유임을 믿습니다.' +
      '오늘의 작은 문제들을 넘겨보지 않고, 주도적으로 문제를 해결해나가며 컬리와 함께 의미있는 변화를 이끌어나갈 당신을 기다립니다.',
    urlText: '컬리의 인재상 더 알아보기',
    url: 'https://kurly.career.greetinghr.com',
    imgUrl: `${imgUrl}/0720/pc/intro_cont6.jpg`,
    imgUrlMo: `${imgUrl}/0720/mobile/intro_cont6.jpg`,
    isExternalLink: true,
  },
];

export const QUALITY_STANDARD: QualityStandard[] = [
  {
    id: 0,
    title: '모든 상품은 70여가지 기준으로 검토 후 판매합니다.',
    text: `
      컬리에서 판매하는 모든 상품은 각 카테고리별 전문 MD가 70여 가지 내부 기준에 맞춰 검토하고 검증한 상품입니다. 70여
      가지 기준은 안전성, 맛, 브랜드의 가치 등 상품을 판단할 수 있는 다양한 영역을 포함하고 있습니다. 생산 과정의 위생과
      안전 등 고객이 볼 수 없는 부분까지 대신 직접 검증하기 위해 현장 실사를 진행하기도 하죠.<br /><br />
      이렇게 기획된 상품은 매주 상품위원회에서 대표이사, 상품기획 본부장을 포함한 컬리의 경영진, 담당 MD가 함께 상품을 직접
      경험해보고, 다각도에서 심사합니다. 지금까지 소개한 상품 중, 팀원들이 먹어보지 않은, 그리고 만족하지 않은 상품은 단
      한가지도 없습니다. 그리고 모든 상품은 이 상품위원회를 통과해야만 판매가 가능합니다.<br /><br />
      70여 가지 상품 검토 기준 중 아래 내용에 대한 컬리의 생각을 더 자세히 살펴보세요.
    `,
    lists: STANDARD_FOOD_MENU,
  },
  {
    id: 1,
    title: '품질에 대한 가이드라인으로 다양한 인증서를 검토합니다.',
    text:
      '상품위원회에서 상품을 심사할 때 인증서가 언제나 좋은 품질을 보장해주는 것은 아닙니다. 하지만 인증은 품질 및 안전성 확보를 위한 기본적인 가이드라인이 되기 때문에,' +
      '상품위원회와는 별도로 컬리의 Risk Management 팀이 국내·외 정부 또는 기관에서 발행한 인증서에 대해 심사하고 검토합니다.',
    lists: STANDARD_GUIDE_MENU,
  },
  {
    id: 2,
    title: '농장에서 식탁까지 신선함을 가장 빠르게 전해드립니다.',
    text: `
      컬리에서 배송받으시는 신선 채소, 과일이 산지 직송 상품보다 더 신선하다고 자부할 수 있는 이유는 컬리만의 남다른 유통 구조와 시스템에 있습니다.
      산지부터 집 앞까지 상품을 최상의 신선도와 품질로 전하기 위해 최대한 빠른 시간 내에 적정 온도를 유지해 배송하는 시스템이죠.<br /><br />
      이를 위해 컬리는 중간 유통 과정 없이 직접 매입한 상품을 산지에서 물류 창고까지 이동시킬 때도, 고객님 댁 문 앞까지 배송할 때도 냉장/냉동 차량을 사용하고 상품별로 최적화된 포장재 사용 원칙을 지킵니다.
      이렇게 유통 전 과정에서 온도를 제어하는 풀콜드체인(Full Cold Chain) 시스템과 함께 주문한 다음날 아침 배송받는 샛별배송 서비스를 구축했기에 농장에서 식탁까지 빠르면 24시간 내에 가장 신선한 상태로 고객님께 상품을 전해드릴 수 있습니다.
    `,
  },
];

export const KURLY_FRESH_SOLUTION: IntroduceContent[] = [
  {
    id: 0,
    title: '빠르고 신선한 샛별배송, Kurly Fresh Solution',
    text: '컬리는 국내 최초로 ‘샛별배송’ 시스템을 구축하였습니다. 밤에 주문한 상품을 다음날 아침까지 배송해 드리기 때문에, 저녁에 주문한 상품으로 다음날 아침 식사를 만들 수 있답니다. (지역별로 시간은 상이)',
  },
  {
    id: 1,
    title: '참 특별한 신선배송, Full Cold Chain System',
    text: '컬리는 온라인 업계 최초로 식품 전용 냉장/냉동 창고를 구축하였습니다. 또한 각각 다른 품목별 최적 보관 온도를 유지하고 있지요. 까다로운 일이지만 신선도를 유지하기에 가장 완벽한 방법입니다. 상품의 패키징 역시 냉장/냉동 창고에서 이루어집니다. 그리고 일반 배송차량이 아닌 냉장/냉동 차량에 실려 주문하신 분의 문 앞까지 배달되지요.',
  },
  {
    id: 2,
    title: '짧은 재고 기한과 포장재 연구',
    text: '컬리에서 판매하는 신선 식품의 재고 기한은 동일업계와 비교하였을 때 무척 짧습니다. 엽채소의 재고 기한은 하루 정도이며, 최대 3일을 예외로 운영합니다.즉 ‘오늘 수확한 채소를 오늘 배송한다’는 뜻이지요. (일반 대형마트의 경우 엽채소의 재고 기한은 보통 5일 입니다.) 포장재 역시 신선함을 유지하기 위한 주요 요건입니다. 컬리는 각 상품별로 최적화된 포장재를 연구하여 실배송 전 직접 실험을 통하여 최상의 신선도를 유지하기 위한 각고의 노력을 하고 있습니다.',
  },
  {
    id: 3,
    title: '먼 곳까지 신선함을 전하는 하루배송',
    text: '샛별배송이 어려운 지역에 거주하는 고객님께서도 컬리의 좋은 상품을 신선하게 받아보실 수 있도록 하루배송 서비스를 운영하고 있습니다. 배송 시간이 다소 길어져도 신선함을 유지할 수 있는 상품에 한해서만 하루배송을 통해 배송해 드립니다.',
  },
];

export const PRICE_POLICY: IntroduceContent[] = [
  {
    id: 0,
    title: '모두를 위한 최선의 가격',
    text: '평소에 다른 곳에서도 식료품 구매를 하시는 분들은 아마 컬리의 합리적인 가격을 체감하셨으리라 생각합니다. 백화점의 고급 식품 코너에서 파는 동일한 상품을 마트 가격으로, 혹은 그보다 더 저렴하게 판매하기 때문이지요. ‘최선의 가격’을 만들기 위해 유통 단계의 비효율을 줄이는 노력 덕분입니다.',
  },
  {
    id: 1,
    title: '직거래 매입 방식',
    text: '보통 유통 업체는 주문이 들어오면 생산자에게 주문 수량만큼만 물건을 받지만 컬리는 빅데이터 등의 자료를 통해 사전에 판매 수량을 예측하고, 생산자로부터 미리 물건을 매입합니다. 재고가 남았다고 해서 생산자에게 다시 반품하는 일도 없습니다. 처음에는 컬리가 손해를 보는 일일 수도 있고, 일부 품절이 발생할 수도 있지만, 생산자는 재고 보유와 폐기로 인한 비용 부담이 줄어들어 소비자분들께 좋은 상품을 더 합리적인 가격으로, 안정적으로 공급할 수 있습니다.',
  },
  {
    id: 2,
    title: '가격 모니터링을 통한 최저가 도전',
    text: '사실 컬리는 ‘최저가’의 이면에 숨겨진 여러 가지 이유들 때문에 최저가라는 말을 별로 좋아하지 않습니다. 생산자 역시 품질에 합당한 대가를 받아야 장기적으로 품질을 유지할 수 있으니까요. 그럼에도 불구하고 자주 사는 상품들은 언제나 합리적인 가격에 만나실 수 있도록 장바구니 필수품을 선정해 집중 관리합니다. 이 상품들에 한해서는 시장 가격 변동 상황을 확인하여 상품 가격을 탄력적으로 조정하지요. 앞으로도 ‘최저가 도전’ 상품을 다양하게 선보이며 장바구니 물가 부담 덜기에 앞장서겠습니다.',
    urlText: '최저가 도전 상품 확인하러 가기',
    url: `${PRODUCT_PATH.categories.uri}/209`,
  },
];

export const CUSTOMER_SYSTEM: IntroduceContent[] = [
  {
    id: 0,
    title: '고객만족보장제도',
    text:
      '컬리가 엄선한 상품은 가격 대비 가장 좋은 품질임을 자부합니다.' +
      '원재료의 재배방식부터 함유된 성분 하나하나까지 꼼꼼하게 따져본 뒤 직접 먹어보고 정말 맛있고 건강한 상품만 소개해드리기 때문입니다.' +
      '하지만 여전히 실물을 직접 보지 않고 온라인으로 구매하는 것이 조심스러우실 수 있다고 생각했습니다. 그래서 아래와 같이 고객만족 보장제도를 운영하고 있습니다.',
  },
  {
    id: 1,
    title: '이용법',
    text: '수령한 상품에 문제가 있을 경우 해당 부분을 사진으로 찍어 1:1게시판이나 고객행복센터, 카카오톡으로 문의를 접수해 주세요. 확인 후 환불 혹은 새 상품으로 교환해드립니다.',
    urlText: '환불/교환 정책 자세히 보기',
    url: `${BOARD_PATH.notice.uri}/detail/5`,
  },
  {
    id: 2,
    title: '식품·리빙 전문 CS 상담원 상주',
    text: '컬리의 CS 센터는 식품, 리빙, 문화 상품별 전문 상담사 팀이 구성되어 있습니다. 그래서 컬리에서 판매하는 모든 상품에 관해서 누구보다 더 잘 알고 있으며, 문의하시는 내용에 정확한 답변을 드릴 수 있습니다.',
  },
  {
    id: 3,
    title: '첫 구매 설문조사 및 해피콜',
    text:
      '항상 고객의 소리에 귀를 기울이며 작은 의견도 반영할 수 있도록 노력합니다. ' +
      '그 일환으로 컬리에서 첫 구매를 하신 회원분들께는 만족도에 대한 설문조사 및 해피콜을 실시합니다. ' +
      '특히 상품과 관련하여 고객이 주신 피드백은 반드시 생산자에게 전달하며, 판매하는 상품에 반영하기 위해 함께 노력합니다. ' +
      '실제로 <세븐피쉬>의 고등어의 경우, 조금 덜 짰으면 좋겠다는 의견이 있어 생산자가 고등어의 염도를 낮추기도 하였고 <어반나이프>의 소시지는 구성 상품을 변경하기도 하였습니다. ' +
      '이용에 불편이 있거나 더 개선되어야 할 부분이 있다면 언제든지 편하게 문의해주세요. 컬리의 고객행복센터는 언제나 열려있습니다. 운영 외 시간에는 1:1 문의하기를 이용해주세요.',
    urlText: '1:1 문의하기',
    url: INQUIRY_PATH.inquiry.uri,
  },
  {
    id: 4,
    title: '고객만족보장제도',
    text:
      '컬리는 샛별 배송과 하루 배송을 통해 다음날까지 상품을 전달 드리고 있습니다.(예약 상품 제외)' +
      '배송 매니저님의 안전과 건강을 최우선으로 하며 배송 과정 중 기상 악화 및 도로 교통 상황에 따라 부득이하게 배송 지연이 발생될 수 있습니다.' +
      '배송 지연이 발생되는 경우 사전에 문자를 통해 안내드리고 있으며, 배송 현황 및 조치가 필요하신 경우 고객행복센터, 1:1문의, 카카오톡 채팅 상담으로 접수해주세요.',
    urlText: '1:1 문의하기',
    url: INQUIRY_PATH.inquiry.uri,
  },
];

export const SUSTAINABLE_DISTRIBUTION_TITLE = '컬리의 지속 가능한 유통';

export const SUSTAINABLE_DISTRIBUTION_TEXT =
  '환경을 보전하고 사회에 기여하는 상품을 소싱하는 일, 생산자가 좋은 상품을 만드는 데만 집중할 수 있도록 지원함으로써 유통 생태계를 선순환 구조로 만드는 모든 일이 지속 가능한 유통입니다.';

export const SUSTAINABLE_DISTRIBUTION_SUBTEXT =
  '컬리는 이 선순환이 결국 우리가 살아가는 환경과 사회를 더 나아지게 하고, 신선하고 좋은 상품을 오래오래 만날 수 있는 가장 좋은 방법이라고 믿습니다.';

export const SUSTAINABLE_DISTRIBUTION_THUMB: SustainableDistribution[] = [
  {
    id: 0,
    text: '지속 가능한',
    subText: '생산자 동반 성장',
    url: INTRODUCE_PATH.jointGrowth.uri,
    imgUrl: `${imgUrl}/200714/pc/img_menu_thumb.png`,
    imgUrlMo: `${imgUrl}/200714/m/btn_sustainable.png`,
  },
  {
    id: 1,
    text: '지속 가능한',
    subText: '상품 선정',
    url: INTRODUCE_PATH.productSelection.uri,
    imgUrl: `${imgUrl}/200714/pc/img_menu_thumb2.png`,
    imgUrlMo: `${imgUrl}/200714/m/btn_sustainable2.png`,
  },
  {
    id: 2,
    text: '지속 가능한',
    subText: '포장재 개발ㆍ개선',
    url: INTRODUCE_PATH.packagingMaterials.uri,
    imgUrl: `${imgUrl}/200714/pc/img_menu_thumb3.png`,
    imgUrlMo: `${imgUrl}/200714/m/btn_sustainable3.png`,
  },
  {
    id: 3,
    text: '지속 가능한',
    subText: '사회에 대한 기여',
    url: INTRODUCE_PATH.socialContribution.uri,
    imgUrl: `${imgUrl}/200714/pc/img_menu_thumb4.png`,
    imgUrlMo: `${imgUrl}/200714/m/btn_sustainable4.png`,
  },
];
