import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { ReceivePlace } from '../../../../../../shared/enums';

import Radio from '../../../../../../shared/components/Input/Radio';
import COLOR from '../../../../../../shared/constant/colorset';
import Info from '../../../../../../shared/icons/Info';

const Label = styled.div`
  padding: 0 0 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.5px;
`;

const Star = styled.span`
  color: ${COLOR.pointText};
`;

const RadioGroup = styled.div`
  > label {
    height: 44px;
    padding: 0;
    > span {
      font-size: 14px;
      line-height: 24px;
    }
  }
`;

const RadioItems = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const NotificationWrapper = styled.div`
  margin-top: 3px;
  padding: 10px 12px;
  border-radius: 6px;
  background-color: ${COLOR.kurlyGray100};
`;

const NotificationText = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 18px;
  color: ${COLOR.kurlyGray600};
  svg {
    margin-right: 6px;
  }
`;

const radio = css`
  > span {
    font-size: 14px;
    letter-spacing: -0.5px;
  }
`;

interface Props {
  onChange: (params: { name: string; value: string }) => void;
  selectedValue: ReceivePlace;
}

export default function ReceivePlaceField({ onChange, selectedValue }: Props) {
  return (
    <div>
      <Label>
        받으실 장소
        <Star>*</Star>
      </Label>
      <RadioGroup>
        <RadioItems>
          <Radio
            id="door"
            name="receivePlace"
            label="문 앞"
            value={ReceivePlace.DOOR}
            selectedValue={selectedValue}
            onChange={onChange}
            css={radio}
          />
          <Radio
            id="etc"
            name="receivePlace"
            label="기타 장소"
            value={ReceivePlace.ETC}
            selectedValue={selectedValue}
            onChange={onChange}
            css={radio}
          />
        </RadioItems>
        <NotificationWrapper>
          <NotificationText>
            <Info fill={COLOR.kurlyGray600} />
            경비실과 무인택배함 배송이 종료되었어요.
          </NotificationText>
        </NotificationWrapper>
      </RadioGroup>
    </div>
  );
}
