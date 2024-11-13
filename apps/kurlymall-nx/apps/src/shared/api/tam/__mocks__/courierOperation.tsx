import { RegionDeliveryCode } from '../../../interfaces/ShippingAddress';

export const fetchShippingAreaPolicyMock = {
  deliveryType: 'direct',
  deliveryTime: 'DAWN',
  clusterCenterCode: 'CC01',
  providerName: 'CJT',
  address: '강남구',
  addressDetail: '컬리',
  cutOff: undefined,
  regionCode: RegionDeliveryCode.AB,
  policies: [
    {
      courierOperation: {
        operation: {
          zone: 'DIRECT',
          time: 'DAWN',
        },
      },
      deactivation: {
        startAt: '14:31:00',
        endAt: '14:35:00',
      },
      order: {
        policy: {
          unavailability: {
            startAt: '22:00:00',
            endAt: '23:00:00',
            noticeMessage: '주문불가 시간입니다',
          },
        },
      },
    },
  ],
  isShippingUnavailable: false,
};

export const fetchCourierOperationResultMock = [
  {
    delivery_type: 'direct',
    delivery_time: 'DAWN',
    cluster_center_code: 'CC01',
    provider_name: 'CJT',
    addr: '강남구',
    addr_sub: '컬리',
    cut_off: {
      unavailability: {
        startAt: '18:04:05',
        endAt: '24:00:00',
        noticeMessage:
          '[화요일 18시~수요일 23시까지] 택배사 휴무로 주문이 불가합니다.\n *[일요일] 23시 이후 다시 이용 부탁드립니다.\n *                               꼭 [일요일] 23시 이후 다시 이용 해주셔야합니다. ',
      },
    },
    policies: [
      {
        courierOperation: {
          operation: {
            zone: 'DIRECT',
            time: 'DAWN',
          },
        },
        deactivation: {
          startAt: '14:31:00',
          endAt: '14:35:00',
        },
        order: {
          policy: {
            unavailability: {
              startAt: '22:00:00',
              endAt: '23:00:00',
              noticeMessage: '주문불가 시간입니다',
            },
          },
        },
      },
    ],
  },
];

export const fetchCourierOperation = jest.fn().mockResolvedValue(fetchCourierOperationResultMock);
