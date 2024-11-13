import styled from '@emotion/styled';

import Link from 'next/link';

import COLOR from '../../../shared/constant/colorset';

import { Menu } from '../../menu-section/interfaces';
import { MenuTitleTextMap } from '../../menu-section/constants';
import { useMenuAmplitude } from '../hooks/useMenuAmplitude';
import { MypageGiftCardInfo } from '../../../shared/interfaces';
import { isPC } from '../../../../util/window/getDevice';
import { TooltipLayer } from '../../membership/shared/styled';
import { getPageUrl, MEMBERSHIP_PATH, MYPAGE_PATH } from '../../../shared/constant';
import { ArrowRight } from '../../../shared/icons';
import { useAppSelector } from '../../../shared/store';
import { loadMemberLoading } from '../../../shared/reducers/member';

import { amplitudeService } from '../../../shared/amplitude';
import { SelectMembership, SelectMembershipInfo } from '../../../shared/amplitude/events/membership';
import { CLASS_NAME_DEVICE } from '../../membership/shared/constants';

const AUTO_CLOSE_TIME = 5000;

const Container = styled.div`
  margin-top: 12px;
  border: 1px solid ${COLOR.kurlyGray250};
  border-radius: 12px;
`;

const AvailableAmountWrap = styled.div`
  display: flex;

  .item-wrap {
    position: relative;
    min-width: 50%;

    &:first-of-type::after {
      position: absolute;
      top: 23px;
      bottom: 19px;
      right: 0;
      width: 1px;
      background-color: ${COLOR.kurlyGray200};
      content: '';
    }

    .menu-item {
      display: block;
      width: 100%;
      min-height: 81px;
      padding: 20px 12px 16px 16px;
      text-align: left;
    }

    .name-text {
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: ${COLOR.kurlyGray600};
    }
    .amount-text {
      display: flex;
      align-items: center;
      padding-top: 6px;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: -0.4px;
    }
    .number-text {
      padding-right: 2px;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: -0.8px;

      @media (max-width: 320px) {
        font-size: 18px;
      }
    }

    .gift-card {
      display: flex;
      gap: 2px;
      position: absolute;
      top: 14px;
      right: 12px;
      height: 26px;
      padding: 0 10px;
      border-radius: 13px;
      font-weight: 600;
      font-size: 12px;
      line-height: 26px;
      letter-spacing: -0.2px;
      background-color: ${COLOR.btnGray};
    }
  }

  &.pc {
    .amount-text {
      font-weight: 500;
    }
    .number-text {
      font-size: 24px;
    }
  }
`;

const MembersLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 12px 12px 14px;
  border-radius: 0 0 12px 12px;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  word-break: break-all;
  background-color: ${COLOR.membersBackground};

  .description {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 92px;
    color: ${COLOR.kurlymembers};
    text-align: right;

    > svg {
      min-width: 16px;
    }
  }

  &.pc {
    font-weight: 500;
  }
`;

interface Props {
  menu: Menu[];
  giftCardInfo: MypageGiftCardInfo;
  isKurlypayFailure: boolean;
  isTooltipHidden: boolean;
}

export default function AvailableAmount({ menu, giftCardInfo, isKurlypayFailure, isTooltipHidden }: Props) {
  const { handleClickLink } = useMenuAmplitude();

  const { isSubscribed, showMembershipBanner, bannerMessage } = useAppSelector(({ member }) => ({
    isSubscribed: member.subscription.isSubscribed,
    showMembershipBanner: member.subscription.showMembershipBanner,
    bannerMessage: member.subscription.bannerMessage,
  }));

  const memberLoading = useAppSelector(loadMemberLoading);

  const giftCardInfoRender = () => {
    const { count, benefitMessage } = giftCardInfo;

    if (count > 0 && !isKurlypayFailure) {
      return <span>{count}장</span>;
    }

    const showTooltip = benefitMessage && (isPC ? isTooltipHidden : true);

    return showTooltip && <TooltipLayer autoCloseTime={AUTO_CLOSE_TIME}>{benefitMessage}</TooltipLayer>;
  };

  const logAmplitude = ({ isMembershipInfo }: { isMembershipInfo: boolean }) => {
    if (isMembershipInfo) {
      amplitudeService.logEvent(new SelectMembershipInfo());
    } else {
      amplitudeService.logEvent(new SelectMembership({ selection_type: 'my_kurly_top' }));
    }
  };

  const membershipBannerRender = () => {
    if (memberLoading || !showMembershipBanner) {
      return null;
    }

    const { title, description } = bannerMessage;

    if (title) {
      const url = isSubscribed ? getPageUrl(MYPAGE_PATH.myMembership) : getPageUrl(MEMBERSHIP_PATH.membership);
      return (
        <Link href={url} passHref>
          <MembersLink
            href={url}
            className={CLASS_NAME_DEVICE}
            onClick={() => logAmplitude({ isMembershipInfo: isSubscribed })}
          >
            <div>{title}</div>
            <div className="description">
              {description}
              <ArrowRight stroke={COLOR.kurlyGray500} />
            </div>
          </MembersLink>
        </Link>
      );
    }

    return null;
  };

  return (
    <Container>
      <AvailableAmountWrap className={CLASS_NAME_DEVICE}>
        {menu.map(({ title, text, link }) => (
          <div className="item-wrap" key={title}>
            {isKurlypayFailure ? (
              <>
                <span className="menu-item">
                  <div className="name-text">{title}</div>
                  <div className="amount-text">점검중</div>
                </span>
                {title === MenuTitleTextMap.kurlycash && (
                  <span className="gift-card">상품권 {giftCardInfoRender()}</span>
                )}
              </>
            ) : (
              <>
                <button className="menu-item" onClick={() => handleClickLink(title, link ?? '')}>
                  <div className="name-text">{title}</div>
                  <div className="amount-text">
                    <div className="number-text">{text}</div>원
                  </div>
                </button>
                {title === MenuTitleTextMap.kurlycash && (
                  <button className="gift-card" onClick={() => handleClickLink(title, giftCardInfo?.redirectUrl ?? '')}>
                    상품권 {giftCardInfoRender()}
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </AvailableAmountWrap>
      {membershipBannerRender()}
    </Container>
  );
}
