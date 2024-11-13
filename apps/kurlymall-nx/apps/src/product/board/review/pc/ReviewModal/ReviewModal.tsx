import { ReactNode } from 'react';

import Close from '../../../../../shared/icons/Close';

import { DismissButton, Modal, ModalInner, ModalContent, ModalHeader, ModalTitle } from './styled-components';
import { useKeyEscClose } from '../../../../../shared/hooks/useKeyClose';

interface Props {
  children: ReactNode;
  title?: string;
  isOpen: boolean;
  onDismiss(): void;
}

export default function ReviewModal({ children, title = '사진 후기', isOpen, onDismiss }: Props) {
  useKeyEscClose({ close: onDismiss });

  return (
    <Modal fullWidth open={isOpen}>
      <ModalInner>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <DismissButton onClick={onDismiss}>
            <Close strokeLinecap="square" />
          </DismissButton>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalInner>
    </Modal>
  );
}
