export const fetchCheckAddressMock = async () => ({
  data: {
    delivery_type: 'direct',
    delivery_time: 'DAWN',
    cluster_center_code: 'CC01',
    provider_name: 'FRS',
    addr: '부산 해운대구 APEC로 17 (센텀리더스마크)',
    addr_sub: '',
    cut_off: {
      unavailability: {
        startAt: '22:00:00',
        endAt: '23:00:00',
        noticeMessage: '오늘의 주문이 마감되었습니다. 23시 이후 주문이 가능하오니 추후 다시 이용 부탁드립니다.',
      },
    },
    region_group_name: 'BS',
    policies: [
      {
        courierOperation: {
          operation: {
            zone: 'DIRECT',
            time: 'DAWN',
          },
        },
        deactivation: {
          startAt: '18:00:00',
          endAt: '22:00:00',
        },
        order: {
          policy: {
            unavailability: {
              startAt: '22:00:00',
              endAt: '23:00:00',
              noticeMessage: '오늘의 주문이 마감되었습니다. 23시 이후 주문이 가능하오니 추후 다시 이용 부탁드립니다.',
            },
          },
        },
      },
      {
        courierOperation: {
          operation: {
            zone: 'INDIRECT',
            time: 'DAY',
          },
        },
        deactivation: null,
        order: {
          policy: {
            unavailability: {
              startAt: '22:00:00',
              endAt: '23:00:00',
              noticeMessage:
                '오늘의 택배 주문이 마감되었습니다. 23시 이후 주문이 가능하오니 추후 다시 이용 부탁드립니다.',
            },
          },
        },
      },
    ],
  },
});
