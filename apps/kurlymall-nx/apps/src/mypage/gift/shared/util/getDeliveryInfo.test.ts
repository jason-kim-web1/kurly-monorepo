import { FrontDoorMethodTextMap, OldReceivePlaceTextMap } from '../../../../shared/constant';
import { FrontDoorMethod, ReceivePlace, ReusablePackage } from '../../../../shared/enums';
import { ReusablePackageTextMap } from '../../../../shared/interfaces';
import { Address } from '../../../../shared/interfaces/OrderDetail';
import { deliveryInfoFixture } from '../fixtures/deliveryInfo.fixture';
import { getDeliveryInfo } from './getDeliveryInfo';
import { DeliveryTimeType } from '../../../../shared/interfaces/ShippingAddress';

const EMPTY_COMMENT = '요청사항 없음';

const getAddressRow = ({ address, addressDetail, zipcode }: Address) => {
  const contents = zipcode ? `(${zipcode}) ${address} ${addressDetail}` : `${address} ${addressDetail}`;

  return [{ subject: '주소', contents }];
};

const getPlaceNameRow = ({ pickupType }: { pickupType: ReceivePlace }) => [
  { subject: '받으실 장소', contents: OldReceivePlaceTextMap[pickupType] },
];

const getDoorNameRow = ({
  accessMethod,
  accessDetail = '',
}: {
  accessMethod: FrontDoorMethod;
  accessDetail?: string;
}) => {
  const contents = accessDetail
    ? `${FrontDoorMethodTextMap[accessMethod]} (${accessDetail})`
    : FrontDoorMethodTextMap[accessMethod];

  return [{ subject: '공동현관 출입방법', contents }];
};

const getReusablePackageRow = ({ packingType }: { packingType: ReusablePackage | null }) => [
  {
    subject: '포장 방법',
    contents: packingType ? ReusablePackageTextMap[packingType] : '',
  },
];

const getPickupRow = ({
  pickupType,
  pickupDetail,
}: {
  pickupType: Exclude<ReceivePlace, ReceivePlace.DOOR>;
  pickupDetail: string;
}) => {
  const pickupMapper: Omit<Record<ReceivePlace, string>, ReceivePlace.DOOR> = {
    [ReceivePlace.ETC]: '기타 장소',
  };

  return [
    {
      subject: pickupMapper[pickupType],
      contents: pickupDetail ? pickupDetail : EMPTY_COMMENT,
      ...(!pickupDetail && { className: 'gray-text' }),
    },
  ];
};

const getReceiverMemoRow = ({ memo }: { memo: string | null }) => {
  return [
    {
      subject: '배송 기사 요청사항',
      contents: memo ? memo : EMPTY_COMMENT,
      ...(!memo && { className: 'gray-text' }),
    },
  ];
};

