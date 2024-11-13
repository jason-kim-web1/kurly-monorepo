import SectionWrapper from '../components/SectionWrapper';
import EventBanner from '../components/description/EventBanner';
import DetailDescription from '../components/description/DetailDescription';
import ZoomImageList from '../components/detail-information/zoom-image/ZoomImageList';
import WhyKurly from '../components/description/WhyKurly';
import type { PartnersContent, ProductDetailGiveawayContentsBox } from '../../types';
import GiftDeliveryNotice from '../../shared/GiftDeliveryNotice';
import { GiveawayContentsBox } from '../components/description/GiveawayContentsBox';
import { hasGiveawayContentsBox, validateGiveawayContentsBox } from '../../shared/utils/validateGiveawayContentsBox';

interface Props {
  legacyEventBanner: string;
  legacyContent: string;
  partnersContent: PartnersContent;
  detailImages: string[];
  isGiftable: boolean;
  giveawayContentsBox: ProductDetailGiveawayContentsBox;
}

export default function DescriptionContainer({
  legacyEventBanner,
  legacyContent,
  partnersContent,
  detailImages,
  isGiftable,
  giveawayContentsBox,
}: Props) {
  const renderGiveawayContentsBox = () => {
    if (!hasGiveawayContentsBox(giveawayContentsBox)) {
      return legacyEventBanner ? <EventBanner eventBanner={legacyEventBanner} /> : null;
    }

    if (validateGiveawayContentsBox(giveawayContentsBox)) {
      return <GiveawayContentsBox giveawayContentsBox={giveawayContentsBox} />;
    }

    return null;
  };

  return (
    <SectionWrapper hasBottomLine={false}>
      {isGiftable && <GiftDeliveryNotice />}
      {renderGiveawayContentsBox()}
      <DetailDescription legacyContent={legacyContent} partnersContent={partnersContent} />
      <ZoomImageList detailImages={detailImages} />
      <WhyKurly />
    </SectionWrapper>
  );
}
