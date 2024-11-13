import styled from '@emotion/styled';

import { isWebview } from '../../../../util/window/getDevice';

import appService from '../../services/app.service';
import Alert from '../Alert/Alert';
import Copy from '../icons/Copy';
import setClipboard from '../../utils/copy-string';
import COLOR from '../../constant/colorset';

const Button = styled.button<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: transparent;
  border: none;
`;

interface Props {
  width?: number;
  height?: number;
  copyString: string | number;
  message: string;
  className?: any;
  stroke?: string;
}

export default function CopyButton({
  width = 16,
  height = 16,
  copyString,
  message,
  className,
  stroke = COLOR.kurlyGray600,
}: Props) {
  const onClick = () => {
    setClipboard(copyString.toString());

    if (isWebview()) {
      appService.postToast({
        type: 'success',
        title: message,
      });
      return;
    }

    Alert({
      text: message,
    });
  };

  return (
    <Button
      data-testid="copy-button"
      width={width}
      height={height}
      className={className}
      type="button"
      onClick={onClick}
    >
      <Copy width={width} height={height} stroke={stroke} />
    </Button>
  );
}
