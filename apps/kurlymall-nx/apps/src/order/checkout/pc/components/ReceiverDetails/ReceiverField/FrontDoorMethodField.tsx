import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { FrontDoorMethodTextMap, KURLY_REGEX } from '../../../../../../shared/constant';
import COLOR from '../../../../../../shared/constant/colorset';
import { FrontDoorMethod } from '../../../../../../shared/enums';

import useToggle from '../../../../shared/hooks/useToggle';

import InputBox from '../../../../../../shared/components/Input/InputBox';
import Radio from '../../../../../../shared/components/Input/Radio';
import MessageTextArea from '../../../../../../shared/components/Message/MessageTextArea';
import { InputBoxPcStyles } from '../../../../shared/constants/receiverDetails';
import FrontDoorPasswordGuide from '../../../../shared/components/FrontDoorPassWordGuide';

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
  onChange: (params: { name: string; value: string }) => void;
  frontDoorMethod: FrontDoorMethod;
  frontDoorDetail: string;
}

export default function FrontDoorMethodField({ onChange, frontDoorMethod, frontDoorDetail }: Props) {
  const { open, close, isOpen } = useToggle();

  return (
    <>
      <Label>
        공동현관 출입방법
        <Star>*</Star>
      </Label>
      <Radio
        id="front-door-password"
        name="frontDoorMethod"
        label={FrontDoorMethodTextMap.PASSWORD}
        value={FrontDoorMethod.PASSWORD}
        selectedValue={frontDoorMethod}
        onChange={onChange}
        css={styles.radio}
      />
      {frontDoorMethod === FrontDoorMethod.PASSWORD && (
        <>
          <InputBox
            id="front-door-password-field"
            name="frontDoorDetail"
            placeholder="출입에 필요한 버튼을 모두 입력해주세요."
            type="text"
            onChange={onChange}
            value={frontDoorDetail}
            css={{
              ...InputBoxPcStyles,
              paddingBottom: '8px',
            }}
            maxLength={100}
            onFocus={open}
            onBlur={close}
          />
          <FrontDoorPasswordGuide value={frontDoorDetail} isFocus={isOpen} />
        </>
      )}
      <Radio
        id="front-door-free"
        name="frontDoorMethod"
        label={FrontDoorMethodTextMap.FREE}
        value={FrontDoorMethod.FREE}
        selectedValue={frontDoorMethod}
        onChange={onChange}
        css={styles.radio}
      />
      <Radio
        id="front-door-call-security-office"
        name="frontDoorMethod"
        label={FrontDoorMethodTextMap.CALL_SECURITY_OFFICE}
        value={FrontDoorMethod.CALL_SECURITY_OFFICE}
        selectedValue={frontDoorMethod}
        onChange={onChange}
        css={styles.radio}
      />
      {frontDoorMethod === FrontDoorMethod.CALL_SECURITY_OFFICE && (
        <MessageTextArea
          id="front-door-call-security-office-field"
          name="frontDoorDetail"
          value={frontDoorDetail}
          onChange={(value) =>
            onChange({
              name: 'frontDoorDetail',
              value,
            })
          }
          maxLength={100}
          denyPattern={KURLY_REGEX}
          placeholder={`경비실 호출 방법을 자세히 입력해주세요.\n예 : 공동현관에서 경비실 모양 버튼`}
          showCount={false}
          css={styles.message}
        />
      )}
      <Radio
        id="front-door-etc"
        name="frontDoorMethod"
        label={FrontDoorMethodTextMap.ETC}
        value={FrontDoorMethod.ETC}
        selectedValue={frontDoorMethod}
        onChange={onChange}
        css={styles.radio}
      />
      {frontDoorMethod === FrontDoorMethod.ETC && (
        <MessageTextArea
          id="front-door-etc-field"
          name="frontDoorDetail"
          value={frontDoorDetail}
          onChange={(value) =>
            onChange({
              name: 'frontDoorDetail',
              value,
            })
          }
          maxLength={100}
          denyPattern={KURLY_REGEX}
          placeholder="출입방법을 상세히 기재해주세요."
          showCount={false}
          css={styles.message}
        />
      )}
    </>
  );
}
