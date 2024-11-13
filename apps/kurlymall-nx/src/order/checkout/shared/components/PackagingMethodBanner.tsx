import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { ReusablePackageType } from '../../../../shared/interfaces';
import { Divider } from '../../../../shared/components/Divider/Divider';

const BANNERS: Omit<
  Record<
    ReusablePackageType,
    {
      image: {
        [key: string]: string;
        mobile: string;
        pc: string;
      };
      alt: string;
    }
  >,
  'PAPER'
> = {
  KURLY: {
    image: {
      mobile: 'https://res.kurly.com/kurly/img/2023/banner-kurlybox-mw.png',
      pc: 'https://res.kurly.com/kurly/img/2023/banner-kurlybox-pc.png',
    },
    alt: '컬리 퍼플 박스를 문 앞에 놓아주세요',
  },
  PERSONAL: {
    image: {
      mobile: 'https://res.kurly.com/kurly/img/2021/banner-personalbox_375_78_3x.png',
      pc: 'https://res.kurly.com/kurly/img/2021/banner-order-personal_1050_107%402x.jpg',
    },
    alt: '개인 보냉 박스를 문 앞에 놓아주세요',
  },
};

const Wrapper = styled.div<{ device: string }>`
  ${({ device }) =>
    device === 'pc' &&
    css`
      padding: 40px 0 60px;
    `}
  img {
    display: block;
    width: 100%;
  }
`;

interface Props {
  device: string;
  method: ReusablePackageType;
}

export default function PackagingMethodBanner({ device, method }: Props) {
  if (method === 'PAPER') {
    return null;
  }

  const { image, alt } = BANNERS[method];

  return (
    <>
      <Wrapper device={device}>
        <img src={image[device]} alt={alt} />
      </Wrapper>
      {device === 'mobile' && <Divider />}
    </>
  );
}
