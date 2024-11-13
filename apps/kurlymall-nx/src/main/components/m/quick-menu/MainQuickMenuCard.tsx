import styled from '@emotion/styled';

import MainQuickMenuCardImage from './MainQuickMenuCardImage';
import NewBadgeCircle from '../../../../shared/icons/NewBadgeCircle';
import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
  width: 64px;

  @media (max-width: 320px) {
    width: 56px;
  }

  .image-wrapper {
    & > svg {
      position: absolute;
      top: -4px;
      right: -4px;
    }
  }
`;

const Title = styled.span`
  font-size: 12px;
  line-height: 14.4px;
  margin: 6px 0 4px;
  height: 14px;
  text-align: center;
  letter-spacing: -1.3px;
  width: 64px;
  color: ${COLOR.mainSecondary};

  @media (max-width: 320px) {
    width: 56px;
  }
`;

interface Props {
  title: string;
  imageUrl: string;
  lottieUrl: string;
  lottieLoop: number | null;
  isNew: boolean;
}

export function MainQuickMenuCard({ title, imageUrl, lottieUrl, lottieLoop, isNew }: Props) {
  return (
    <Wrapper>
      <MainQuickMenuCardImage
        className="image-wrapper"
        imageUrl={imageUrl}
        lottieUrl={lottieUrl}
        lottieLoop={lottieLoop}
      >
        {isNew ? <NewBadgeCircle /> : null}
      </MainQuickMenuCardImage>
      <Title>{title}</Title>
    </Wrapper>
  );
}
