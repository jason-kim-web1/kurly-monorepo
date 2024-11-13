import styled from '@emotion/styled';

import { VipNoticeInfo } from '../../../../shared/api/events/member/benefit.api';
import RawHTML from '../../../../shared/components/layouts/RawHTML';
import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  padding-bottom: 40px;

  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: calc(40px + constant(safe-area-inset-bottom));
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(40px + env(safe-area-inset-bottom));
  }
`;

const TableWrapper = styled.div`
  margin-bottom: 16px;

  .info-title {
    display: block;
    margin-bottom: 12px;
    font-weight: 600;
    color: ${COLOR.benefitTextGray};
  }
  table {
    overflow: hidden;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 0 0 1px #dfe4eb;

    th,
    td {
      padding: 16px 5px;
      border-right: 1px solid #dfe4eb;
      border-top: 1px solid #dfe4eb;
      line-height: 20px;
      text-align: center;
    }
    th {
      font-weight: 600;
    }
    td {
      font-weight: 400;
      color: ${COLOR.mainSecondary};
    }
    thead th {
      background-color: ${COLOR.mykurlyBg};
      border-top: none;
      color: ${COLOR.kurlyBlack};
    }
    tbody th {
      color: ${COLOR.mainSecondary};
    }
    thead th:last-of-type,
    tbody td:last-of-type {
      border-right: none;
    }
  }
`;

const NoticeList = styled.ul`
  font-weight: 400;
  line-height: 20px;
  color: ${COLOR.benefitTextGray};

  li {
    position: relative;
    margin-bottom: 16px;
    padding-left: 12px;

    &:last-of-type {
      margin-bottom: 0;
    }
    &::before {
      position: absolute;
      top: 7px;
      left: 0;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: #cbd1d7;
      content: '';
    }
  }

  li:has(.caution) {
    padding-left: 0;

    &::before {
      display: none;
    }
  }

  .sub-list {
    padding-top: 4px;

    li {
      margin-bottom: 4px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

interface Props {
  notice: VipNoticeInfo;
}

export default function VipNotice({ notice }: Props) {
  const { title, text, subTitle, table, list } = notice;

  return (
    <Container>
      <h3 className="sub-title">{title}</h3>
      <p className="description">{text}</p>
      <TableWrapper>
        <strong className="info-title">{subTitle}</strong>
        <RawHTML html={table} />
      </TableWrapper>
      <NoticeList>
        {list.map(({ title: listTitle, subList }) => (
          <li key={listTitle}>
            <RawHTML html={listTitle} />
            {subList ? (
              <ul className="sub-list">
                {subList.map((data) => (
                  <li key={data}>
                    <RawHTML html={data} />
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </NoticeList>
    </Container>
  );
}
