import { memo } from 'react';
import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { RecipientInfo } from '../../shared/interfaces/ReceiverForm.interface';
import { ONLY_KURLY_EMOJI_REGEX } from '../../../../shared/constant';

import MessageTextArea from '../../../../shared/components/Message/MessageTextArea';

const ContentContainer = styled.div`
  padding: 20px 20px;
`;

const Label = styled.label`
  display: inline-block;
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 11px;
`;

interface Props {
  recipientInfo: RecipientInfo;
  onChange: (params: { name: string; value: string }) => void;
}

function GiftMessageForm({ recipientInfo: { message }, onChange }: Props) {
  return (
    <ContentContainer>
      <Label>선물 메시지</Label>
      <MessageTextArea
        value={message}
        maxLength={50}
        denyPattern={ONLY_KURLY_EMOJI_REGEX}
        denyPatternEnterToSpace={false}
        countEmojiDouble={true}
        onChange={(value) =>
          onChange({
            name: 'message',
            value,
          })
        }
        placeholder="선물 메시지 내용을 입력해 주세요"
      />
    </ContentContainer>
  );
}

export default memo(GiftMessageForm);
