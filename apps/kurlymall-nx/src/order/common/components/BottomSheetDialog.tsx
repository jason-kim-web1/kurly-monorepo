import { ReactNode } from 'react';
import { Icon, Typography } from '@thefarmersfront/kpds-react';
import { vars } from '@thefarmersfront/kpds-css';
import styled from '@emotion/styled';

import Dialog from './Dialog';

const BOTTOM_SHEET_DIALOG_MAX_HEIGHT = '480px';

const TitleSection = styled.div`
  display: flex;
  padding: ${vars.spacing.$12} ${vars.spacing.$12} ${vars.spacing.$8} ${vars.spacing.$16};
  justify-content: space-between;
`;

const Title = styled(Typography)`
  padding-top: ${vars.spacing.$20};
`;

const CloseButton = styled.button`
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
`;

const ContentWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  max-height: calc(${BOTTOM_SHEET_DIALOG_MAX_HEIGHT} - 68px);
  padding: ${vars.spacing.$16} ${vars.spacing.$12} ${vars.spacing.$32} ${vars.spacing.$24};
`;

const ScrollableArea = styled.div`
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

interface Props {
  isOpen: boolean;
  title?: string;
  close: () => void;
  children: ReactNode;
}

const BottomSheetDialog = ({ isOpen, title, children, close }: Props) => {
  return (
    <Dialog isOpen={isOpen} maxHeight="480px">
      <TitleSection>
        <Title variant="$xxxlargeSemibold">{title}</Title>
        <CloseButton onClick={close}>
          <Icon type="Close" size={20} ratio="1:1" />
        </CloseButton>
      </TitleSection>
      <ContentWrapper>
        <ScrollableArea>{children}</ScrollableArea>
      </ContentWrapper>
    </Dialog>
  );
};

export default BottomSheetDialog;
