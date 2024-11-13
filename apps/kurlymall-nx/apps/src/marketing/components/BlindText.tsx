import { memo } from 'react';

import { StyledBlindTextWrapper } from '../shared/styled';

function BlindText({ text }: { text: string }) {
  return <StyledBlindTextWrapper dangerouslySetInnerHTML={{ __html: text }} />;
}

export default memo(BlindText);
