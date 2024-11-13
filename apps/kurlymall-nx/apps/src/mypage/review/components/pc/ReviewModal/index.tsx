import type { ReactNode } from 'react';

import Close from '../../../../../shared/icons/Close';

import { DismissButton, Modal, ModalContent, ModalHeader, ModalTitle } from './styled-components';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onDismiss?: () => void;
  onBackdropClick?: () => void;
  title?: string;
}

export default function ReviewModal({ children, isOpen, onDismiss, onBackdropClick, title = '후기 작성' }: Props) {
  return (
    <Modal fullWidth open={isOpen} onBackdropClick={onBackdropClick || onDismiss}>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        {onDismiss ? (
          <DismissButton onClick={onDismiss}>
            <Close strokeLinecap="square" />
          </DismissButton>
        ) : null}
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
