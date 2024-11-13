import { ReactNode } from 'react';

import type { BrandShowcaseIntro, ShowcaseIntroA, ShowcaseIntroB } from '../types';
import type { ShowcaseMetaProps } from '../types/reponse';
import { Layout } from './Layout';
import { ShowcaseHeader } from './ShowcaseHeader';
import { TeaserA } from './teaser/TeaserA';
import { TeaserB } from './teaser/TeaserB';
import { ShareContent } from './shareContent';
import { BrandTeaser } from './teaser/BrandTeaser';

const ShowcaseContainer = ({
  children,
  introAData,
  introBData,
  meta,
}: {
  children: ReactNode;
  introAData: ShowcaseIntroA | BrandShowcaseIntro;
  introBData?: ShowcaseIntroB;
  meta: ShowcaseMetaProps;
}) => {
  return (
    <Layout type={meta.type}>
      <ShowcaseHeader meta={meta} />
      {meta.type === 'brand' ? (
        <BrandTeaser data={introAData as BrandShowcaseIntro} />
      ) : (
        <>
          <TeaserA data={introAData as ShowcaseIntroA} />
          <TeaserB data={introBData} />
        </>
      )}
      {children}
      <ShareContent meta={meta} />
    </Layout>
  );
};

export { ShowcaseContainer };
