import {
  DeliveryCompleteMessage,
  FrontDoorMethod,
  PickupDetailCategory,
  ReceivePlace,
  ReceiverDetailTemplate,
} from '../../../../shared/enums';
import { findNotAllowText, reformattedString } from '../../../../shared/utils';
import {
  REQUIRED_FILL_RECEIVER_CONTACT_MESSAGE,
  REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE,
  REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE,
} from '../constants/delivery-request-validate-message';
import { ReceiverForm } from '../interfaces';
import { validateDeliveryReceiverInfo, validateDeliveryField, validateDirectDelivery } from './validateDeliveryInfo';
import { BaseAddressType } from '../../../../shared/interfaces/ShippingAddress';

describe('validateDeliveryReceiverInfo - 받는 분 정보 검증 테스트', () => {
  describe('받는 분 이름 검증', () => {
    context('빈 문자열이 있으면', () => {
      given('receiverForm', () => ({
        name: '',
        phone: '01011111111',
      }));

      it('에러 메세지에 받는 분 이름을 입력해주세요.을 반환한다.', () => {
        const { errorMessage, documentId } = validateDeliveryReceiverInfo(given.receiverForm);

        expect(errorMessage).toBe('받는 분 이름을 입력해주세요.');
        expect(documentId).toBe('receiver-name');
      });
    });

    context('허용 불가능 문자가 있으면', () => {
      given('receiverForm', () => ({
        name: '뷁333',
        phone: '01011111111',
      }));

      it('사용할 수 없는 문자가 있어 삭제 되었다는 에러메세지를 반환한다.', () => {
        const { errorMessage, documentId, reformattedField } = validateDeliveryReceiverInfo(given.receiverForm);

        const notAllowedText = findNotAllowText(given.receiverForm.name);
        expect(errorMessage).toBe(
          `사용할 수 없는 문자가 있어 삭제되었습니다. 확인 후 다시 저장해주세요.\n${notAllowedText?.join(' ')}`,
        );
        expect(documentId).toBe('receiver-name');
        expect(reformattedField).toStrictEqual({
          value: 'name',
          text: reformattedString(given.receiverForm.name, notAllowedText),
        });
      });
    });
  });

  describe('휴대폰 번호 검증', () => {
    context('값이 비어있으면', () => {
      given('receiverForm', () => ({
        name: '이름',
        phone: '',
      }));

      it('에러메세지 휴대폰 번호를 입력해주세요.를 반환한다.', () => {
        const { errorMessage, documentId } = validateDeliveryReceiverInfo(given.receiverForm);

        expect(errorMessage).toBe('휴대폰 번호를 입력해주세요.');
        expect(documentId).toBe('receiver-phone');
      });
    });

    context('허용 불가능 문자가 있으면', () => {
      given('receiverForm', () => ({
        name: '이름',
        phone: '010ㅁㄴㅇㄹ1',
      }));

      it('에러메세지 휴대폰 번호를 정확히 입력해주세요.를 반환한다.', () => {
        const { errorMessage, documentId } = validateDeliveryReceiverInfo(given.receiverForm);

        expect(errorMessage).toBe('휴대폰 번호를 정확히 입력해주세요.');
        expect(documentId).toBe('receiver-phone');
      });
    });

    context('휴대폰 번호가 "010-0000-0000" 이면', () => {
      given('receiverForm', () => ({
        name: '이름',
        phone: '010ㅁㄴㅇㄹ1',
      }));

      it('에러메세지 휴대폰 번호를 정확히 입력해주세요.를 반환한다.', () => {
        const { errorMessage, documentId } = validateDeliveryReceiverInfo(given.receiverForm);

        expect(errorMessage).toBe('휴대폰 번호를 정확히 입력해주세요.');
        expect(documentId).toBe('receiver-phone');
      });
    });
  });
});

