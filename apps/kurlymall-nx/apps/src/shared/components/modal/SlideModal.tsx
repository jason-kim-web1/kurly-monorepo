import { ReactNode } from 'react';

import styled from '@emotion/styled';

import { makeStyles, Modal, Slide } from '@material-ui/core';
import { ModalProps, SwipeableDrawer } from '@mui/material';

import SlideModalHeader from './SlideModalHeader';

const Container = styled.div(({ disableSwipe }: { disableSwipe?: boolean }) => ({
  width: '100%',
  outline: 'none',
  bottom: 0,
  backgroundColor: 'white',
  paddingBottom: '0',
  '@supports (padding-bottom: constant(safe-area-inset-bottom))': {
    paddingBottom: 'constant(safe-area-inset-bottom)',
  },
  '@supports (padding-bottom: env(safe-area-inset-bottom))': {
    paddingBottom: 'env(safe-area-inset-bottom)',
  },
  position: disableSwipe ? 'absolute' : 'relative',
  borderTopLeftRadius: disableSwipe ? '12px' : '',
  borderTopRightRadius: disableSwipe ? '12px' : '',
}));

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      borderRadius: '12px 12px 0 0',
      overflowY: 'hidden',
    },
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
  },
});

interface Props {
  className?: string;
  open: boolean;
  onClose(): void;
  children: ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  disableSwipe?: boolean;
  disablePortal?: boolean;
  showHeader?: boolean;
  hideBackdrop?: boolean;
  modalProps?: Partial<ModalProps>;
}

export default function SlideModal({
  className,
  open,
  onClose,
  children,
  direction = 'bottom',
  disableSwipe = false,
  disablePortal = false,
  showHeader = true,
  hideBackdrop = false,
  modalProps,
}: Props) {
  const classes = useStyles();
  return (
    <>
      {disableSwipe ? (
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="select-modal-title"
          aria-describedby="select-modal-description"
          BackdropProps={{
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            },
          }}
        >
          <Slide in={open} direction={'up'}>
            <Container className={className} disableSwipe={disableSwipe}>
              <>
                {showHeader && <SlideModalHeader onClose={onClose} />}
                {children}
              </>
            </Container>
          </Slide>
        </Modal>
      ) : (
        <SwipeableDrawer
          anchor={direction}
          onOpen={() => open}
          open={open}
          onClose={onClose}
          disableSwipeToOpen={true}
          className={classes.root}
          aria-labelledby="select-modal-title"
          aria-describedby="select-modal-description"
          disableDiscovery={true}
          disablePortal={disablePortal}
          hideBackdrop={hideBackdrop}
          ModalProps={modalProps}
        >
          <Container className={className}>
            <>
              {showHeader && <SlideModalHeader onClose={onClose} />}
              {children}
            </>
          </Container>
        </SwipeableDrawer>
      )}
    </>
  );
}
