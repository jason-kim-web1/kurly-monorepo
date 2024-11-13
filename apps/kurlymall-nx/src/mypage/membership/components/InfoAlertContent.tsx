import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { MyBenefitInfo } from '../../../shared/api/membership/api.type';

const Title = styled.div`
  font-weight: 400;
  line-height: 20px;
  color: ${vars.color.text.$tertiary};

  strong {
    display: block;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    color: ${vars.color.text.$primary};
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0 12px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  line-height: 20px;
  color: ${vars.color.text.$secondary};

  .amount {
    font-weight: 600;
    color: ${vars.color.text.$primary};
  }
`;

const SumText = styled.div`
  padding: 12px 0 0;
  border-top: 1px solid ${vars.color.line.$line1};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  text-align: right;
  color: ${vars.color.point.$point1};
`;

interface Props {
  myBenefitInfo: MyBenefitInfo;
}

export default function InfoAlertContent({ myBenefitInfo }: Props) {
  const { name, info, total } = myBenefitInfo;

  return (
    <>
      <Title>
        <strong>멤버십 최대 혜택가 안내</strong>
        {`${name} 혜택 기준입니다.`}
      </Title>
      <Items>
        {info.map(({ title, text }) => (
          <Item key={title}>
            <div>{title}</div>
            <div className="amount">{text}</div>
          </Item>
        ))}
      </Items>
      <SumText>{total}</SumText>
    </>
  );
}
