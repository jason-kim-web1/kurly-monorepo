import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css/free-mode';

import { useMemo } from 'react';

import { isEmpty } from 'lodash';

import { BenefitTitle, RoundSection } from '../shared/styled';
import ArrowRight6x10 from '../../../shared/components/icons/svg/ArrowRight6x10';
import { isPC, isWebview } from '../../../../util/window/getDevice';
import { PRODUCT_PATH } from '../../../shared/constant';
import { redirectTo } from '../../../shared/reducers/page';
import MembersProductItem from './MembersProductItem';
import { hiddenScrollBar } from '../../../shared/utils/hidden-scrollbar';
import { CLASS_NAME_DEVICE, MEMBERS_COLLECTION_CODE } from '../shared/constants';
import { ProductData } from '../../../shared/interfaces';
import { logEventMembershipCollection } from '../shared/utils';

const MembersProducts = styled.div`
  margin: 16px -16px 0;

  &.mobile {
    display: flex;
    ${hiddenScrollBar()}
    overflow: auto hidden;
    scroll-snap-type: x mandatory;
    padding-right: 16px;

    > div {
      padding-left: 16px;
      margin-left: -8px;
    }
    > div:first-of-type {
      margin-left: 0;
    }
  }

  &.pc {
    .swiper {
      width: 100%;
    }
    .swiper-slide {
      width: 112px;

      &:first-of-type {
        margin-left: 16px;
      }
      &:last-of-type {
        margin-right: 16px;
      }
    }
  }
`;

interface Props {
  membersCollection: ProductData[];
}

export default function MembersProductList({ membersCollection }: Props) {
  const dispatch = useDispatch();

  const productsFilter = useMemo(
    () => membersCollection.filter(({ status }) => status.code !== 'SOLD_OUT'),
    [membersCollection],
  );

  if (isEmpty(membersCollection) || isEmpty(productsFilter)) {
    return null;
  }

  const handleClickMore = () => {
    logEventMembershipCollection({ selectionType: 'all' });

    if (isWebview()) {
      location.href = `kurly://collection?code=${MEMBERS_COLLECTION_CODE}`;
      return;
    }

    dispatch(redirectTo({ url: `${PRODUCT_PATH.collections.uri}/${MEMBERS_COLLECTION_CODE}` }));
  };

  return (
    <RoundSection>
      <BenefitTitle>
        멤버스 전용 상품
        <button onClick={handleClickMore}>
          전체보기 <ArrowRight6x10 />
        </button>
      </BenefitTitle>
      <MembersProducts className={CLASS_NAME_DEVICE}>
        {isPC ? (
          <Swiper loop={false} slidesPerView={'auto'} spaceBetween={8} freeMode={true} modules={[FreeMode]}>
            {productsFilter.map(
              ({ no, name, discount, salesPrice, productVerticalMediumUrl, listImageUrl, isMultiplePrice }) => (
                <SwiperSlide key={no}>
                  <MembersProductItem
                    no={no}
                    name={name}
                    discount={discount}
                    salesPrice={salesPrice}
                    listImageUrl={listImageUrl}
                    productVerticalMediumUrl={productVerticalMediumUrl ?? ''}
                    isMultiplePrice={isMultiplePrice}
                  />
                </SwiperSlide>
              ),
            )}
          </Swiper>
        ) : (
          productsFilter.map(
            ({ no, name, discount, salesPrice, productVerticalMediumUrl, listImageUrl, isMultiplePrice }) => (
              <MembersProductItem
                key={no}
                no={no}
                name={name}
                discount={discount}
                salesPrice={salesPrice}
                listImageUrl={listImageUrl}
                productVerticalMediumUrl={productVerticalMediumUrl ?? ''}
                isMultiplePrice={isMultiplePrice}
              />
            ),
          )
        )}
      </MembersProducts>
    </RoundSection>
  );
}
