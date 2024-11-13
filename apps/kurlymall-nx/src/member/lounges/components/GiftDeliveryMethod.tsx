import { StyledDeliveryMethod } from '../shared/styled';
import { isPC } from '../../../../util/window/getDevice';
import { VipGiftDeliveryMethod } from '../shared/type';
import { VipGiftDeliveryMethodType } from '../shared/constants';

type GiftDeliveryMethodProps = {
  selectedMethod?: string;
  setMethod: (method: string) => void;
  isEdit: boolean;
  deliveryMethods?: VipGiftDeliveryMethod[];
};

function GiftDeliveryMethod({ selectedMethod, setMethod, isEdit, deliveryMethods }: GiftDeliveryMethodProps) {
  const deliveryType = deliveryMethods?.find((method) => method.type === VipGiftDeliveryMethodType.Delivery);
  const pickupType = deliveryMethods?.find((method) => method.type === VipGiftDeliveryMethodType.Pickup);

  return (
    <StyledDeliveryMethod className={isPC ? 'pc' : 'mobile'}>
      <div className="div-title">
        <img src="https://res.kurly.com/images/member-lounges/0701/gift_title01_v3.png" alt="01 수령날짜 선택하기" />
      </div>
      {isEdit ? (
        <>
          <div className="div-method-buttons">
            {deliveryType && (
              <button
                onClick={() => setMethod(deliveryType.text)}
                className={selectedMethod === deliveryType.text ? 'selected' : ''}
              >
                <span className="bold">{deliveryType.text}</span>
              </button>
            )}
            {pickupType &&
              pickupType.places?.map(({ name }) => (
                <button
                  key={name}
                  onClick={() => setMethod(name)}
                  className={selectedMethod === name ? 'selected' : ''}
                >
                  <span className="bold">{`${pickupType.text} `}</span>
                  <span>{name}</span>
                </button>
              ))}
          </div>
          <div className="div-guide">
            <div className="div-guide-title">아틀리에 폰드 매장 픽업 주소</div>
            {pickupType?.places?.map(({ name, address }) => (
              <div className="div-guide-content" key={name}>
                <div>{name}ㅣ</div>
                <div>{address}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="div-saved-data">
            {selectedMethod === deliveryType?.text ? selectedMethod : `${pickupType?.text} ${selectedMethod}`}
          </div>
        </>
      )}
    </StyledDeliveryMethod>
  );
}

export default GiftDeliveryMethod;
