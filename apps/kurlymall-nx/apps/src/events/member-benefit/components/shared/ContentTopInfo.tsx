import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { CLASS_NAME_DEVICE } from '../../../../mypage/membership/shared/constants';

const Container = styled.div`
  padding: 30px 20px 10px;

  .title {
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: ${COLOR.benefitGray};
  }
  .description {
    font-weight: 400;
    line-height: 20px;
    color: ${COLOR.benefitTextGray};
  }

  &.pc {
    padding: 65px 0 20px;

    .title {
      font-weight: 500;
    }
  }
`;

interface Props {
  title: string;
  description: string;
}

export default function ContentTopInfo({ title, description }: Props) {
  return (
    <Container className={CLASS_NAME_DEVICE}>
      <h2 className="title">{title}</h2>
      <p className="description">{description}</p>
    </Container>
  );
}
