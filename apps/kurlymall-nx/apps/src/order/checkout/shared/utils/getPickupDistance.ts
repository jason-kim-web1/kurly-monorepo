import { divide, round } from 'lodash';

export default function getPickupDistance(distance: number): string {
  return distance >= 1000 ? `${round(divide(distance, 1000), 1)}km` : `${distance}m`;
}
