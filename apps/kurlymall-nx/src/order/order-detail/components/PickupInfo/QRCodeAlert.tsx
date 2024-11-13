import styled from '@emotion/styled';

import ImageWithBase64Src from '../../../../shared/components/ImageWithBase64Src';
import { ImageFormat } from '../../../../../@types/images';
import Alert from '../../../../shared/components/Alert/Alert';

const QRAlert = styled.div`
  padding-top: 24px;
  text-align: center;
`;

const QRText = styled.div`
  padding-top: 28px;
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
`;

const QRCode = styled(ImageWithBase64Src)`
  height: 112px;
  width: 112px;
`;

interface Props {
  qrImage: string;
  qrImageType: ImageFormat;
  text?: string;
}

export default function QRCodeAlert({ qrImage, qrImageType, text }: Props) {
  return Alert({
    contents: (
      <QRAlert>
        <QRCode alt="QR Code" src={qrImage} format={qrImageType} />
        {text && <QRText>{text}</QRText>}
      </QRAlert>
    ),
    confirmButtonText: '닫기',
  });
}
