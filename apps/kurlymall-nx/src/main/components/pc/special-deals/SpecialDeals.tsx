import styled from '@emotion/styled';

import dynamic from 'next/dynamic';

import { eq, head, size } from 'lodash';

import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { MainSpecialDealsSection } from '../../../interfaces/MainSection.interface';
import COLOR from '../../../../shared/constant/colorset';
import SectionContents from '../shared/SectionContents';
import SpecialDealProductCard from './SpecialDealProductCard';
import useSectionEvent from '../../../hooks/useSectionEvent';
import { loadMainSection } from '../../../slice';
import { mainSpecialDealEndTime } from '../../../util/mainSpecialDealEndTimeUtil';
import { createMainSkeletonPC } from '../shared/skeleton/CreateMainSkeleton';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';

const Timer = dynamic(() => import('../../shared/Timer'), { ssr: false });

const Container = styled(SectionContents)`
  display: flex;
  justify-content: space-between;
  padding: 80px 0;
`;

const DealTimer = styled(Timer)`
  padding: 24px 0px 6px;
  .lottie-timer {
    width: 36px;
    height: 47px;
    margin-right: 5px;
  }
  .time-units {
    span {
      position: relative;
      flex-shrink: 0;
      min-width: 38px;
      line-height: 47px;
      &:not(:last-of-type) {
        margin-right: 10px;
        &:after {
          content: ':';
          position: absolute;
          width: 11px;
          height: 50px;
          top: 0;
          right: -11px;
          font-size: 25px;
        }
      }
    }
  }
`;

const TitleSection = styled.div`
  width: 249px;
`;

const Title = styled.h2`
  padding-top: 1px;
  font-size: 28px;
  color: ${COLOR.kurlyGray800};
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.26px;
`;

const Subtitle = styled.h3`
  padding-top: 11px;
  font-size: 16px;
  color: ${COLOR.kurlyGray450};
  font-weight: normal;
  line-height: 1.3;
  letter-spacing: normal;
`;

const AdditionalText = styled.p`
  padding-top: 26px;
  font-size: 14px;
  color: ${COLOR.placeholder};
  font-weight: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
`;

const ProductCardWarp = styled.div`
  display: flex;
  gap: 18px;
`;

const MAX_DEAL_COUNT = 3;

const getProductImageType = (count: number): ProductImageType => {
  if (eq(count, 2)) {
    return ProductImageType.MAIN_SPECIAL_DEAL_ITEM_2;
  }
  if (eq(count, 3)) {
    return ProductImageType.MAIN_SPECIAL_DEAL_ITEM_3;
  }
  return ProductImageType.MAIN_SPECIAL_DEAL_ITEM_1;
};

interface Props {
  section: MainSpecialDealsSection;
}

export default function SpecialDeals({ section }: Props) {
  const { payload, type, key } = section;

  const [dealEnds, setDealEnds] = useState(false);
  const { onSelectProduct } = useSectionEvent(section);
  const dispatch = useDispatch();

  const handleSoldOutStatusChange = useCallback(() => {
    dispatch(loadMainSection(key));
  }, [dispatch, key]);

  const loadingLayer = createMainSkeletonPC(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { title, subtitle, additionalText, deals } = payload;
  const dealProducts = deals.slice(0, MAX_DEAL_COUNT);
  const firstDeal = head(dealProducts);

  if (!firstDeal) {
    return null;
  }

  const dealProductCount = size(dealProducts);
  const dealExpireTime = mainSpecialDealEndTime({ deals: dealProducts, initialTime: firstDeal.dealExpireTime });
  const imageType = getProductImageType(dealProductCount);

  return (
    <Container section={section} loadingLayer={loadingLayer}>
      <>
        <TitleSection>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          <DealTimer
            isTimerOpen={firstDeal.isDisplayTime}
            isSoldOut={firstDeal.isSoldOut}
            endDate={dealExpireTime}
            onDealEnds={() => setDealEnds(true)}
            dealEnded={dealEnds}
          />
          <AdditionalText>{additionalText || '망설이면 늦어요!'}</AdditionalText>
        </TitleSection>
        <ProductCardWarp>
          {dealProducts.map(
            ({ product, productHorizontalLargeUrl, thumbnailImageUrl, soldOutTitle, soldOutContent }, index) => {
              const imageUrl =
                dealProductCount === 1
                  ? productHorizontalLargeUrl || thumbnailImageUrl
                  : product.productVerticalMediumUrl || product.listImageUrl;
              return (
                <SpecialDealProductCard
                  key={product.no}
                  index={index}
                  product={{
                    ...product,
                    productVerticalMediumUrl: imageUrl,
                  }}
                  size={dealProducts.length}
                  imageUrl={imageUrl}
                  imageType={imageType}
                  dealEnded={dealEnds}
                  soldOutTitle={soldOutTitle}
                  soldOutContent={soldOutContent}
                  selectProduct={onSelectProduct}
                  onChangeSoldOutStatus={handleSoldOutStatusChange}
                />
              );
            },
          )}
        </ProductCardWarp>
      </>
    </Container>
  );
}
