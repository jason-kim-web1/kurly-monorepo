import { css } from '@mui/material';

import Dialog from '../../../../shared/shared/components/Dialog';
import PickupDetailContainer from '../../containers/PickupDetailContainer';
import { PickupDetailProvider } from '../../../shared/context/PickupDetailContext';
import { NaverMapContextProvider } from '../../../../../shared/context/NaverMapContext/NaverMapContext';

const DialogStyle = css`
  > div {
    padding: 30px 0;
    width: 440px;
    height: 740px;
    > p {
      padding: 0 30px 17px;
    }
  }
`;

export default function PickupDetailDialog({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  return (
    <Dialog
      title={'픽업매장 선택'}
      contents={
        <NaverMapContextProvider>
          <PickupDetailProvider>
            <PickupDetailContainer close={close} />
          </PickupDetailProvider>
        </NaverMapContextProvider>
      }
      isOpen={isOpen}
      styles={DialogStyle}
      handleDimmedClick={close}
    />
  );
}
