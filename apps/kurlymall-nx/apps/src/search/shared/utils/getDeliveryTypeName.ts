import { head } from 'lodash';

import { DeliveryInfoName } from '../../../product/types';

const getDeliveryTypeName = (deliveryTypeNames: DeliveryInfoName[]): string => head(deliveryTypeNames) || '';

export { getDeliveryTypeName };