describe('validateDeliveryInfo - 배송 정보 검증 테스트', () => {
  describe('(샛별) 배송 상세 정보 검증', () => {
    const mock: ReceiverForm = {
      latitude: 0,
      longitude: 0,
      addressNo: -1,
      name: '',
      phone: '',
      address: '',
      addressDetail: '',
      roadAddress: '',
      isDefaultAddress: false,
      baseAddressType: BaseAddressType.road,
      receivePlace: ReceivePlace.DOOR,
      frontDoorMethod: FrontDoorMethod.PASSWORD,
      frontDoorDetail: '',
      pickupDetailCategory: PickupDetailCategory.ETC,
      pickupDetail: '',
      deliveryCompleteMessage: DeliveryCompleteMessage.IMMEDIATELY,
      deliveryType: 'direct',
      requiredFillReceiverDetail: false,
      requiredFillReceiverContact: false,
      receiverTemplate: ReceiverDetailTemplate.DEFAULT,
    };

    context('모든 정보가 올바르면', () => {
      given('receiverForm', () => ({
        ...mock,
        receivePlace: ReceivePlace.DOOR,
        frontDoorMethod: FrontDoorMethod.FREE,
      }));

      it('에러 메세지를 반환하지 않는다.', () => {
        const { errorMessage, documentId } = validateDirectDelivery(given.receiverForm);

        expect(errorMessage).toBe('');
        expect(documentId).toBe('');
      });
    });

    context('필수 정보가 없으면', () => {
      it.each([
        // 출입방법 : 문앞
        {
          receiverForm: {
            ...mock,
            receivePlace: ReceivePlace.DOOR,
            frontDoorMethod: FrontDoorMethod.PASSWORD,
            frontDoorDetail: '',
          },
          expected: '공동현관 비밀번호를 입력해주세요.',
          id: 'front-door-password-field',
        },
        {
          receiverForm: {
            ...mock,
            receivePlace: ReceivePlace.DOOR,
            frontDoorMethod: FrontDoorMethod.ETC,
            frontDoorDetail: '',
          },
          expected: '문 앞 기타 출입방법 내용을 입력해주세요.',
          id: 'front-door-etc-field',
        },
        // 출입방법: 기타
        {
          receiverForm: {
            ...mock,
            receivePlace: ReceivePlace.ETC,
            pickupDetailCategory: PickupDetailCategory.ETC,
            pickupDetail: '',
          },
          expected: '기타 장소 세부 사항 내용을 입력해주세요.',
          id: 'etc-etc-field',
        },
        {
          receiverForm: {
            ...mock,
            receivePlace: ReceivePlace.ETC,
            pickupDetailCategory: PickupDetailCategory.PICKUP_BOX,
            pickupDetail: '',
          },
          expected: '택배 수령실 위치를 자세히 입력해주세요.',
          id: 'etc-pickup-box-field',
        },
      ])('expected 값을 반환 받는다.', ({ receiverForm, expected, id }) => {
        const { errorMessage, documentId } = validateDirectDelivery(receiverForm);

        expect(errorMessage).toBe(expected);
        expect(documentId).toBe(id);
      });
    });

    context('입력 정보가 올바르지 않다면', () => {
      it.each([
        // 출입방법 : 문앞
        {
          fieldName: 'frontDoorDetail',
          value: '뷁',
          receiverForm: {
            ...mock,
            receivePlace: ReceivePlace.DOOR,
            frontDoorMethod: FrontDoorMethod.PASSWORD,
            frontDoorDetail: '뷁',
          },
          expected: '공동현관 비밀번호에 사용할 수 없는 문자가 있어 삭제되었습니다. 확인 후 다시 저장해주세요.',
          id: 'front-door-password-field',
        },
        {
          fieldName: 'frontDoorDetail',
          value: '뷁',
          receiverForm: {
            ...mock,
            receivePlace: ReceivePlace.DOOR,
            frontDoorMethod: FrontDoorMethod.CALL_SECURITY_OFFICE,
            frontDoorDetail: '뷁',
          },
          expected: '경비실 호출 방법에 사용할 수 없는 문자가 있어 삭제되었습니다. 확인 후 다시 저장해주세요.',
          id: 'front-door-call-security-office-field',
        },
        {
          fieldName: 'frontDoorDetail',
          value: '뷁',
          receiverForm: {
            ...mock,
            receivePlace: ReceivePlace.DOOR,
            frontDoorMethod: FrontDoorMethod.ETC,
            frontDoorDetail: '뷁',
          },
          expected: '문 앞 기타 출입방법에 사용할 수 없는 문자가 있어 삭제되었습니다. 확인 후 다시 저장해주세요.',
          id: 'front-door-etc-field',
        },
        // 출입방법 : 기타
        {
          fieldName: 'pickupDetail',
          value: '뷁',
          receiverForm: {
            ...mock,
            receivePlace: ReceivePlace.ETC,
            pickupDetailCategory: PickupDetailCategory.ETC,
            pickupDetail: '뷁',
          },
          expected: '기타 장소 세부 사항에 사용할 수 없는 문자가 있어 삭제되었습니다. 확인 후 다시 저장해주세요.',
          id: 'etc-etc-field',
        },
        {
          fieldName: 'pickupDetail',
          value: '뷁',
          receiverForm: {
            ...mock,
            receivePlace: ReceivePlace.ETC,
            pickupDetailCategory: PickupDetailCategory.PICKUP_BOX,
            pickupDetail: '뷁',
          },
          expected: '택배 수령 장소 내용에 사용할 수 없는 문자가 있어 삭제되었습니다. 확인 후 다시 저장해주세요.',
          id: 'etc-pickup-box-field',
        },
      ])('expected 값을 반환 받는다.', ({ receiverForm, expected, id, fieldName, value }) => {
        const { errorMessage, documentId, reformattedField } = validateDirectDelivery(receiverForm);

        const notAllowedText = findNotAllowText(value);

        expect(errorMessage).toBe(`${expected}\n${notAllowedText?.join(' ')}`);
        expect(documentId).toBe(id);

        if (reformattedField) {
          expect(reformattedField).toStrictEqual({
            value: fieldName,
            text: reformattedString(value, notAllowedText),
          });
        }
      });
    });
  });
});

