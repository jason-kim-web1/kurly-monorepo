import styled from '@emotion/styled';

import CertificateMenuItem from './CertificateMenuItem';

import { CertificateItem } from '../content/footerInfo';
import COLOR from '../../shared/constant/colorset';

const CertificateLink = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 26px 0 33px;
  border-top: 1px solid ${COLOR.kurlyGray200};
`;

interface Props {
  menuList: CertificateItem[];
}

export default function CertificateMenu({ menuList }: Props) {
  return (
    <CertificateLink>
      {menuList.map((menu) => (
        <CertificateMenuItem key={menu.logo} menu={menu} />
      ))}
    </CertificateLink>
  );
}
