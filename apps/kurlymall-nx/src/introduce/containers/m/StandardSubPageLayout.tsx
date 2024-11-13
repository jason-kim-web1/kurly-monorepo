import styled from '@emotion/styled';

import RawHTML from '../../../shared/components/layouts/RawHTML';
import COLOR from '../../../shared/constant/colorset';

const Container = styled.div`
  padding-bottom: 30px;
`;

const StandardSubPage = styled.dl`
  padding: 20px 18px 0;
  line-height: 20px;
  color: ${COLOR.kurlyBlack};
`;

const Title = styled.dt`
  padding-bottom: 10px;
  font-weight: 700;
  color: ${COLOR.kurlyPurple};

  br {
    display: none;
  }
`;

const Info = styled.dd`
  font-weight: 300;

  div > strong {
    display: block;
    padding-bottom: 12px;
    font-weight: 700;

    &:last-of-type {
      padding-top: 15px;
    }
  }
  p {
    padding-bottom: 12px;
  }
  li {
    display: flex;
    padding-bottom: 12px;
    font-size: 12px;
  }
  li > span,
  li > strong {
    padding-right: 5px;
    white-space: nowrap;
  }
  li > strong {
    font-weight: 500;
  }
  .sub_list li {
    padding: 0 0 4px;
  }
  table {
    margin: 10px 0;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid ${COLOR.kurlyGray250};
    font-size: 12px;

    caption {
      overflow: hidden;
      position: absolute;
      left: -9999px;
      width: 1px;
      height: 1px;
    }
    th,
    td {
      font-weight: 300;
      padding: 5px 10px;
      border-top: 1px solid ${COLOR.kurlyGray250};
    }
    thead th {
      height: 38px;
      font-weight: 400;
      background-color: ${COLOR.kurlyGray100};
      text-align: center;
    }
    tbody th {
      width: 22%;
      padding: 0 9px;
      border-right: 1px solid ${COLOR.kurlyGray250};
    }
    + span {
      display: block;
      padding-bottom: 25px;
      font-size: 12px;
    }
  }
`;

interface Props {
  title: string;
  text: string;
}

export default function StandardSubPageLayout({ title, text }: Props) {
  return (
    <Container>
      <StandardSubPage>
        <Title>
          <RawHTML html={title} />
        </Title>
        <Info>
          <RawHTML html={text} />
        </Info>
      </StandardSubPage>
    </Container>
  );
}