describe('validateDeliveryField - 주문서 - 배송 입력 내용 검증 테스트', () => {
  context('모든 정보가 올바르면', () => {
    given('receiverForm', () => ({
      name: '이름',
      phone: '010-1234-1234',
      addressNo: 1,
      receivePlace: ReceivePlace.DOOR,
      frontDoorMethod: FrontDoorMethod.FREE,
      frontDoorDetail: 'ㅁㄴㅇㄹ',
      deliveryType: 'direct',
    }));

    it('에러메세지를 반환하지 않는다.', () => {
      const { errorMessage, documentId } = validateDeliveryField(given.receiverForm);

      expect(errorMessage).toBe('');
      expect(documentId).toBe('');
    });
  });

  context('requiredFillReceiverDetail 와 requiredFillReceiverContact 값이 true이면', () => {
    given('receiverForm', () => ({
      requiredFillReceiverDetail: true,
      requiredFillReceiverContact: true,
    }));

    it('에러메세지 "REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE".을 반환한다.', () => {
      const { errorMessage, documentId } = validateDeliveryField(given.receiverForm);

      expect(errorMessage).toBe(`${REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE}.`);
      expect(documentId).toBe('checkout-shipping-details');
    });
  });

  context('requiredFillReceiverDetail 값이 true이면', () => {
    given('receiverForm', () => ({
      requiredFillReceiverDetail: true,
    }));

    it('에러메세지 "REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE."을 반환한다.', () => {
      const { errorMessage, documentId } = validateDeliveryField(given.receiverForm);

      expect(errorMessage).toBe(`${REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE}.`);
      expect(documentId).toBe('checkout-shipping-details');
    });
  });

  context('requiredFillReceiverContact 값이 true이면', () => {
    given('receiverForm', () => ({
      requiredFillReceiverContact: true,
    }));

    it('에러메세지 "REQUIRED_FILL_RECEIVER_CONTACT_MESSAGE."을 반환한다.', () => {
      const { errorMessage, documentId } = validateDeliveryField(given.receiverForm);

      expect(errorMessage).toBe(`${REQUIRED_FILL_RECEIVER_CONTACT_MESSAGE}.`);
      expect(documentId).toBe('checkout-shipping-details');
    });
  });

  context('받을 장소가 없으면', () => {
    given('receiverForm', () => ({
      name: '이름',
      phone: '010-1234-1234',
      addressNo: -1,
    }));

    it('에러메세지 받으실 장소를 입력해주세요.을 반환한다.', () => {
      const { errorMessage, documentId } = validateDeliveryField(given.receiverForm);

      expect(errorMessage).toBe('받으실 장소를 입력해주세요.');
      expect(documentId).toBe('checkout-shipping-details');
    });
  });

  context('배송 불가 지역이면', () => {
    given('receiverForm', () => ({
      name: '이름',
      phone: '010-1234-1234',
      addressNo: 1,
      deliveryType: 'disable',
    }));

    it('에러메세지 안타깝지만 배송 불가 지역입니다. 배송지를 변경해주세요.를 반환한다.', () => {
      const { errorMessage, documentId } = validateDeliveryField(given.receiverForm);

      expect(errorMessage).toBe('안타깝지만 배송 불가 지역입니다. 배송지를 변경해주세요.');
      expect(documentId).toBe('checkout-shipping-details');
    });
  });

  context('샛별 지역이지만 상세 정보를 입력하지 않았으면', () => {
    given('receiverForm', () => ({
      name: '이름',
      phone: '010-1234-1234',
      addressNo: 1,
      receivePlace: ReceivePlace.DOOR,
      frontDoorMethod: FrontDoorMethod.PASSWORD,
      frontDoorDetail: '',
      deliveryType: 'direct',
    }));

    it('에러메세지 받으실 장소를 입력해주세요.을 반환한다.', () => {
      const { errorMessage, documentId } = validateDeliveryField(given.receiverForm);

      expect(errorMessage).toBe('받으실 장소를 입력해주세요.');
      expect(documentId).toBe('checkout-shipping-details');
    });
  });
});
