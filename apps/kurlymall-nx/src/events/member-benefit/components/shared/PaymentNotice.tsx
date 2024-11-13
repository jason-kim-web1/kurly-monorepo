import styled from '@emotion/styled';

import { Fragment } from 'react';

import { css } from '@emotion/react';

import { PaymentBenefitsNotice } from '../../../../shared/api/events/member/benefit.api';
import RawHTML from '../../../../shared/components/layouts/RawHTML';
import COLOR from '../../../../shared/constant/colorset';
import { responsiveClass } from '../../shared/constants';

const listStyle = css`
  position: relative;
  padding-left: 7px;
`;

const dotStyle = css`
  content: '';
  position: absolute;
  width: 3px;
  height: 3px;
  top: 8px;
  left: 0;
  border-radius: 100%;
  margin-right: 5px;
  background: ${COLOR.kurlyGray450};
`;

const Container = styled.div`
  margin-bottom: -8px;
  padding: 40px 20px 20px;
  font-size: 12px;
  line-height: 1.7;
  letter-spacing: -0.3px;
  background-color: ${COLOR.bgLightGray};
  color: ${COLOR.kurlyGray600};

  .notice-item {
    margin-bottom: 25px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .notice-title {
    font-size: 13px;
    font-weight: 400;
    line-height: 1;
    margin-bottom: 18px;
  }
  .notice-info {
    display: flex;
    flex-direction: column;

    .sub-title {
      margin-bottom: 8px;
      font-weight: 400;
      line-height: 1;
    }
    .notice-list {
      padding-bottom: 20px;
      color: ${COLOR.kurlyGray450};
    }
    .notice-list-item {
      ${listStyle};
      font-weight: 400;

      &::before {
        ${dotStyle};
      }

      strong {
        font-weight: 700;
      }
      .emph {
        color: ${COLOR.kurlyGray600};
      }
    }
    .second-text {
      display: flex;

      &.bullet-type1 {
        ${listStyle};

        &::before {
          ${dotStyle};
        }
      }

      &.bullet-type2 {
        ${listStyle};

        &::before {
          content: '-';
          position: absolute;
          top: 0;
          left: 0;
          margin-right: 5px;
        }
      }
    }
  }

  &.pc {
    margin-bottom: 100px;
    padding: 45px 20px 25px 40px;
    font-size: 13px;
    line-height: 23px;
    letter-spacing: -0.5px;

    .notice-item {
      display: flex;
    }
    .notice-title {
      min-width: 120px;
      font-weight: 500;
      line-height: 21px;
    }
    .notice-info {
      .sub-title {
        font-weight: 500;
        line-height: 21px;
      }
      .notice-list-item {
        font-weight: 300;

        &::before,
        .bullet-type1::before {
          top: 10px;
        }

        strong {
          font-weight: 600;
        }
      }
    }
  }
`;

interface Props {
  paymentNotice: PaymentBenefitsNotice[];
}

export default function PaymentNotice({ paymentNotice }: Props) {
  return (
    <Container className={responsiveClass}>
      {paymentNotice.map(({ noticeTitle, noticeInfo }, index) => (
        <div className="notice-item" key={`${noticeTitle}-${index}`}>
          <div className="notice-title">
            <RawHTML html={noticeTitle} />
          </div>
          <div className="notice-info">
            {noticeInfo.map(({ subTitle, noticeList }) => (
              <Fragment key={subTitle}>
                {subTitle && <div className="sub-title">{subTitle}</div>}
                <div className="notice-list">
                  {noticeList.map(({ text, subList, subListDot, subListHyphen }) => (
                    <div className="notice-list-item" key={text}>
                      <RawHTML html={text} />
                      {[subList, subListDot, subListHyphen].map((list, listIndex) =>
                        list?.map((data) => (
                          <div key={data} className={`second-text bullet-type${listIndex}`}>
                            <RawHTML html={data} />
                          </div>
                        )),
                      )}
                    </div>
                  ))}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
}
