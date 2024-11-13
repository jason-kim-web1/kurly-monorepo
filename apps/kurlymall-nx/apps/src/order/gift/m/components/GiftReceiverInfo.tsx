import { memo, useCallback, useEffect } from 'react';
import { isEmpty } from 'lodash';
import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { NUMBER_DENY_REGEX, ONLY_KOREAN_ENGLISH_NUMBER_REGEX_FOR_GIFT_RECEIVER } from '../../../../shared/constant';

import { NotificationType, Notification, RecipientInfo } from '../../shared/interfaces/ReceiverForm.interface';
import { useWebview } from '../../../../shared/hooks';
import appService from '../../../../shared/services/app.service';
import { removeHyphen } from '../../../../shared/services';

import { iconGiftArrow } from '../../../../shared/images';
import Radio from '../../../../shared/components/Input/Radio';
import InputBox from '../../../../shared/components/Input/InputBox';
import Icon from '../../../../shared/components/icons/Icon';
import { isAos } from '../../../../../util/window/getDevice';

const ContentContainer = styled.div`
  padding: 0px 20px 20px 20px;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Guide = styled.p`
  font-size: 13px;
  color: ${COLOR.kurlyGray450};
  line-height: 18px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
`;

const ContactButton = styled.button`
  color: ${COLOR.kurlyPurple};
  img {
    margin-top: 2px;
    width: 16px;
    height: 16px;
    vertical-align: top;
  }
`;

const Star = styled.span`
  color: ${COLOR.pointText};
`;

const styles = {
  radio: {
    width: '50%',
  },
  input: {
    marginTop: '12px',
    marginBottom: '2px',
    fontSize: '16px',
    lineHeight: '21px',
    input: {
      '::placeholder': {
        color: COLOR.placeholder,
      },
    },
  },
};

interface Contacts {
  phone: string;
  contact: string;
  name: string;
}

declare global {
  interface Window {
    setContacts: (data: string) => void;
  }
}

interface Props {
  recipientInfo: RecipientInfo;
  notificationType: NotificationType;
  onChange: (params: { name: string; value: string }) => void;
  onChangeContact: (params: { name: string; phone: string }) => void;
}

function GiftReceiverInfo({ notificationType, recipientInfo: { name, phone }, onChange, onChangeContact }: Props) {
  const webview = useWebview();

  const onClickContact = () => {
    appService.getContacts();
  };

  const setContacts = useCallback(
    (data: string) => {
      if (isEmpty(data)) {
        return;
      }

      const result = JSON.parse(data)[0] as Contacts;

      onChangeContact({
        name: result.name.replace(ONLY_KOREAN_ENGLISH_NUMBER_REGEX_FOR_GIFT_RECEIVER, ''),
        phone: removeHyphen(isAos ? result.contact : result.phone),
      });
    },
    [onChangeContact],
  );

  useEffect(() => {
    window.setContacts = setContacts;
  }, [setContacts]);

  return (
    <ContentContainer>
      <RadioWrapper>
        <Radio
          label="카카오톡"
          value={Notification.KAKAO_TALK}
          name="message-type"
          id="message-kakao"
          onChange={onChange}
          selectedValue={notificationType}
          css={styles.radio}
        />
        <Radio
          label="연락처"
          value={Notification.SMS}
          name="message-type"
          id="message-sms"
          onChange={onChange}
          selectedValue={notificationType}
          css={styles.radio}
        />
        <Guide>
          {notificationType === Notification.KAKAO_TALK
            ? '카카오톡 친구에게 직접 메시지를 발송할 수 있습니다.'
            : '컬리 카톡 채널로 안내되며 미설치 시 문자 발송됩니다.'}
        </Guide>
      </RadioWrapper>
      <Label>
        <span>
          받으실 분 이름
          <Star>*</Star>
        </span>
      </Label>
      <InputBox
        id="recipient-name"
        name="name"
        placeholder="이름을 입력해 주세요"
        value={name}
        maxLength={20}
        denyPattern={ONLY_KOREAN_ENGLISH_NUMBER_REGEX_FOR_GIFT_RECEIVER}
        onChange={onChange}
        css={styles.input}
        hasDeleteButton={name?.length > 0}
      />

      <Label>
        <span>
          받으실 분 연락처
          {notificationType === Notification.SMS && <Star>*</Star>}
        </span>
        {webview && (
          <ContactButton onClick={onClickContact}>
            연락처 불러오기
            <Icon src={iconGiftArrow} alt="" />
          </ContactButton>
        )}
      </Label>
      <InputBox
        id="recipient-phone"
        name="phone"
        type="tel"
        placeholder="숫자만 입력해주세요"
        value={phone}
        maxLength={11}
        denyPattern={NUMBER_DENY_REGEX}
        onChange={onChange}
        css={styles.input}
        hasDeleteButton={phone?.length > 0}
      />
      <Guide>안전한 배송을 위해 받으실 분 연락처를 입력해 주세요</Guide>
    </ContentContainer>
  );
}

export default memo(GiftReceiverInfo);
