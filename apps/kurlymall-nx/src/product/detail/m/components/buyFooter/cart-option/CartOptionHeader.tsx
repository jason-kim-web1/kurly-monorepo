import styled from '@emotion/styled';

import { getDealDisabledText } from '../../../../shared/utils/productDetailState';

import COLOR from '../../../../../../shared/constant/colorset';

import { NoMainImageLogo } from '../../../../../../shared/images';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${COLOR.kurlyWhite};
`;

const ProductInfo = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid ${COLOR.bg};
`;

const Thumbnail = styled.div<{ imageUrl: string; disabled: boolean }>`
  flex: 0 0 50px;
  height: 50px;
  border-radius: 4px;
  background: url(${({ imageUrl }) => imageUrl}), url(${NoMainImageLogo}) no-repeat 50% 50%;
  background-size: cover, contain;
  background-color: ${COLOR.kurlyGray150};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

const ProductDescription = styled.div`
  flex: 0 1 auto;
  padding-left: 14px;
  overflow: hidden;
`;

const NameText = styled.p<{ disabled: boolean }>`
  font-size: 14px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray800)};
  line-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ShortDescriptionText = styled.p<{ disabled: boolean }>`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray450)};
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface Props {
  name: string;
  shortDescription: string;
  thumbnailImageUrl: string;
  isSoldOut: boolean;
  isPurchaseStatus: boolean;
}

export default function CartOptionHeader({
  name,
  shortDescription,
  thumbnailImageUrl,
  isSoldOut,
  isPurchaseStatus,
}: Props) {
  const productDisabledState = getDealDisabledText({ isPurchaseStatus, isSoldOut });

  const disabled = isSoldOut || !isPurchaseStatus;

  return (
    <Container>
      <ProductInfo>
        <Thumbnail imageUrl={thumbnailImageUrl} disabled={disabled} />
        <ProductDescription>
          <NameText disabled={disabled}>
            {disabled && `(${productDisabledState})`}
            {name}
          </NameText>
          <ShortDescriptionText disabled={disabled}>{shortDescription}</ShortDescriptionText>
        </ProductDescription>
      </ProductInfo>
    </Container>
  );
}
