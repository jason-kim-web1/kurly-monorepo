import styled from '@emotion/styled';

import COLOR from '../../../../../../../shared/constant/colorset';

import { DealProduct } from '../../../../../types';

import { addComma } from '../../../../../../../shared/services';
import { getSubPrice, PriceService } from '../../../../../../service/priceService';

import DealProductStepper from '../../../../../shared/DealProductStepper';
import useDealProduct from '../../../../../hooks/useDealProduct';
import DeleteButton from './DeleteButton';
import MembershipLabels from '../../../../../../../shared/components/MembershipLabels/MembershipLabels';
import { useAppSelector } from '../../../../../../../shared/store';
import PointBannerText from '../../../../../../../shared/components/product/pointBannerText/PointBannerText';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 11px 10px 11px 15px;
  font-size: 12px;
  border-left: 1px solid ${COLOR.bg};
  border-top: 1px solid ${COLOR.bg};
  border-right: 1px solid ${COLOR.bg};
  &:last-of-type {
    border-bottom: 1px solid ${COLOR.bg};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NameWrapper = styled(Row)`
  align-items: flex-start;
`;

const SelectWrapper = styled(Row)`
  align-items: center;
  padding-top: 4px;
`;

const DealName = styled.span`
  line-height: 16px;
  width: 320px;
  min-height: 24px;
  color: ${COLOR.kurlyGray800};
  overflow-wrap: break-word;
`;

const PointBannerWrapper = styled(DealName)`
  margin-top: -4px;
`;

const DealPrice = styled.div`
  padding-top: 4px;
`;

const BasePrice = styled.span`
  margin-right: 4px;
  font-weight: normal;
  font-size: 12px;
  color: ${COLOR.kurlyGray400};
  text-decoration: line-through;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 12px;
  color: ${COLOR.kurlyGray800};
  padding-right: 4px;
`;

interface Props {
  contentNo: number;
  dealProduct: DealProduct;
  displayRemove?: boolean;
}

export default function CartOptionItem({ contentNo, dealProduct, displayRemove = true }: Props) {
  const { name, retailPrice, basePrice, discountedPrice, membershipLabels } = dealProduct;
  const { representativePrice, kurlyPrice, originalPrice } = new PriceService({
    retailPrice,
    basePrice,
    discountedPrice,
  });
  const { contentType } = useAppSelector(({ productDetail }) => productDetail);
  const subPrice = getSubPrice({ originalPrice, kurlyPrice });
  const { deselect, changeQuantity } = useDealProduct(contentNo, dealProduct, contentType);
  const pointBanner = dealProduct.pointBanner;
  const handleChangeQuantity = (nextQuantity: number) => changeQuantity(nextQuantity);

  return (
    <Container className="cart-option-item">
      <MembershipLabels labels={membershipLabels} />
      <NameWrapper>
        <DealName>{name}</DealName>
        {displayRemove && <DeleteButton onClick={deselect} />}
      </NameWrapper>
      {pointBanner.isShow ? (
        <PointBannerWrapper>
          <PointBannerText pointBanner={pointBanner} />
        </PointBannerWrapper>
      ) : null}
      <SelectWrapper>
        <DealProductStepper dealProduct={dealProduct} contentType={contentType} onChange={handleChangeQuantity} />
        <DealPrice>
          {!!subPrice && <BasePrice>{addComma(subPrice)}원</BasePrice>}
          <Price>{addComma(representativePrice)}원</Price>
        </DealPrice>
      </SelectWrapper>
    </Container>
  );
}
