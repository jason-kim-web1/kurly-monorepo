import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { DeliveryCompleteMessage, ReceiverDetailTemplate } from '../../../../../../shared/enums';

import Radio from '../../../../../../shared/components/Input/Radio';
import COLOR from '../../../../../../shared/constant/colorset';

const Wrapper = styled.div`
  margin-bottom: 24px;
`;

const RadioGroup = styled.div`
  display: flex;
`;

const Label = styled.label`
  display: inline-block;
  padding: 8px 0 5px;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
`;

const Star = styled.span`
  color: ${COLOR.pointText};
`;

const radio = css`
  :first-of-type {
    margin-right: 72px;
  }
`;

interface Props {
  onChange: (params: { name: string; value: string }) => void;
  selectedValue: DeliveryCompleteMessage;
  receiverDetailTemplate: ReceiverDetailTemplate;
}

export default function DeliveryCompleteField({ onChange, selectedValue, receiverDetailTemplate }: Props) {
  if (receiverDetailTemplate === ReceiverDetailTemplate.NO_DELIVERY_MSG_TIME) {
    return null;
  }

  // 특정 권역은 8시로 보여줌
  const isAM8 = receiverDetailTemplate === ReceiverDetailTemplate.AM8;

  return (
    <Wrapper>
      <Label>
        배송 완료 메시지 전송
        <Star>*</Star>
      </Label>
      <RadioGroup>
        <Radio
          css={radio}
          id="immediately-after"
          name="deliveryCompleteMessage"
          label="배송 직후"
          value={DeliveryCompleteMessage.IMMEDIATELY}
          selectedValue={selectedValue}
          onChange={onChange}
        />
        <Radio
          css={radio}
          id="delivery-after"
          name="deliveryCompleteMessage"
          label={isAM8 ? '오전 8시' : '오전 7시'}
          value={isAM8 ? DeliveryCompleteMessage.AM8 : DeliveryCompleteMessage.AM7}
          selectedValue={selectedValue}
          onChange={onChange}
        />
      </RadioGroup>
    </Wrapper>
  );
}
