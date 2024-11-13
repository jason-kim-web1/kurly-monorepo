import styled from '@emotion/styled';

import { isPC } from '../../../../../util/window/getDevice';

import useCouponBanner from '../hooks/useCouponBanner';

const Wrapper = styled.div`
  padding: 22px 16px 0;
  box-sizing: border-box;
`;

const Image = styled.img`
  display: block;
  width: 100%;
`;

export default function CouponBanner() {
  const {
    couponBanner: { link, imageUrl, image, title },
    handleBannerClick,
  } = useCouponBanner();

  if (isPC || !link) {
    return null;
  }

  return (
    <Wrapper onClick={handleBannerClick}>
      <Image src={imageUrl || image} alt={title} />
    </Wrapper>
  );
}
