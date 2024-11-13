import { AppConfig, SiteType } from '../interfaces/AppConfig';

const DEFAULT_APP_CONFIG: AppConfig = {
  defaultSite: 'market',
  mainSiteShowPolicy: null,
  siteInfos: [
    {
      id: 'market',
      name: '마켓컬리',
      tabInfos: [
        {
          id: 'recommendation',
          name: '컬리추천',
          type: SiteType.RECOMMENDATION,
          pageKey: null,
          badge: null,
          refreshHours: [11, 15, 17, 18, 23],
          segmentFilter: [],
        },
        {
          id: 'popular_product',
          name: '베스트',
          type: SiteType.COLLECTION_GROUP,
          pageKey: 'market-best',
          badge: null,
          refreshHours: null,
          segmentFilter: [],
        },
        {
          id: 'new_product',
          name: '신상품',
          type: SiteType.COLLECTION_GROUP,
          pageKey: 'market-newproduct',
          badge: null,
          refreshHours: null,
          segmentFilter: [],
        },
        {
          id: 'bargain',
          name: '알뜰쇼핑',
          type: SiteType.COLLECTION_GROUP,
          pageKey: 'market-sales-group',
          badge: null,
          refreshHours: null,
          segmentFilter: [],
        },
        {
          id: 'event_list',
          name: '특가/혜택',
          type: SiteType.BANNER,
          pageKey: 'event',
          badge: null,
          refreshHours: [11, 23],
          segmentFilter: [],
        },
      ],
    },
    {
      id: 'beauty',
      name: '뷰티컬리',
      tabInfos: [
        {
          id: 'recommendation',
          name: '컬리추천',
          type: SiteType.RECOMMENDATION,
          pageKey: null,
          badge: null,
          refreshHours: [11, 15, 17, 18, 23],
          segmentFilter: [],
        },
        {
          id: 'new_product',
          name: '신상품',
          type: SiteType.COLLECTION_GROUP,
          pageKey: 'beauty-new',
          badge: null,
          refreshHours: null,
          segmentFilter: [],
        },
        {
          id: 'popular_product',
          name: '베스트',
          type: SiteType.COLLECTION_GROUP,
          pageKey: 'beauty-best',
          badge: null,
          refreshHours: null,
          segmentFilter: [],
        },
        {
          id: 'benefit_list',
          name: '특가/혜택',
          type: SiteType.BANNER,
          pageKey: 'bargain',
          badge: null,
          refreshHours: [11, 23],
          segmentFilter: [],
        },
        {
          id: 'brand_list',
          name: '브랜드관',
          type: SiteType.BANNER,
          pageKey: 'event',
          badge: null,
          refreshHours: null,
          segmentFilter: [],
        },
      ],
    },
  ],
  // 앱에서 사용하는 정보
  // 메인 페이지에 노출되는 전광판 시작, 종료 시간
  electronicBoard: {
    startDateTime: '2024-05-20T11:00:00',
    endDateTime: '2024-05-31T23:00:00',
  },
};

export default DEFAULT_APP_CONFIG;
