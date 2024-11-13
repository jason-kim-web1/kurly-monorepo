import styled from '@emotion/styled';

import { CouponPackContents } from '../../../../shared/api/events/member/benefit.api';

import COLOR from '../../../../shared/constant/colorset';

const CouponPack = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
`;

const CouponItem = styled.div<{
  bgColor: string;
  titleColor: string;
  roundColor: string;
  countColor: string;
  borderColor: string;
}>`
  flex: 1;
  min-width: 272px;

  .coupon-top {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 62px;
    padding: 20px 20px 16px;
    border-radius: 16px 16px 0 0;
    background-color: ${({ bgColor }) => bgColor};
    color: ${({ titleColor }) => titleColor};

    .emph-txt {
      font-size: 18px;
      line-height: 26px;
    }
    p {
      padding-top: 2px;
      line-height: 20px;
      opacity: 0.8;
    }
  }

  .coupon-list {
    padding: 16px 16px 20px 20px;
    border-radius: 0 0 16px 16px;
    border: 1.5px solid ${({ borderColor }) => borderColor};
    border-top: none;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .info {
    color: ${COLOR.benefitTextGray};

    strong {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: ${COLOR.benefitGray};
    }
    .badge {
      display: inline-block;
      height: 18px;
      padding: 0 5px;
      margin: 2px 0 0 6px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 10px;
      line-height: 18px;
      text-align: center;
      background-color: ${COLOR.benefitGray};
      color: ${COLOR.kurlyWhite};
      vertical-align: top;
    }
    p {
      font-size: 13px;
      line-height: 18px;
      padding-top: 2px;
    }
  }

  .count {
    min-width: 42px;
    height: 42px;
    border-radius: 100%;
    font-weight: 600;
    line-height: 42px;
    text-align: center;
    background-color: ${({ roundColor }) => roundColor};
    color: ${({ countColor }) => countColor};
  }
`;

interface Props {
  couponPack: {
    title: string;
    contents: CouponPackContents[];
  };
  caution: string[];
}

export default function MembersCouponPack({ couponPack, caution }: Props) {
  const { title, contents } = couponPack;

  return (
    <>
      <h3 className="sub-title">{title}</h3>
      <CouponPack className="coupon">
        {contents.map(({ id, text, list, styleColor }) => (
          <CouponItem
            key={id}
            bgColor={styleColor.bg}
            titleColor={styleColor.title}
            roundColor={styleColor.round}
            countColor={styleColor.count}
            borderColor={styleColor.border}
          >
            <div className="coupon-top">
              <strong className="emph-txt">{id}</strong>
              <p>{text}</p>
            </div>
            <ul className="coupon-list">
              {list.map(({ id: listTitle, badge, text: listText, count }) => (
                <li key={listTitle}>
                  <div className="info">
                    <strong>
                      {listTitle}
                      {badge && <span className="badge">{badge}</span>}
                    </strong>
                    <p>{listText}</p>
                  </div>
                  <div className="count">{count}</div>
                </li>
              ))}
            </ul>
          </CouponItem>
        ))}
      </CouponPack>
      <h3 className="sub-title">유의사항</h3>
      <ul className="list-caution">
        {caution.map((data) => (
          <li key={data}>{data}</li>
        ))}
      </ul>
    </>
  );
}
