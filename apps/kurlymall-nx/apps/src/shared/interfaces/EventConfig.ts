type Schedule = {
  type: string;
  data: {
    id: string;
    title: string;
    description: string;
    promotion: string;
    url: string;
    thumbnail: string;
    product: {
      name: string;
      price: string;
      discountRate: string;
      thumbnail: string;
    };
  };
  start: string;
  startReal: string;
  end: string;
};

type SeasonalActivatedEvent = 'seasonal_effect' | 'seasonal_logo' | 'seasonal_floating_icon';

export interface Asset {
  url: string;
  type: 'image' | 'lottie';
}

export interface FloatingIcon {
  marketAsset?: Asset;
  beautyAsset?: Asset;
  marketFontColor?: string;
  beautyFontColor?: string;
  marketBackgroundColor?: string;
  beautyBackgroundColor?: string;
}

interface SeasonalEvents {
  segmentedControl?: {
    marketSelectedFontColor: string;
    marketDeselectedFontColor: string;
    marketBackgroundColor: string;
    marketControlBackgroundColor: string;
    beautySelectedFontColor: string;
    beautyDeselectedFontColor: string;
    beautyBackgroundColor: string;
    beautyControlBackgroundColor: string;
  };
  logo?: {
    marketAsset?: Asset;
    beautyAsset?: Asset;
  };
  floatingIcon?: FloatingIcon;
}

export interface EventConfig {
  canceledSchedule: Schedule[];
  eventSchedule: Schedule[];
  fileVersion: string;
  seasonalActivatedEvents: SeasonalActivatedEvent[];
  seasonalEvents?: SeasonalEvents;
}
