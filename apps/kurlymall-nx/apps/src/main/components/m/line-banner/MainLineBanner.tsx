import { ReactNode } from 'react';
import Link from 'next/link';

import styled from '@emotion/styled';

import type { MainLineBannerSection, MainSite } from '../../../interfaces/MainSection.interface';
import SectionContents from '../shared/SectionContents';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectRecommendation } from '../../../../shared/amplitude/events';
import { useAppSelector } from '../../../../shared/store';
import { queryStringSiteConverter } from '../../../../shared/utils/queryStringSiteConverter';
import { createMainSkeleton } from '../shared/skeleton/CreateMainSkeleton';
import NextImage from '../../../../shared/components/NextImage';
import { productCardImageWrapper } from '../../../../shared/styles/product-card-image-style';

const InnerLink = styled.a`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const InnerNotLink = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const TextContent = styled.div<{ backgroundColor: string }>`
  height: 78px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Text = styled.span<{ color: string }>`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform: translate(0%, -50%);
  color: ${({ color }) => color};
`;

const Title = styled.strong`
  display: block;
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
`;

const SubTitle = styled.span`
  display: block;
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
`;

const WrapperImage = styled.div`
  ${productCardImageWrapper('21.04%')};
  border-radius: 0;
`;

const WrapperBanner = ({
  children,
  link,
  site,
  amplitudeSelectBanner,
}: {
  children: ReactNode;
  link: string;
  site: MainSite;
  amplitudeSelectBanner: () => void;
}) => {
  if (link) {
    return (
      <Link href={queryStringSiteConverter({ link, site })} passHref prefetch={false}>
        <InnerLink href={queryStringSiteConverter({ link, site })} onClick={amplitudeSelectBanner}>
          {children}
        </InnerLink>
      </Link>
    );
  }

  return <InnerNotLink>{children}</InnerNotLink>;
};

interface Props {
  section: MainLineBannerSection;
}

export default function MainLineBanner({ section }: Props) {
  const sections = useAppSelector(({ main }) => main.sections);
  const site = useAppSelector(({ main }) => main.site);
  const { payload, type } = section;

  const loadingLayer = createMainSkeleton(type);
  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { bannerType, image, text, title, link } = payload;

  const amplitudeSelectBanner = () => {
    amplitudeService.logEvent(
      new SelectRecommendation({
        eventName: section.type,
        sectionType: 'content',
        target: section.id,
        sections,
        section,
      }),
    );
  };

  if (bannerType === 'TEXT') {
    return (
      <SectionContents section={section} loadingLayer={loadingLayer}>
        <WrapperBanner site={site} link={link} amplitudeSelectBanner={amplitudeSelectBanner}>
          <TextContent backgroundColor={text.backgroundColor}>
            <Text color={text.textColor}>
              <Title>{title}</Title>
              <SubTitle>{text.subtitle}</SubTitle>
            </Text>
          </TextContent>
        </WrapperBanner>
      </SectionContents>
    );
  }
  const { imageUrl, mainLineBannerMobileUrl } = image;
  const thumbUrl = mainLineBannerMobileUrl || imageUrl;
  return thumbUrl ? (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <WrapperBanner site={site} link={link} amplitudeSelectBanner={amplitudeSelectBanner}>
        <WrapperImage>
          <NextImage src={thumbUrl} layout="fill" objectFit="cover" alt={title} />
        </WrapperImage>
      </WrapperBanner>
    </SectionContents>
  ) : null;
}