describe('getDeliveryInfo test', () => {
  given('deliveryInfo', () => deliveryInfoFixture);
  it('받는 분 이름을 포함하고 있다.', () => {
    const row = [{ subject: '받는분', contents: '김컬리' }];

    expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(expect.arrayContaining(row));
  });

  it('마스킹된 핸드폰 번호를 포함하고 있다.', () => {
    const row = [{ subject: '핸드폰', contents: '010-1234-****' }];

    expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(expect.arrayContaining(row));
  });

  context('우편 번호가 있는 경우', () => {
    const address: Address = {
      address: '도로명주소',
      addressDetail: '상세 주소',
      zipcode: '신우편주소',
    };

    it('우편 번호가 존재하는 주소를 볼 수 있다.', () => {
      expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(expect.arrayContaining(getAddressRow({ ...address })));
    });
  });

  context("우편 번호가 빈 스트링('')인 경우", () => {
    const address: Address = {
      address: '도로명주소',
      addressDetail: '상세 주소',
      zipcode: '',
    };
    given('deliveryInfo', () => ({ ...deliveryInfoFixture, address }));

    it('우편 번호가 없는 주소를 볼 수 있다.', () => {
      expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(expect.arrayContaining(getAddressRow({ ...address })));
    });
  });

  describe('샛별배송인 경우', () => {
    const deliveryPolicy = DeliveryTimeType.DAWN;
    const dawnDeliveryInfoFixture = { ...deliveryInfoFixture, deliveryPolicy };
    given('deliveryInfo', () => dawnDeliveryInfoFixture);

    context('받으실 장소가 문 앞 인 경우', () => {
      const pickupType = ReceivePlace.DOOR;
      const doorDeliveryInfoFixture = {
        ...dawnDeliveryInfoFixture,
        pickupType,
      };
      given('deliveryInfo', () => ({ ...doorDeliveryInfoFixture }));
      it('받으실 장소에 문 앞 볼 수 있다.', () => {
        expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(
          expect.arrayContaining(getPlaceNameRow({ pickupType })),
        );
      });

      context('공동현관 출입방법이 공동현관 비밀번호 인 경우', () => {
        const accessMethod = FrontDoorMethod.PASSWORD;
        const accessDetail = '0000';
        given('deliveryInfo', () => ({
          ...doorDeliveryInfoFixture,
          accessMethod,
          accessDetail,
        }));
        it('공동현관 출입방법에 마스킹된 공동현관 비밀번호를 볼 수 있다.', () => {
          expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(
            expect.arrayContaining(getDoorNameRow({ accessMethod, accessDetail })),
          );
        });
      });

      context('공동현관 출입방법이 자유 출입 가능 인 경우', () => {
        const accessMethod = FrontDoorMethod.FREE;
        given('deliveryInfo', () => ({
          ...doorDeliveryInfoFixture,
          accessMethod,
        }));
        it('공동현관 출입방법에 자유 출입 가능을 볼 수 있다.', () => {
          expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(
            expect.arrayContaining(getDoorNameRow({ accessMethod })),
          );
        });
      });

      context('공동현관 출입방법이 기타 인 경우', () => {
        const accessMethod = FrontDoorMethod.ETC;
        const accessDetail = '기타 상세 내용';
        given('deliveryInfo', () => ({
          ...doorDeliveryInfoFixture,
          accessMethod,
          accessDetail,
        }));
        it('공동현관 출입방법에 기타 상세 내용을 볼 수 있다.', () => {
          expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(
            expect.arrayContaining(getDoorNameRow({ accessMethod, accessDetail })),
          );
        });
      });
    });

    context('받으실 장소가 기타 장소 인 경우', () => {
      const pickupType = ReceivePlace.ETC;
      const pickupDetail = '요청사항';
      const etcDeliveryInfoFixture = {
        ...dawnDeliveryInfoFixture,
        pickupType,
        pickupDetail,
      };
      given('deliveryInfo', () => ({ ...etcDeliveryInfoFixture }));

      it('받으실 장소에 기타 장소를 볼 수 있다.', () => {
        expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(
          expect.arrayContaining(getPlaceNameRow({ pickupType })),
        );
      });

      it('기타 장소에서 "요청사항"을 볼 수 있다.', () => {
        expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(
          expect.arrayContaining(getPickupRow({ pickupType, pickupDetail })),
        );
      });
    });

    context('포장 방법이 개인 보냉백인 경우', () => {
      const packingType = ReusablePackage.PERSONAL;
      given('deliveryInfo', () => ({
        ...dawnDeliveryInfoFixture,
        packingType,
      }));

      it('포장 방법에 개인 보냉백을 볼 수 있다.', () => {
        expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(
          expect.arrayContaining(getReusablePackageRow({ packingType })),
        );
      });
    });

    context('포장 방법이 컬리 퍼플박스인 경우', () => {
      const packingType = ReusablePackage.KURLY;
      given('deliveryInfo', () => ({
        ...dawnDeliveryInfoFixture,
        packingType,
      }));

      it('포장 방법에 컬리 퍼플박스를 볼 수 있다.', () => {
        expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(
          expect.arrayContaining(getReusablePackageRow({ packingType })),
        );
      });
    });

    context('포장 방법 종이 포장재인 경우', () => {
      const packingType = ReusablePackage.PAPER;
      given('deliveryInfo', () => ({
        ...dawnDeliveryInfoFixture,
        packingType,
      }));

      it('포장 방법에 종이 포장재를 볼 수 있다.', () => {
        expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(
          expect.arrayContaining(getReusablePackageRow({ packingType })),
        );
      });
    });
  });

  describe('택배배송 인 경우', () => {
    const deliveryPolicy = DeliveryTimeType.DAY;
    const accessMethod = null;
    const accessDetail = '';
    const pickupType = null;
    const dayDeliveryInfoFixture = {
      ...deliveryInfoFixture,
      accessMethod,
      accessDetail,
      pickupType,
      deliveryPolicy,
    };
    given('deliveryInfo', () => dayDeliveryInfoFixture);

    context('배송 기사 요청사항이 있는 경우', () => {
      const receiver = {
        memo: '요청사항',
      };
      given('deliveryInfo', () => ({ ...dayDeliveryInfoFixture, ...receiver }));

      it('배송 기사 요청사항에서 "요청사항"을 볼 수 있다.', () => {
        expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(
          expect.arrayContaining(getReceiverMemoRow({ ...receiver })),
        );
      });
    });

    context('배송 기사 요청사항이 존재하지 않는 경우', () => {
      const receiver = {
        memo: '',
      };
      given('deliveryInfo', () => ({ ...dayDeliveryInfoFixture, ...receiver }));

      it('배송 기사 요청사항에서 "요청사항 없음"을 볼 수 있다.', () => {
        expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(
          expect.arrayContaining(getReceiverMemoRow({ ...receiver })),
        );
      });
    });
  });

  describe('하루배송 인 경우', () => {
    const deliveryPolicy = DeliveryTimeType.MANUAL;
    const packingType = null;
    const manualDeliveryInfoFixture = {
      ...deliveryInfoFixture,
      packingType,
      deliveryPolicy,
    };
    given('deliveryInfo', () => manualDeliveryInfoFixture);

    it('포장 방법을 확인할 수 없다', () => {
      expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(
        expect.not.arrayContaining(getReusablePackageRow({ packingType })),
      );
    });
  });

  describe('배송안함(=무배송) 인 경우', () => {
    const deliveryPolicy = null;
    const packingType = null;
    const isDeliveryProduct = false;
    const noneDeliveryInfoFixture = {
      ...deliveryInfoFixture,
      packingType,
      isDeliveryProduct,
      deliveryPolicy,
    };
    given('deliveryInfo', () => noneDeliveryInfoFixture);

    it('포장 방법을 확인할 수 없다', () => {
      expect(getDeliveryInfo({ ...given.deliveryInfo })).toEqual(
        expect.not.arrayContaining(getReusablePackageRow({ packingType })),
      );
    });
  });
});
