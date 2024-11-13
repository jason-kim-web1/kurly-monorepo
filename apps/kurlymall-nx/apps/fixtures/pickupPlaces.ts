import { PickupPlace, PickupPlaceResponse } from '../src/order/checkout/shared/interfaces';

export const mockPickupPlaces: PickupPlace[] = [
  {
    placeId: 151,
    partnerName: 'CU',
    pickupShopName: '역삼점',
    pickupShopPlace: '서울특별시 강남구 테헤란로51길 10, (역삼동)',
    pickupShopUrl: 'naver.me/GSX2EIen',
    pickupShopPhoneNumber: '서울특별시 강남구 테헤란로51길 10, (역삼동)',
    latitude: 37.501995,
    longitude: 127.03473,
    specialInformation: null,
    closeWeekend: false,
    distance: 240,
  },
  {
    placeId: 152,
    partnerName: 'CU',
    pickupShopName: 'BGF사옥점',
    pickupShopPlace: '서울특별시 강남구 테헤란로 405 (삼성동)',
    pickupShopUrl: 'naver.me/F5bgZn7i',
    pickupShopPhoneNumber: '서울특별시 강남구 테헤란로 405 (삼성동)',
    latitude: 37.5012,
    longitude: 127.03424,
    specialInformation: null,
    closeWeekend: false,
    distance: 142,
  },
  {
    placeId: 154,
    partnerName: 'CU',
    pickupShopName: '한티래미안점',
    pickupShopPlace: '서울특별시 강남구 선릉로63길 13 (역삼동)',
    pickupShopUrl: 'naver.me/FSOZHRa2',
    pickupShopPhoneNumber: '서울특별시 강남구 선릉로63길 13 (역삼동)',
    latitude: 37.497803,
    longitude: 127.035286,
    specialInformation: null,
    closeWeekend: false,
    distance: 298,
  },
  {
    placeId: 157,
    partnerName: 'CU',
    pickupShopName: '비산자이점',
    pickupShopPlace: '경기도 안양시 동안구 임곡로 50비산자이아이파크 1층 4동 01, 02호',
    pickupShopUrl: 'naver.me/50p5sHEi',
    pickupShopPhoneNumber: '경기도 안양시 동안구 임곡로 50비산자이아이파크 1층 4동 01, 02호',
    latitude: 37.500282,
    longitude: 127.04755,
    specialInformation: null,
    closeWeekend: false,
    distance: 1240,
  },
  {
    placeId: 153,
    partnerName: 'CU',
    pickupShopName: '타워팰리스점',
    pickupShopPlace: '서울특별시 강남구 언주로30길56, 상가시설내 104(도곡동, 타워팰리스)',
    pickupShopUrl: 'naver.me/xcJ3MgBg',
    pickupShopPhoneNumber: '서울특별시 강남구 언주로30길56, 상가시설내 104(도곡동, 타워팰리스)',
    latitude: 37.501854,
    longitude: 127.030365,
    specialInformation: null,
    closeWeekend: false,
    distance: 339,
  },
  {
    placeId: 155,
    partnerName: 'CU',
    pickupShopName: '서초그린점',
    pickupShopPlace: '서울특별시 서초구 잠원로3길 40 태남홀딩스 (잠원동)',
    pickupShopUrl: 'naver.me/xVlddrOc',
    pickupShopPhoneNumber: '서울특별시 서초구 잠원로3길 40 태남홀딩스 (잠원동)',
    latitude: 37.498962,
    longitude: 127.04161,
    specialInformation: null,
    closeWeekend: false,
    distance: 727,
  },
];

export const mockPickupPlacesResponse: PickupPlaceResponse = {
  content: mockPickupPlaces,
  total: 6,
  nextCursor: null,
  hasNext: false,
  hasContent: true,
  isFirst: true,
  isLast: true,
};