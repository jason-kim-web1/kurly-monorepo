import styled from '@emotion/styled';

import CertificateMenuItem from './CertificateMenuItem';

import { CertificateItem } from '../../content/footerInfo';

const Certificate = styled.div`
  padding-top: 12px;
`;

interface Props {
  menuList: CertificateItem[];
}

export default function CertificateMenu({ menuList }: Props) {
  return (
    <Certificate>
      {menuList.map((menu) => (
        <CertificateMenuItem key={menu.logo} menu={menu} />
      ))}
    </Certificate>
  );
}
