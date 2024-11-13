import styled from '@emotion/styled';

import Link from 'next/link';

import { PRODUCT_PATH, getPageUrl } from '../../../../shared/constant';

import { MdChoicesOption, MainSite } from '../../../interfaces/MainSection.interface';

const Container = styled.a`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 516px;
  height: 56px;
  border-radius: 3px;
  border: solid 1px #e3e3e3;
  cursor: pointer;
`;

const Text = styled.span`
  padding: 0 17px;
  background-size: 18px 18px;
  font-size: 16px;
  letter-spacing: -0.27px;
  line-height: 15px;
`;

interface Props {
  selectedOption?: MdChoicesOption;
  site: MainSite;
  selectMore(): void;
}

export default function ShowMoreButton({ selectedOption, site, selectMore }: Props) {
  if (!selectedOption) {
    return null;
  }

  const { code, name } = selectedOption;
  const linkPath = `${getPageUrl(PRODUCT_PATH.categories)}/${code}${site === 'BEAUTY' ? '?site=beauty' : ''}`;

  return (
    <Link href={linkPath} passHref>
      <Container href={linkPath} onClick={() => selectMore()}>
        <Text>{`${name} 전체보기`} </Text>
      </Container>
    </Link>
  );
}
