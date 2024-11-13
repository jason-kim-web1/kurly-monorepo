import { DealProductOrderTypePolicy } from '../interfaces/DealProductOrderTypePolicy';

type Props = DealProductOrderTypePolicy[];

export const orderTypePolicyFixture: Props = [
  {
    normalOrderTypePolicy: 'DEFAULT',
    dealProductNo: 10095056,
  },
  {
    normalOrderTypePolicy: 'SINGLE_DIRECT_ORDER',
    dealProductNo: 11099054,
  },
  {
    normalOrderTypePolicy: 'SINGLE_DIRECT_ORDER',
    dealProductNo: 11093360,
  },
  {
    normalOrderTypePolicy: 'DEFAULT',
    dealProductNo: 11001102,
  },
  {
    normalOrderTypePolicy: 'DEFAULT',
    dealProductNo: 11001103,
  },
  {
    normalOrderTypePolicy: 'MULTIPLE_DIRECT_ORDER',
    dealProductNo: 11001113,
  },
];
