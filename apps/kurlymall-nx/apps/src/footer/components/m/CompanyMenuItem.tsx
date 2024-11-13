import styled from '@emotion/styled';

import { useLink } from '../../../shared/hooks/useLink';
import { CompanyItem } from '../../content/footerInfo';
import COLOR from '../../../shared/constant/colorset';

const CompanyMenu = styled.li`
  float: left;
  margin-right: 16px;
  color: ${COLOR.benefitTextGray};

  &:nth-of-type(5) {
    clear: both;
  }

  &:last-of-type {
    margin-right: 0;
    font-weight: 600;
    color: ${COLOR.mainSecondary};
  }
`;

const OutLink = styled.a`
  display: block;
  height: 32px;
  padding-top: 8px;
  line-height: 20px;
`;

const CustomLink = styled.span`
  display: block;
  height: 32px;
  padding-top: 8px;
  line-height: 20px;
`;

interface Props {
  menu: CompanyItem;
}

export default function CompanyMenuItem({ menu }: Props) {
  const { link, title, isExternalLink } = menu;
  const redirect = useLink();

  const handleLink = (url: string) => {
    redirect(url);
  };

  return (
    <CompanyMenu>
      {isExternalLink ? (
        <OutLink href={link} target="_blank">
          {title}
        </OutLink>
      ) : (
        <CustomLink onClick={() => handleLink(link)}>{title}</CustomLink>
      )}
    </CompanyMenu>
  );
}
