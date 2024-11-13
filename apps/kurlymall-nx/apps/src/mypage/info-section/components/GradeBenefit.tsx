import styled from '@emotion/styled';

import Lottie from 'react-lottie-player';

import { useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';

import COLOR from '../../../shared/constant/colorset';
import { useAppSelector } from '../../../shared/store';

import { CLASS_NAME_DEVICE } from '../../membership/shared/constants';
import * as animationData from '../welcomeTextLottie.json';
import { VipInfo } from '../../../shared/interfaces';
import { redirectTo } from '../../../shared/reducers/page';

import ArrowRight from '../../../shared/icons/ArrowRight';
import GradeBadge from './GradeBadge';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectVipPage } from '../../../shared/amplitude/events/lounges';

const GradeInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .grade-name {
    display: flex;
    align-items: center;
    min-width: calc(100% - 100px);
  }

  .user-name {
    overflow: hidden;
    padding-left: 5px;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -0.2px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .vip-badge,
  .membership-badge {
    margin-right: 6px;
  }
  .vip-badge + .lottie-text + .user-name,
  .membership-badge + .lottie-text + .user-name {
    padding-left: 2px;
  }

  &.pc {
    .grade-icon,
    .vip-button {
      font-weight: 500;
    }
    .user-name {
      font-weight: 500;
      font-size: 20px;
    }
  }
`;

const VipButton = styled.button<{ vipName: string }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: ${({ vipName }) => (vipName === 'VIP' ? 82 : 90)}px;
  margin: 4px 0 0 10px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.2px;
`;

const GradeBenefitWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px 8px;
  margin-top: 4px;

  .benefit-text {
    position: relative;
    padding-right: 8px;
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;

    ::after {
      position: absolute;
      top: 4px;
      right: 0;
      width: 1px;
      height: 12px;
      background-color: ${COLOR.kurlyGray250};
      content: '';
    }
    :last-of-type::after {
      display: none;
    }
    + a {
      margin-top: 7px;
    }
    > strong {
      font-weight: 600;
      letter-spacing: 0;
    }
  }
`;

const lottieStyle = {
  minWidth: '76px',
  width: '76px',
  height: '28px',
  marginTop: '3px',
};

interface Props {
  vipInfo: VipInfo | null;
  userGradeName: string | null;
  userName: string | null;
}

const optLottie = {
  loop: true,
  play: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function GradeBenefit({ vipInfo, userName, userGradeName }: Props) {
  const dispatch = useDispatch();

  const { benefits, isSubscribed } = useAppSelector(({ member }) => ({
    benefits: member.benefits,
    isSubscribed: member.subscription.isSubscribed,
  }));

  const benefitsDataFilter = benefits.filter(
    ({ description, type, value }) => description && (description !== '적립 0%' || (type === 'point' && value > 0)),
  );

  const handleClickLounge = (link: string) => {
    const url = `/member/lounges/${link.toLowerCase()}`;
    amplitudeService.logEvent(new SelectVipPage({ url: `${window.location.origin}${url}` }));
    dispatch(redirectTo({ url }));
  };

  return (
    <>
      <GradeInfoWrap className={CLASS_NAME_DEVICE}>
        <div className="grade-name">
          <GradeBadge
            userGradeName={userGradeName ?? ''}
            isSubscribed={isSubscribed}
            vipName={vipInfo?.name ?? ''}
            vipIconUrl={vipInfo?.profileImageUrl}
          />
          <Lottie className="lottie-text" {...optLottie} style={lottieStyle} />
          <div className="user-name">{userName}님</div>
        </div>
        {vipInfo ? (
          <VipButton className="vip-button" vipName={vipInfo.name} onClick={() => handleClickLounge(vipInfo.name)}>
            {vipInfo.name}전용관 <ArrowRight width={18} height={18} stroke={COLOR.kurlyGray800} />
          </VipButton>
        ) : null}
      </GradeInfoWrap>
      {isEmpty(benefitsDataFilter) ? null : (
        <GradeBenefitWrap className={CLASS_NAME_DEVICE}>
          {benefitsDataFilter.map(({ description, type, tag }) => (
            <div className="benefit-text" key={type}>
              {tag && <strong>{tag} </strong>}
              {description}
            </div>
          ))}
        </GradeBenefitWrap>
      )}
    </>
  );
}
