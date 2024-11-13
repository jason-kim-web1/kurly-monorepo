import styled from '@emotion/styled';

import COLOR from '../../shared/constant/colorset';
import { GUIDE_PATH } from '../../shared/constant';
import NextLink from '../../shared/components/NextLink';

const Link = styled.div`
  height: 32px;
  padding: 6px 16px;
  border-radius: 18px;
  border: 1px solid ${COLOR.kurlyGray200};
  color: ${COLOR.kurlyGray600};
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.32px;
  cursor: pointer;
`;

const PurpleText = styled.span`
  font-weight: 500;
  color: ${COLOR.kurlyPurple};
`;

export default function DeliveryGuideLink() {
  return (
    <NextLink href={GUIDE_PATH.deliveryGuide.uri}>
      <Link>
        <PurpleText>샛별·하루</PurpleText> 배송안내
      </Link>
    </NextLink>
  );
}
