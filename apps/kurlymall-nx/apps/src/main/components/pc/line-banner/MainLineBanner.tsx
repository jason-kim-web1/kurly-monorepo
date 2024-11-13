import { ReactNode } from 'react';
import Link from 'next/link';

import styled from '@emotion/styled';

import type { MainLineBannerSection, MainSite } from '../../../interfaces/MainSection.interface';
import SectionContents from '../shared/SectionContents';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectRecommendation } from '../../../../shared/amplitude/events';
import { useAppSelector } from '../../../../shared/store';
import { queryStringSiteConverter } from '../../../../shared/utils/queryStringSiteConverter';
import { createMainSkeletonPC } from '../shared/skeleton/CreateMainSkeleton';
import NextImage from '../../../../shared/components/NextImage';

const InnerLink = styled.a`
  position: relative;
  display: block;
  overflow: hidden;
  height: 140px;
`;

const InnerNotLink = styled.div`
  position: relative;
  overflow: hidden;
  height: 140px;
`;

const Text = styled.div<{ color: string }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
  color: ${({ color }) => color};
`;

const Title = styled.strong`
  display: block;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.36;
  letter-spacing: normal;
`;

const SubTitle = styled.span`
  display: block;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  letter-spacing: normal;
  margin-top: 6px;
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

  const loadingLayer = createMainSkeletonPC(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { title, text, image, link, bannerType } = payload;

  if (bannerType === 'TEXT') {
    return (
      <SectionContents section={section} loadingLayer={loadingLayer}>
        <WrapperBanner site={site} link={link} amplitudeSelectBanner={amplitudeSelectBanner}>
          <Text color={text.textColor}>
            <Title>{title}</Title>
            <SubTitle>{text.subtitle}</SubTitle>
          </Text>
        </WrapperBanner>
      </SectionContents>
    );
  }
  const { imageUrl, mainLineBannerPcUrl } = image;
  const thumbUrl = mainLineBannerPcUrl || imageUrl;
  return thumbUrl ? (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <WrapperBanner site={site} link={link} amplitudeSelectBanner={amplitudeSelectBanner}>
        <NextImage src={thumbUrl} layout="fill" objectFit="cover" alt={title} />
      </WrapperBanner>
    </SectionContents>
  ) : null;
}
