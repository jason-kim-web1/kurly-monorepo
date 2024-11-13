import { useCallback } from 'react';

import { isEmpty } from 'lodash';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css/free-mode';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { isPC, isWebview } from '../../../../util/window/getDevice';
import { useAppSelector } from '../../../shared/store';
import NextImage from '../../../shared/components/NextImage';
import { NoProductImageLogo } from '../../../shared/images';
import { AFFILILATE_BENEFIT_TITLE } from '../../../member/membership/shared/constants';
import { CLASS_NAME_DEVICE } from '../shared/constants';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectMembershipPartnerBenefits } from '../../../shared/amplitude/events/membership/SelectMembershipPartnerBenefits';
import appService from '../../../shared/services/app.service';
import { MYPAGE_PATH } from '../../../shared/constant';
import { redirectTo } from '../../../shared/reducers/page';
import { hiddenScrollBar } from '../../../shared/utils/hidden-scrollbar';

const BenefitList = styled.div`
  display: flex;
  margin: 0 -16px;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 88px;
    min-height: 104px;
    width: 88px;
    height: 100%;
    padding: 12px 6px;
    border-radius: ${vars.spacing.$6};
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    background-color: ${vars.color.background.$background2};
  }
  .image-wrap {
    overflow: hidden;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background-color: ${vars.color.$white};
  }
  .empty-text {
    padding: 0 16px;
    line-height: 1.25;
    color: ${vars.color.point};
  }

  &.pc {
    .swiper {
      width: 100%;
    }
    .swiper-slide {
      width: auto;

      &:first-of-type {
        margin-left: 16px;
      }
      &:last-of-type {
        margin-right: 16px;
      }
    }

    .item {
      height: 100%;
    }
    button {
      min-width: 148.5px;
      padding: 12px 30px;
      font-weight: 500;
    }
  }

  &.mobile {
    ${hiddenScrollBar()}
    overflow: auto hidden;
    scroll-snap-type: x mandatory;
    padding-right: 16px;

    .item {
      padding-left: 16px;
      margin-left: -8px;
    }
    .item:first-of-type {
      margin-left: 0;
    }
  }
`;

export default function AffiliateBenefitList() {
  const dispatch = useDispatch();

  const affiliateBenefits = useAppSelector(({ myMembership }) => myMembership.affiliateBenefits);

  const goToBenefit = useCallback(() => {
    amplitudeService.logEvent(new SelectMembershipPartnerBenefits({ selection_type: 'my_membership_info' }));

    if (isWebview()) {
      appService.openWebview({
        url: `${window.location.origin}${MYPAGE_PATH.affiliateBenefit.uri}`,
        title: '컬리멤버스 제휴 혜택',
      });
      return;
    }

    dispatch(redirectTo({ url: MYPAGE_PATH.affiliateBenefit.uri }));
  }, [dispatch]);

  const renderBenefitButton = useCallback(
    (title?: string, imgUrl?: string) => {
      return (
        <div className="item" key={title}>
          <button onClick={goToBenefit}>
            <div className="image-wrap">
              <NextImage
                src={imgUrl || NoProductImageLogo}
                width={56}
                height={56}
                alt={`${title} 로고`}
                objectFit="contain"
              />
            </div>
            {title}
          </button>
        </div>
      );
    },
    [goToBenefit],
  );

  const renderBenefitList = useCallback(() => {
    if (isEmpty(affiliateBenefits)) {
      return (
        <div className="empty-text">
          {AFFILILATE_BENEFIT_TITLE}이 업데이트 중입니다.
          <br />
          잠시만 기다려주세요!
        </div>
      );
    }

    if (isPC) {
      return (
        <Swiper loop={false} slidesPerView={'auto'} spaceBetween={8} freeMode={true} modules={[FreeMode]}>
          {affiliateBenefits.map(({ title, imgUrl }) => (
            <SwiperSlide key={title}>{renderBenefitButton(title, imgUrl)}</SwiperSlide>
          ))}
        </Swiper>
      );
    }

    return affiliateBenefits.map(({ title, imgUrl }) => renderBenefitButton(title, imgUrl));
  }, [affiliateBenefits, renderBenefitButton]);

  return <BenefitList className={CLASS_NAME_DEVICE}>{renderBenefitList()}</BenefitList>;
}
