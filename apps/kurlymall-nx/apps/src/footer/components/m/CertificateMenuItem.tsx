import styled from '@emotion/styled';

import openNewWindow from '../../../shared/utils/open-new-window';

import { CertificateItem } from '../../content/footerInfo';
import COLOR from '../../../shared/constant/colorset';

const MenuLink = styled.button`
  display: flex;
  margin-top: 12px;
  text-align: left;
`;

const Image = styled.img`
  display: block;
  width: 34px;
  margin-right: 10px;
`;

const Desc = styled.p`
  font-size: 10px;
  line-height: 16px;
  color: ${COLOR.benefitTextGray};
`;

interface Props {
  menu: CertificateItem;
}

export default function CertificateMenuItem({ menu }: Props) {
  const {
    title,
    logo,
    logoMobile,
    textFirst,
    textSecond,
    textFirstMobile,
    textSecondMobile,
    textLast,
    linkPopup,
    linkPopupSize,
  } = menu;

  const popupInfo = {
    url: linkPopup,
    name: title,
    option: {
      width: linkPopupSize.width,
      height: linkPopupSize.height,
    },
  };

  const logoImage = logoMobile ? logoMobile : logo;
  const firstText = textFirstMobile ? textFirstMobile : textFirst;
  const secondText = textSecondMobile ? textSecondMobile : textSecond;
  const lastText = textLast && !textSecondMobile ? textLast : undefined;

  return (
    <>
      <MenuLink onClick={() => openNewWindow(popupInfo)}>
        <Image src={logoImage} alt={`${title} 로고`} />
        <Desc>
          {firstText}
          <br />
          {secondText}
          {lastText && (
            <>
              <br />
              {lastText}
            </>
          )}
        </Desc>
      </MenuLink>
    </>
  );
}
