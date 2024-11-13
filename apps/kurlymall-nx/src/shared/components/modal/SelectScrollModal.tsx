import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { css } from '@emotion/react';

import SlideModal from './SlideModal';

const Title = styled.h2`
  padding: 0 20px;
  font-size: 18px;
  font-weight: 600;
  line-height: 35px;
`;

const ScrollWrapper = styled.div<{ search?: boolean }>`
  overflow-y: auto;
  max-height: calc(100vh - 113px);
  ${({ search }) =>
    search &&
    css`
      max-height: calc(100vh - 161px);
      padding-bottom: 28px;
    `}
`;

const SearchWrapper = styled.div`
  padding: 9px 20px 0px;
`;

const InnerWrapper = styled.div`
  padding: 6px 20px 20px;
`;

interface Props {
  open: boolean;
  title?: string;
  search?: ReactNode;
  className?: string;
  children?: ReactNode;
  onClose(): void;
}

export default function SelectScrollModal({ open, title, search, className, children, onClose }: Props) {
  return (
    <SlideModal className={className} open={open} onClose={onClose}>
      {title && <Title id="select-modal-title">{title}</Title>}
      {search && <SearchWrapper id="select-modal-search">{search}</SearchWrapper>}
      <ScrollWrapper search={!!search}>
        <InnerWrapper id="select-modal-description">{children}</InnerWrapper>
      </ScrollWrapper>
    </SlideModal>
  );
}
