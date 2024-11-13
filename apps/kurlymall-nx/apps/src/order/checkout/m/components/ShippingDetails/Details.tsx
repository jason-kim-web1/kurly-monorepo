import styled from '@emotion/styled';
import { isEmpty } from 'lodash';

import COLOR from '../../../../../shared/constant/colorset';

import { ReceiverForm } from '../../../shared/interfaces';
import { getReceiverDetail } from '../../../shared/utils';

import Empty from './Empty';
import { ReceivePlace } from '../../../../../shared/enums';
import { REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE } from '../../../shared/constants/delivery-request-validate-message';

const Contents = styled.div`
  padding: 6px 0;
`;

const Head = styled.span`
  font-size: 16px;
  font-weight: 600;
  line-height: 21px;
  color: ${COLOR.kurlyGray800};
  > span {
    color: ${COLOR.kurlyPurple};
  }
`;

const VerticalDivider = styled.span`
  display: inline-block;
  width: 1px;
  height: 12px;
  margin: 3px 8px 0;
  background-color: ${COLOR.lightGray};
  vertical-align: center;
  box-sizing: border-box;
`;

const DetailInfo = styled.span`
  word-break: break-all;
`;

interface Props {
  receiverForm: ReceiverForm;
}

export default function ShippingDetails({ receiverForm }: Props) {
  const { frontDoorDetail, receivePlace, requiredFillReceiverDetail, pickupDetail } = receiverForm;

  if (requiredFillReceiverDetail) {
    return (
      <Contents>
        <Empty text={REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE} />
      </Contents>
    );
  }

  const { place, detail } = getReceiverDetail(receiverForm);

  return (
    <Contents>
      <Head>{place}</Head>
      {!isEmpty(detail) && (
        <>
          <VerticalDivider />
          <Head>
            {detail}
            <DetailInfo>{frontDoorDetail && receivePlace === ReceivePlace.DOOR && ` (${frontDoorDetail})`}</DetailInfo>
            <DetailInfo>{pickupDetail && receivePlace === ReceivePlace.ETC && ` (${pickupDetail})`}</DetailInfo>
          </Head>
        </>
      )}
    </Contents>
  );
}
