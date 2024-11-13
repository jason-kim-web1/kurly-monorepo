import styled from '@emotion/styled';
import { isEmpty } from 'lodash';

import COLOR from '../../../../../shared/constant/colorset';
import { ReceivePlace } from '../../../../../shared/enums';
import { ReceiverForm } from '../../../shared/interfaces';
import { getReceiverDetail } from '../../../shared/utils';

import Empty from './Empty';
import { REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE } from '../../../shared/constants/delivery-request-validate-message';

const Head = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: ${COLOR.kurlyGray800};
  > span {
    color: ${COLOR.kurlyPurple};
  }
`;

const VerticalDivider = styled.span`
  display: inline-block;
  width: 1px;
  height: 14px;
  margin: 6px 8px 0;
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
  const { receivePlace, requiredFillReceiverDetail, frontDoorDetail, pickupDetail } = receiverForm;

  if (requiredFillReceiverDetail) {
    return <Empty text={REQUIRED_FILL_RECEIVER_DETAIL_MESSAGE} />;
  }

  const { place, detail } = getReceiverDetail(receiverForm);

  return (
    <>
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
    </>
  );
}
