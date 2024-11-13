import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { KURLY_REGEX, PickupDetailCategoryTextMap } from '../../../../../../shared/constant';

import MessageTextArea from '../../../../../../shared/components/Message/MessageTextArea';
import COLOR from '../../../../../../shared/constant/colorset';
import { PickupDetailCategory } from '../../../../../../shared/enums';
import Radio from '../../../../../../shared/components/Input/Radio';

const Label = styled.div`
  padding: 8px 0 3px;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`;

const Star = styled.span`
  color: ${COLOR.pointText};
`;

const styles = {
  radio: css`
    > span {
      font-size: 14px;
      letter-spacing: -0.5px;
    }
  `,
  message: css`
    textarea: {
      font-size: 14px;
      line-height: 19px;
    }
  `,
};

interface Props {
  onChange: ({ name, value }: { name: string; value: string }) => void;
  pickupDetailCategory: PickupDetailCategory;
  pickupDetail: string;
}

export default function PickupDetailCategoryField({ onChange, pickupDetailCategory, pickupDetail }: Props) {
  return (
    <>
      <Label>
        기타장소 세부사항
        <Star>*</Star>
      </Label>
      <Radio
        id="etc-etc"
        name="pickupDetailCategory"
        label={PickupDetailCategoryTextMap.ETC}
        value={PickupDetailCategory.ETC}
        selectedValue={pickupDetailCategory}
        onChange={onChange}
        css={styles.radio}
      />
      {pickupDetailCategory === PickupDetailCategory.ETC && (
        <MessageTextArea
          id="etc-etc-field"
          name="pickupDetail"
          value={pickupDetail}
          onChange={(value) =>
            onChange({
              name: 'pickupDetail',
              value,
            })
          }
          maxLength={100}
          denyPattern={KURLY_REGEX}
          placeholder={`원하시는 장소를 자세히 입력해주세요.\n예 : 계단 밑, 주택단지 앞 경비초소를 지나 A동 출입구`}
          showCount={false}
          css={styles.message}
        />
      )}
      <Radio
        id="etc-pickup-box"
        name="pickupDetailCategory"
        label={PickupDetailCategoryTextMap.PICKUP_BOX}
        value={PickupDetailCategory.PICKUP_BOX}
        selectedValue={pickupDetailCategory}
        onChange={onChange}
        css={styles.radio}
      />
      {pickupDetailCategory === PickupDetailCategory.PICKUP_BOX && (
        <MessageTextArea
          id="etc-pickup-box-field"
          name="pickupDetail"
          value={pickupDetail}
          onChange={(value) =>
            onChange({
              name: 'pickupDetail',
              value,
            })
          }
          maxLength={100}
          denyPattern={KURLY_REGEX}
          placeholder={`원하시는 장소를 자세히 입력해주세요.\n예 : 1층 출입구 오른쪽 택배수령실에 배송해주세요.`}
          showCount={false}
          css={styles.message}
        />
      )}
      <Radio
        id="etc-front-of-entrance"
        name="pickupDetailCategory"
        label={PickupDetailCategoryTextMap.FRONT_OF_ENTRANCE}
        value={PickupDetailCategory.FRONT_OF_ENTRANCE}
        selectedValue={pickupDetailCategory}
        onChange={onChange}
        css={styles.radio}
      />
    </>
  );
}