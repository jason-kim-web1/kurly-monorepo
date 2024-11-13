import styled from '@emotion/styled';

import openNewWindow from '../../shared/utils/open-new-window';

import { CertificateItem } from '../content/footerInfo';
import COLOR from '../../shared/constant/colorset';

interface Props {
  menu: CertificateItem;
}

const MenuLink = styled.button`
  display: flex;
  text-align: left;
`;

const Image = styled.img<{ isSizeDifferent: boolean }>`
  width: ${({ isSizeDifferent }) => (isSizeDifferent ? '102px' : '34px')};
  margin-right: 10px;
`;

const Desc = styled.p`
  font-size: 10px;
  line-height: 14.5px;
  color: ${COLOR.kurlyGray450};
  word-break: break-word;
`;

export default function CertificateMenuItem({ menu }: Props) {
  const { title, logo, textFirst, textSecond, textLast, linkPopup, linkPopupSize, isSizeDifferent = false } = menu;

  const popupInfo = {
    url: linkPopup,
    name: title,
    option: {
      width: linkPopupSize.width,
      height: linkPopupSize.height,
    },
  };

  return (
    <MenuLink onClick={() => openNewWindow(popupInfo)}>
      <Image src={logo} alt={`${title} 로고`} isSizeDifferent={isSizeDifferent} />
      <Desc>
        {textFirst}
        <br />
        {textSecond}
        {textLast && (
          <>
            <br />
            {textLast}
          </>
        )}
      </Desc>
    </MenuLink>
  );
}
