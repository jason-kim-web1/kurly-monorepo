import { useCallback, useState } from 'react';

import styled from '@emotion/styled';

import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

import ShareContainer from '../../../containers/ShareContainer';
import { share40x40C333 } from '../../../../../../shared/images';

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background: url(${share40x40C333}) no-repeat 50% 50%;
`;

const ShareTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    position: 'absolute',
    zIndex: -1,
    backgroundColor: 'transparent',
    maxWidth: 0,
    maxHeight: 0,
  },
}));

const shareTooltipPopperProps = {
  disablePortal: true,
};

export default function ShareButton() {
  const [shareOpen, setShareOpen] = useState(false);

  const handleClickShare = useCallback(() => {
    setShareOpen(!shareOpen);
  }, [shareOpen]);

  return (
    <ShareTooltip
      PopperProps={shareTooltipPopperProps}
      leaveDelay={200}
      onClose={handleClickShare}
      open={shareOpen}
      title={<ShareContainer />}
    >
      <Button onClick={handleClickShare} />
    </ShareTooltip>
  );
}
