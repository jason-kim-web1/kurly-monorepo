import styled from '@emotion/styled';

import { head, isEmpty } from 'lodash';

import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { MainSpecialDealsSection } from '../../../interfaces/MainSection.interface';
import type { ProductStatus } from '../../../../shared/interfaces';

import Timer from '../../shared/Timer';
import SectionContents from '../shared/SectionContents';
import MainProductCard from '../shared/MainProductCard';
import SectionTitle from '../shared/SectionTitle';

import useSectionEvent from '../../../hooks/useSectionEvent';
import { loadMainSection } from '../../../slice';
import { mainSpecialDealEndTime } from '../../../util/mainSpecialDealEndTimeUtil';
import { createMainSkeleton } from '../shared/skeleton/CreateMainSkeleton';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';

const Container = styled(SectionContents)`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const DealTimer = styled(Timer)`
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  .lottie-timer {
    margin-right: 4px;
    width: 26px;
    height: 26px;
  }
  .time-units {
    display: flex;
    justify-content: start;
    gap: 10px;
    span {
      position: relative;
      font-size: 22px;
      font-weight: 600;
      &:not(:last-of-type):after {
        content: ':';
        position: absolute;
        width: 11px;
        height: 50px;
        top: 0;
        right: -13px;
        font-size: 22px;
      }
    }
  }
`;

const TitleSection = styled.div`
  padding: 16px 0 8px;
`;

const Title = styled(SectionTitle)`
  padding: 0;
  margin-bottom: 8px;
`;

const SpecialDealProductCard = styled(MainProductCard)<{ dealEnds: boolean }>`
  max-width: 100%;
  &:not(:first-of-type) {
    margin-top: 16px;
  }
  .sold-out-layer {
    padding-bottom: 3px;
    strong {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
    }
    span {
      padding-top: 9px;
      font-weight: 400;
      font-size: 12px;
    }
  }
  .image-container {
    padding-top: 47.9%;
  }
  .product-function {
    height: 36px;
    font-size: 14px;

    > svg {
      width: 20px;
      height: 20px;
      margin-top: 1px;
    }
  }
  .product-info {
    padding: 9px 0;
    .product-name {
      font-size: 16px;
      line-height: 21px;
      -webkit-line-clamp: 1;
      overflow-wrap: break-word;
    }
    .product-description {
      margin-bottom: 5px;
      font-size: 13px;
    }
    .product-price {
      display: flex;
      flex-direction: row;
      align-items: center;

      &.discount-price {
        > div:nth-of-type(1) {
          order: 2;
          margin-top: -3px;
        }
        > div:nth-of-type(2) {
          padding-right: 1px;
          order: 1;
        }
      }

      .discount-rate,
      .sales-price {
        margin-right: 4px;
        font-size: 18px;
        font-weight: bold;
        line-height: 1.36;
        white-space: nowrap;
      }
      .dimmed-price {
        font-size: 14px;
      }
    }
    .review-count {
      padding-top: 9px;
      font-size: 12px;
    }
  }
`;

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

  const loadingLayer = createMainSkeleton(type);

  if (!payload) {
    return <Container section={section} loadingLayer={loadingLayer} />;
  }

  const { title, subtitle, deals } = payload;

  const firstDeal = head(deals);

  if (isEmpty(deals) || !firstDeal) {
    return null;
  }

  const dealExpireTime = mainSpecialDealEndTime({ deals, initialTime: firstDeal.dealExpireTime });

  return (
    <Container section={section} loadingLayer={loadingLayer}>
      <TitleSection>
        <Title title={title} subtitle={subtitle} />
        <DealTimer
          isTimerOpen={firstDeal.isDisplayTime}
          isSoldOut={firstDeal.isSoldOut}
          endDate={dealExpireTime}
          onDealEnds={() => setDealEnds(true)}
          dealEnded={dealEnds}
        />
      </TitleSection>
      <div>
        {deals.map(({ product, soldOutTitle, productHorizontalLargeUrl, thumbnailImageUrl, soldOutContent }, index) => {
          const messageTitle = dealEnds ? '판매 시간이 종료되었습니다.' : soldOutTitle;
          const messageContent = dealEnds ? '' : soldOutContent;
          const status: ProductStatus = dealEnds
            ? {
                code: 'SOLD_OUT',
                message: {
                  title: messageTitle,
                  content: messageContent,
                },
              }
            : product.status;
          return (
            <SpecialDealProductCard
              key={product.no}
              index={index}
              product={{
                ...product,
                productVerticalMediumUrl: productHorizontalLargeUrl || thumbnailImageUrl,
                status,
                description: product.shortDescription,
              }}
              dealEnds={dealEnds}
              selectProduct={onSelectProduct}
              imageType={ProductImageType.MAIN_SPECIAL_DEAL_ITEM}
              onChangeSoldOutStatus={handleSoldOutStatusChange}
            />
          );
        })}
      </div>
    </Container>
  );
}
