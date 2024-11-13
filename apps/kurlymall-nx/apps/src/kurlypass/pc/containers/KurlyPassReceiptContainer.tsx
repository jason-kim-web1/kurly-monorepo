import { css } from '@emotion/react';
import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import { zIndex } from '../../../shared/styles';

import Button from '../../../shared/components/Button/Button';
import KurlyPassList from '../components/KurlyPassList';
import SimpleDialog from '../../../shared/components/Dialog/SimpleDialog';
import { BillingHistory } from '../../../shared/interfaces';

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.mainPopupBanner};
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  flex-direction: column;
  width: 500px;
`;

const ButtonStyle = css`
  border: 0;
  border-radius: 0;
  border-top: 1px solid ${COLOR.kurlyPurple};
  span {
    font-size: 14px;
  }
`;

interface PassReceiptContainerProps {
  list: BillingHistory[];
  isOpen: boolean;
  loading: boolean;
  onNextPage: () => void;
  onClick: () => void;
}

export default function KurlyPassReceiptContainer({
  list,
  isOpen,
  loading,
  onClick,
  onNextPage,
}: PassReceiptContainerProps) {
  return (
    <SimpleDialog dialogStyle={{}} open={isOpen} onHandleClose={onClick} disableEscapeKeyDown>
      <Wrapper>
        <Inner>
          <KurlyPassList list={list} loading={loading} onNextPage={onNextPage} />
          <Button theme="secondary" text="닫기" height={45} onClick={onClick} css={ButtonStyle} />
        </Inner>
      </Wrapper>
    </SimpleDialog>
  );
}
