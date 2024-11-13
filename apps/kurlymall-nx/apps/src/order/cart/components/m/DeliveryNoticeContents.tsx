import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import { isNotEmpty } from '../../../../shared/utils/lodash-extends';
import getDeliveryNoticeContents from '../../utils/getDeliveryNoticeContents';
import { isPC } from '../../../../../util/window/getDevice';
import { DeliveryNotice } from '../../interface/DeliveryNotice';

const Wrapper = styled.div`
  text-align: center;
  white-space: pre-wrap;
  word-break: keep-all;
  padding: ${vars.spacing.$12} ${vars.spacing.$4} ${isPC ? '28px' : vars.spacing.$24};
`;

const Text = styled(Typography)<{ color?: string }>`
  color: ${({ color }) => color};
`;

const SubText = styled(Typography)`
  padding: ${vars.spacing.$16} ${vars.spacing.$0};
  margin-top: ${vars.spacing.$16};
  border-radius: ${vars.radius.$6};
  color: ${vars.color.$purple800};
  background: ${vars.color.$purple50};
`;

export default function DeliveryNoticeContents({ deliveryNotice }: { deliveryNotice: DeliveryNotice }) {
  const { deliveryText, basicStyle, subText } = getDeliveryNoticeContents(deliveryNotice);

  return (
    <Wrapper>
      {deliveryText.map(({ text, color, bold }) => {
        const isBold = bold ?? basicStyle?.bold;

        return (
          <Text key={text} color={color} variant={isBold ? '$xlargeSemibold' : '$xlargeRegular'} as={'span'}>
            {text}
          </Text>
        );
      })}
      {isNotEmpty(subText) && <SubText variant="$largeRegular">{subText}</SubText>}
    </Wrapper>
  );
}
