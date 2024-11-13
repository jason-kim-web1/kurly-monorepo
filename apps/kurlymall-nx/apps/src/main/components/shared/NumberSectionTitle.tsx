import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../shared/utils';
import { isPC } from '../../../../util/window/getDevice';

type SectionType = 'RANDOM_COLLECTION_NUMBER' | 'GROUP_COLLECTION_PRODUCT_NUMBER';

const Titles = styled.div<{ type: SectionType }>`
  display: flex;
  align-items: ${({ type }) => {
    if (type === 'GROUP_COLLECTION_PRODUCT_NUMBER' && !isPC) {
      return 'flex-start';
    }
    return 'center';
  }};
  flex-direction: column;
  width: 100%;
  gap: ${isPC ? '10px' : 0};
`;

const TextEllipsis = styled.span`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Title = styled(TextEllipsis)`
  color: ${COLOR.benefitGray};
  font-size: ${isPC ? '28px' : '18px'};
  line-height: ${isPC ? '31px' : '22px'};
  font-weight: ${isPC ? 500 : 600};
  ${multiMaxLineText(2)};
`;

const SubTitle = styled(TextEllipsis)`
  font-size: ${isPC ? '16px' : '14px'};
  color: ${COLOR.benefitTextGray};
  line-height: 18px;
  margin-top: 4px;
  ${multiMaxLineText(2)};
`;

const Container = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

interface Props {
  title: string;
  type: SectionType;
  subtitle?: string;
  className?: string;
}

const SectionTitle = ({ title, type, subtitle, className }: Props) => {
  return (
    <Container className={className}>
      <Titles type={type}>
        <Title>{title}</Title>
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
      </Titles>
    </Container>
  );
};

export { SectionTitle };
