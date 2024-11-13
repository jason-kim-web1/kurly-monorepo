import styled from '@emotion/styled';

import { useState } from 'react';

import ShareIcon from '../../../../../shared/components/icons/ShareIcon';
import ShareModal from './ShareModal';
import DragOverlayWrapper from '../../../../../shared/components/motion/DragOverlayWrapper';

const Wrapper = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  right: 0;
  top: 0;

  > button {
    width: 40px;
    height: 40px;
  }
`;

interface Props {
  contentsProductNo: number;
}

export default function ShareButton({ contentsProductNo }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenShareModal = () => setIsOpen(!isOpen);

  return (
    <Wrapper>
      <button type="button" onClick={toggleOpenShareModal}>
        <ShareIcon />
      </button>
      {isOpen ? (
        <DragOverlayWrapper onDrag={toggleOpenShareModal}>
          <ShareModal contentsProductNo={contentsProductNo} onDismiss={toggleOpenShareModal} />
        </DragOverlayWrapper>
      ) : null}
    </Wrapper>
  );
}
