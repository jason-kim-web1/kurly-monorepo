import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { Fragment } from 'react';

import { PaymentBenefitsContent } from '../../../../shared/api/events/member/benefit.api';
import RawHTML from '../../../../shared/components/layouts/RawHTML';
import COLOR from '../../../../shared/constant/colorset';
import { isPC } from '../../../../../util/window/getDevice';
import { responsiveClass } from '../../shared/constants';

const Container = styled.div`
  padding: 30px 20px 60px;

  .content-item {
    display: flex;
    margin-bottom: 40px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .content-info {
    flex: 1;
  }
  .detail-info {
    display: flex;
    flex-direction: column;
    margin-bottom: 17px;
    line-height: 1.5;
    letter-spacing: -0.35px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .detail-text {
    color: ${COLOR.kurlyGray600};

    li {
      display: flex;
      padding-top: 6px;
      font-size: 12px;
      color: ${COLOR.kurlyGray450};

      &::before {
        content: '※';
        margin-right: 3px;
      }
    }
  }

  &.pc {
    padding: 60px 0 70px;

    .content-item {
      margin-bottom: 75px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
    .detail-info {
      flex-direction: row;
      margin-bottom: 5px;
      font-weight: 300;
      font-size: 16px;
      line-height: 26px;
      letter-spacing: -0.6px;
    }
    .detail-title {
      margin-bottom: 0;
      font-size: 14px;
    }
    .detail-text {
      font-size: 16px;

      li {
        padding-top: 0;
        font-size: 14px;
      }
    }

    .bubble-box {
      min-height: 30px;
      margin-bottom: 22px;
      padding: 3px 15px;
      font-weight: 300;
      font-size: 15px;
      letter-spacing: -0.3px;
    }
  }
`;

const TitleInfo = styled.div<{ isSubTitle?: boolean }>`
  width: 42vw;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5;
  margin-left: 10px;
  padding-right: 4vw;

  ${({ isSubTitle }) =>
    isSubTitle &&
    css`
      position: relative;
      padding-left: 40px;
    `}

  .sub-title {
    padding-top: 4px;
    font-size: 13px;
    color: ${COLOR.kurlyGray450};
  }

  strong {
    font-weight: 600;
  }

  &.pc {
    width: 220px;
    margin: 0;
    padding: 0;
    font-weight: 200;
    font-size: 24px;
    line-height: 35px;
    letter-spacing: -1px;

    ${({ isSubTitle }) =>
      isSubTitle &&
      css`
        padding-left: 35px;
      `}

    .sub-title {
      padding-top: 0;
      font-size: 14px;
    }

    strong {
      font-weight: 500;
    }
  }
`;

const SubTitleIcon = styled.div<{ bgColor: string; textColor: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 25px;
  height: 25px;
  font-weight: 500;
  font-size: 30px;
  line-height: 21px;
  border-radius: 100%;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : COLOR.kurlyBlack)};
  color: ${({ textColor }) => (textColor ? textColor : COLOR.kurlyWhite)};
  text-align: center;

  &.pc {
    top: 5px;
    line-height: 23px;
  }
`;

const BubbleBox = styled.div<{ bgColor: string; textColor: string }>`
  position: relative;
  min-height: 34px;
  margin-bottom: 24px;
  padding: 7px 12px;
  font-weight: 200;
  line-height: 1.5;
  letter-spacing: -0.5px;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : COLOR.kurlyBlack)};
  color: ${({ textColor }) => (textColor ? textColor : COLOR.kurlyWhite)};

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid ${({ bgColor }) => (bgColor ? bgColor : COLOR.kurlyBlack)};
  }
`;

const DetailTitle = styled.div<{ textColor: string }>`
  min-width: 85px;
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: -0.3px;
  color: ${({ textColor }) => (textColor ? textColor : COLOR.kurlyBlack)};
`;

interface Props {
  paymentContent: PaymentBenefitsContent[];
}

export default function PaymentContent({ paymentContent }: Props) {
  return (
    <Container className={responsiveClass}>
      {paymentContent.map(({ titleInfo: { mainTitle, subTitle, subTitleIcon }, bubbleBox, detailInfo }) => (
        <Fragment key={mainTitle}>
          {!isPC && (
            <BubbleBox bgColor={bubbleBox.bubbleBgColor} textColor={bubbleBox.bubbleTextColor}>
              <RawHTML html={bubbleBox.bubbleText} />
            </BubbleBox>
          )}
          <div className="content-item">
            <TitleInfo isSubTitle={!!subTitle} className={responsiveClass}>
              {subTitleIcon && (
                <SubTitleIcon
                  bgColor={bubbleBox.bubbleBgColor}
                  textColor={bubbleBox.bubbleTextColor}
                  className={responsiveClass}
                >
                  {subTitleIcon}
                </SubTitleIcon>
              )}
              {subTitle && <div className="sub-title">{subTitle}</div>}
              <RawHTML html={mainTitle} />
            </TitleInfo>
            <div className="content-info">
              {isPC && (
                <BubbleBox
                  bgColor={bubbleBox.bubbleBgColor}
                  textColor={bubbleBox.bubbleTextColor}
                  className="bubble-box"
                >
                  <RawHTML html={bubbleBox.bubbleText} />
                </BubbleBox>
              )}
              {detailInfo.detailContent.map(({ detailTitle, detailText, detailList }) => (
                <div className="detail-info" key={detailTitle}>
                  <DetailTitle textColor={detailInfo.detailTitleColor} className="detail-title">
                    <RawHTML html={detailTitle} />
                  </DetailTitle>
                  <div className="detail-text">
                    <RawHTML html={detailText} />
                    {detailList && (
                      <ul>
                        {detailList.map((list) => (
                          <li key={list}>
                            <RawHTML html={list} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </Container>
  );
}
