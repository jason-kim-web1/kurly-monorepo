import { useMemo, useState } from 'react';
import { isAfter, isBefore } from 'date-fns';

import GiftDeliveryMethod from './GiftDeliveryMethod';
import GiftDeliveryCalendar from './GiftDeliveryCalendar';
import GiftDeliveryAddress from './GiftDeliveryAddress';
import { VIPBody } from '../shared/type';
import useGiftDeliveryQuery from '../hooks/useGiftDeliveryQuery';
import Alert from '../../../shared/components/Alert/Alert';
import { WrappedGiftDelivery } from '../shared/styled';
import { isPC } from '../../../../util/window/getDevice';
import GiftDeliveryTerms from './GiftDeliveryTerms';
import { ENVIRONMENT } from '../../../shared/configs/config';
import { DeliveryProps } from '../../../shared/interfaces/ShippingAddress';
import Notice from '../../../marketing/components/Notice';
import Images from '../../../marketing/components/Images';
import useScrollToTopWithTabs from '../../../marketing/hooks/useScrollToTopWithTabs';
import { VipGiftDeliveryMethodType } from '../shared/constants';

type GiftDeliveryProps = { images?: VIPBody['images']; body?: VIPBody };

function GiftDelivery({ images, body }: GiftDeliveryProps) {
  const { notices, id, giftConfig, terms } = body || {};
  const [deliveryMethod, setDeliveryMethod] = useState<string | undefined>(undefined);

  const { applyAvailableDate, deliveryAvailableDate, eventBoardId, deliveryMethods } = giftConfig || {};

  const deliveryType = deliveryMethods?.find((method) => method.type === VipGiftDeliveryMethodType.Delivery);

  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined);
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryProps>();

  const { isGiftLimitationExceed, userDeliveryData, initUserDeliveryData, saveGiftDeliveryData, excludeDates } =
    useGiftDeliveryQuery({
      eventBoardId: eventBoardId?.[ENVIRONMENT],
    });

  const { scrollToTopWithTabs } = useScrollToTopWithTabs();

  const handleSaveGiftDeliveryData = async () => {
    try {
      if (!deliveryMethod || !deliveryDate) {
        Alert({
          text: '수령방법과 수령날짜는 필수 입력 사항입니다.',
        });

        return;
      }

      if (deliveryMethod === deliveryType?.text && !deliveryAddress) {
        Alert({
          text: '배송 방법이 택배일 경우 주소는 필수 입력 사항입니다.',
        });

        return;
      }

      if (await isGiftLimitationExceed(deliveryDate.getDate())) {
        await Alert({
          text: '해당 일자 신청이 마감되었습니다.\n가능한 일자를 다시 선택해주세요!',
        });
      } else {
        await saveGiftDeliveryData({
          deliveryMethod,
          deliveryDate,
          deliveryAddress: deliveryMethod === deliveryType?.text ? deliveryAddress : undefined,
        });
        await Alert({
          text: '신청이 완료되었습니다.',
        });
      }
      scrollToTopWithTabs({ id: 'register-address-form' });
    } catch (err) {
      Alert({
        text: (err as Error)?.message,
      });
    }
  };

  const onClickSubmitButton = (isEdit: boolean) => () => {
    if (applyAvailableDate?.end && isAfter(new Date(), new Date(applyAvailableDate.end))) {
      Alert({
        text: '수령 신청 기간이 종료되었습니다. 고객 센터로 문의해주세요',
      });

      return;
    }

    if (isEdit) {
      handleSaveGiftDeliveryData();
    } else {
      initUserDeliveryData();
    }
  };

  const isEdit = !userDeliveryData;

  const showRegisterForm = useMemo(
    () => deliveryAvailableDate?.end && isBefore(new Date(), new Date(deliveryAvailableDate.end)),
    [deliveryAvailableDate?.end],
  );

  return (
    <WrappedGiftDelivery className={isPC ? 'pc' : 'mobile'} id={id}>
      <Images images={images} />
      {showRegisterForm && (
        <>
          <GiftDeliveryTerms termsContent={terms} />
          <div className="register-form" id="register-address-form">
            <div className="title">기프트 수령 신청하기</div>
            <div className="form">
              <GiftDeliveryMethod
                selectedMethod={userDeliveryData?.deliveryMethod || deliveryMethod}
                setMethod={setDeliveryMethod}
                isEdit={isEdit}
                deliveryMethods={deliveryMethods}
              />
              <GiftDeliveryCalendar
                selectedDate={userDeliveryData?.deliveryDate || deliveryDate}
                setDate={setDeliveryDate}
                isEdit={isEdit}
                deliveryAvailableDate={deliveryAvailableDate}
                excludeDates={excludeDates}
              />
              {userDeliveryData?.deliveryMethod === deliveryType?.text || deliveryMethod === deliveryType?.text ? (
                <GiftDeliveryAddress
                  selectedAddress={deliveryAddress}
                  setAddress={setDeliveryAddress}
                  isEdit={isEdit}
                  savedAddress={userDeliveryData?.deliveryAddress}
                />
              ) : null}
              <section className="section-submit">
                <button onClick={onClickSubmitButton(isEdit)}>{isEdit ? '신청 완료하기' : '수령 정보 수정하기'}</button>
              </section>
              <div className="notice">{notices ? <Notice notices={notices} hasFolding={false} /> : null}</div>
            </div>
          </div>
        </>
      )}
    </WrappedGiftDelivery>
  );
}

export default GiftDelivery;
