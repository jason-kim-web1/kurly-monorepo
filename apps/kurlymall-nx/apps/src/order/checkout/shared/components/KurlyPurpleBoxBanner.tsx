import styled from '@emotion/styled';

import { isPC } from '../../../../../util/window/getDevice';
import { ReusablePackageType } from '../../../../shared/interfaces';
import { RESOURCE_URL } from '../../../../shared/configs/config';
import NextImage from '../../../../shared/components/NextImage';

const PACKAGE_BANNERS: Omit<
  Record<
    ReusablePackageType,
    {
      image: string;
      alt: string;
      text: string;
      backgroundColor: string;
    }
  >,
  'PAPER'
> = {
  KURLY: {
    image: `${RESOURCE_URL}/kurly/img/2021/banner-kurlybag_340_82_3x.png`,
    alt: 'kurly purple box',
    text: '컬리 퍼플 박스를 문 앞에 놓아주세요',
    backgroundColor: '#F8F5FA',
  },
  PERSONAL: {
    image: `${RESOURCE_URL}/kurly/img/2021/banner-personal_340_82_3x.png`,
    alt: 'personal reusable box',
    text: '개인 보냉 박스를 문 앞에 놓아주세요',
    backgroundColor: '#F6F6F6',
  },
};

const Wrapper = styled.div<{ isPc: boolean; backgroundColor: string }>`
  position: relative;
  height: 21vw;
  max-height: 82px;
  overflow: hidden;
  border-radius: ${({ isPc }) => (isPc ? 3 : 6)}px;
  background-color: ${({ backgroundColor }) => backgroundColor && backgroundColor};
`;

interface Props {
  reusablePackageType: ReusablePackageType;
  isViewPackage?: boolean;
}

export default function KurlyPurpleBoxBanner({ reusablePackageType, isViewPackage }: Props) {
  if (!isViewPackage || reusablePackageType === 'PAPER') {
    return null;
  }

  const { backgroundColor, image, text } = PACKAGE_BANNERS[reusablePackageType];

  return (
    <Wrapper isPc={isPC} backgroundColor={backgroundColor}>
      <NextImage src={image} alt={text} layout="fill" objectFit="contain" />
    </Wrapper>
  );
}
