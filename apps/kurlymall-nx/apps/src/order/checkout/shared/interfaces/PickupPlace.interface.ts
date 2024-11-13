export interface PickupPlaceResponse {
  content: PickupPlace[];
  total: number;
  nextCursor: string | null;
  hasNext: boolean;
  hasContent: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export interface PickupPlace {
  placeId: number;
  partnerName: string;
  pickupShopName: string;
  pickupShopPlace: string;
  pickupShopUrl: string;
  pickupShopPhoneNumber: string;
  latitude: number;
  longitude: number;
  specialInformation: string | null;
  closeWeekend: boolean;
  distance: number;
}

export interface PickupDate {
  startYear: string;
  startMonth: string;
  startDay: string;
  endYear: string;
  endMonth: string;
  endDay: string;
}

export interface PickupPeriod {
  startDate: string;
  endDate: string;
}

export interface PickupRequest {
  placeId: number;
  startDate: string;
  endDate: string;
}

export interface PickupPlaceText {
  shopName: string;
  shopAddress: string;
  pickupPeriod: {
    start: string;
    end: string;
  };
  specialList: string[];
  latitude: number;
  longitude: number;
}

export const placeSearchType = {
  MAP: 'MAP',
  KEYWORD: 'KEYWORD',
} as const;

export type PlaceSearchType = typeof placeSearchType[keyof typeof placeSearchType];
