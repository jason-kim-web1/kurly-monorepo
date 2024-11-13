import styled from '@emotion/styled';

import NextImage from '../../../../shared/components/NextImage';

const Wrapper = styled.button<{ maxWidth?: number }>`
  width: 100%;
  vertical-align: top;
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : 'none')};
  span {
    position: relative !important;
    img {
      position: relative !important;
      height: auto !important;
    }
  }
`;

interface KurlyMembersBannerProps {
  membersBanner: { bannerUrl?: string; bannerTitle?: string };
  handleClick: () => void;
  maxWidth?: number;
}

export function KurlyMembersBanner({ membersBanner, handleClick, maxWidth }: KurlyMembersBannerProps) {
  if (!membersBanner?.bannerUrl) {
    return null;
  }

  const { bannerUrl, bannerTitle } = membersBanner;

  return (
    <Wrapper onClick={handleClick} maxWidth={maxWidth}>
      <NextImage src={bannerUrl} layout="fill" alt={bannerTitle} />
    </Wrapper>
  );
}
