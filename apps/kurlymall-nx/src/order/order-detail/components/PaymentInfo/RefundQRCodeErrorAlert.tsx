import styled from '@emotion/styled';

import NextImage from '../../../../shared/components/NextImage';
import COLOR from '../../../../shared/constant/colorset';
import Alert from '../../../../shared/components/Alert/Alert';
import { ErrorIconImg } from '../../../../shared/images';

const QRErrorAlert = styled.div`
  margin: 29px 0 24px;
  text-align: center;
`;

const ErrorImageWrapper = styled.div`
  margin: 0 auto;
  width: 68px;
  height: 68px;
`;

const ErrorImage = styled(NextImage)`
  fill: ${COLOR.kurlyGray250};
`;

const ErrorMessage = styled.div`
  margin: 8px 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
`;

const ErrorSubMessage = styled.div`
  margin-bottom: 52px;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray400};
`;

export default function RefundQRCodeErrorAlert() {
  return Alert({
    contents: (
      <QRErrorAlert>
        <ErrorImageWrapper>
          <ErrorImage src={ErrorIconImg} width={68} height={68} />
        </ErrorImageWrapper>
        <ErrorMessage>{'환불 QR을 불러오지 못했어요.\n잠시 후 다시 시도해 주세요.'}</ErrorMessage>
        <ErrorSubMessage>{'오류가 계속될 경우 고객행복센터에 문의해 주세요'}</ErrorSubMessage>
      </QRErrorAlert>
    ),
    confirmButtonText: '닫기',
  });
}
