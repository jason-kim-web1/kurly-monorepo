import styled from '@emotion/styled';

import type { MainInstagramReviewSection } from '../../../interfaces/MainSection.interface';
import SectionContents from '../shared/SectionContents';
import SectionHeader from '../shared/SectionHeader';
import MainSwiper from '../../shared/MainSwiper';
import InstagramReviewItem from './InstagramReviewItem';
import COLOR from '../../../../shared/constant/colorset';
import { createMainSkeletonPC } from '../shared/skeleton/CreateMainSkeleton';

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  line-height: 1.9;
  font-size: 16px;
  letter-spacing: -0.05em;
  p {
    color: ${COLOR.kurlyGray450};
    font-weight: 400;
  }
  a {
    color: ${COLOR.kurlyGray800};
    font-weight: 500;
  }
`;

interface Props {
  section: MainInstagramReviewSection;
}

export default function InstagramReviewContainer({ section }: Props) {
  const { payload, type } = section;

  const loadingLayer = createMainSkeletonPC(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { title, subtitle, reviews } = payload;

  const slideItems = reviews.map(({ landingUrl, imageUrl }) => (
    <InstagramReviewItem key={landingUrl} src={imageUrl} href={landingUrl} />
  ));

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionHeader title={title} subtitle={subtitle} />
      <MainSwiper items={slideItems} slidesPerView={6} />
      <Description>
        <p>더 많은 고객 후기가 궁금하다면?</p>
        <a href="https://www.instagram.com/marketkurly_regram" target="_blank" rel="noopener noreferrer">
          @marketkurly_regram
        </a>
      </Description>
    </SectionContents>
  );
}
