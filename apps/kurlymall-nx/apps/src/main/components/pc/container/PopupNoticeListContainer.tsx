import styled from '@emotion/styled';

import PopupNoticeItem from '../popup/PopupNoticeItem';
import useMainNoticePopup from '../../../hooks/useMainNoticePopup';
import { zIndex } from '../../../../shared/styles';

const Container = styled.div`
  position: relative;
  width: 1050px;
  margin: 0 auto;
  z-index: ${zIndex.mainPopupBanner};
`;

export default function PopupNoticeListContainer() {
  const { popupNotices, removePopup } = useMainNoticePopup();

  return (
    <Container>
      {popupNotices.map(({ id, pc, buttons }, index) => (
        <PopupNoticeItem key={id} index={index} content={pc.content} buttons={buttons} onClose={removePopup(id)} />
      ))}
    </Container>
  );
}
