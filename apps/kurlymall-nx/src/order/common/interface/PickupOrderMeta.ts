import { ImageFormat } from '../../../../@types/images';
import { PickupStrategy } from '../constants/PickupOrder';
import { PickupStatus } from '../constants/PickupStatus';

export interface PickupOrderMeta {
  partnerName: string;
  pickupShopName: string;
  pickupShopPhoneNumber: string;
  pickupShopPlace: string;
  pickupShopUrl: string;
  pickupStatus: PickupStatus;
  pickupStrategy: PickupStrategy;
  closeWeekend: boolean;
  specialInformation: string;
  qrImage: string | null;
  qrImageType: ImageFormat | null;
  startDate: string;
  endDate: string;
  latitude: number;
  longitude: number;
}
