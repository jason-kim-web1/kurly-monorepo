import styled from '@emotion/styled';

import RawHTML from '../../../shared/components/layouts/RawHTML';
import COLOR from '../../../shared/constant/colorset';

const Container = styled.div`
  width: 1050px;
  margin: 0 auto;
`;

const StandardSubPage = styled.dl`
  display: flex;
  padding-bottom: 30px;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: -0.05em;
  color: ${COLOR.kurlyBlack};
`;

const Title = styled.dt`
  min-width: 200px;
  font-weight: 500;
  color: ${COLOR.kurlyPurple};
`;

const Info = styled.dd`
  font-weight: 300;
  text-align: justify;

  div > strong {
    display: block;
    padding-bottom: 12px;
    font-weight: 500;

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
  }
  li > span,
  li > strong {
    padding-right: 4px;
    white-space: nowrap;
  }
  li > strong {
    padding-right: 4px;
    font-weight: 500;
  }
  .sub_list li {
    padding: 0;
  }
  table {
    margin: 10px 0;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid ${COLOR.kurlyGray250};

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
      padding: 5px;
      border-top: 1px solid ${COLOR.kurlyGray250};
    }
    td {
      padding-left: 20px;
    }
    thead th {
      height: 38px;
      font-weight: 400;
      background-color: ${COLOR.kurlyGray100};
      text-align: center;
    }
    tbody th {
      width: 160px;
      padding-left: 20px;
      border-right: 1px solid ${COLOR.kurlyGray250};
    }
    + span {
      display: block;
      padding-bottom: 25px;
      font-size: 14px;
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
