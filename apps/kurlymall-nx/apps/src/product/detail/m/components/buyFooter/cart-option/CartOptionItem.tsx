import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import COLOR from '../../../../../../shared/constant/colorset';

import { addComma } from '../../../../../../shared/services';
import { PriceService } from '../../../../../service/priceService';
import { getDealDisabledText } from '../../../../shared/utils/productDetailState';

import { ContentType, DealProduct, DirectOrderType } from '../../../../types';
import CartOptionRestockButton from './CartOptionRestockButton';
import { redirectToLogin } from '../../../../../../shared/reducers/page';
import Alert from '../../../../../../shared/components/Alert/Alert';
import { useAppSelector } from '../../../../../../shared/store';
import useRestockNotification from '../../../../hooks/useRestockNotification';
import DealProductStepper from '../../../../shared/DealProductStepper';
import MembershipLabels from '../../../../../../shared/components/MembershipLabels/MembershipLabels';
import useDealProduct from '../../../../hooks/useDealProduct';
import PointBannerText from '../../../../../../shared/components/product/pointBannerText/PointBannerText';

const Container = styled.div`
  padding: 16px 0;
  border-radius: 3px;
  border-bottom: 1px solid ${COLOR.bg};
`;

const MembershipLabelsWrapper = styled(MembershipLabels)`
  margin-bottom: 2px;
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PointBannerWrapper = styled.div`
  margin-top: 3px;
  line-height: 1.33;
`;

const Name = styled.span<{ disabled: boolean }>`
  padding-top: 1px;
  line-height: 19px;
  word-break: break-word;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray800)};
`;

const ExpectedSalesText = styled.div`
  margin-top: 2px;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray600};
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 6px;
`;

const PriceWrapper = styled.div`
  padding-top: 4px;
`;

const Price = styled.span<{ disabled: boolean }>`
  font-weight: bold;
  font-size: 16px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray800)};
  line-height: 21px;
`;

const BasePrice = styled.span<{ disabled: boolean }>`
  margin-left: 4px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray400)};
  text-decoration: line-through;
  line-height: 19px;
`;

const StepperButton = styled(DealProductStepper)`
  width: 101px;
  height: 36px;
  border-radius: 4px;
`;

interface Props {
  contentNo: number;
  deal: DealProduct;
  contentsSoldOutGuideText: string;
  directOrderType: DirectOrderType;
  contentType: ContentType;
}

export default function CartOptionItem({
  contentNo,
  deal,
  contentsSoldOutGuideText,
  directOrderType,
  contentType,
}: Props) {
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const dispatch = useDispatch();
  const { subscribe } = useRestockNotification();
  const {
    name,
    retailPrice,
    basePrice,
    discountedPrice,
    isPurchaseStatus,
    isSoldOut,
    canRestockNotify,
    membershipLabels,
    pointBanner,
  } = deal;
  const { representativePrice, kurlyPrice, originalPrice } = new PriceService({
    retailPrice,
    basePrice,
    discountedPrice,
  });
  const notSalePrice = (originalPrice ? originalPrice : kurlyPrice) ?? 0;
  const disabled = !isPurchaseStatus || isSoldOut;
  const dealDisabledState = getDealDisabledText({ isPurchaseStatus, isSoldOut });
  const { changeQuantity } = useDealProduct(contentNo, deal, contentType);

  const subscribeRestockNotification = async () => {
    if (isGuest) {
      dispatch(redirectToLogin());
      return;
    }
    const { isConfirmed } = await Alert({
      text: `${name}의 재입고 알림을 신청하시겠습니까?`,
      showCancelButton: true,
    });
    if (isConfirmed) {
      await subscribe(deal);
    }
  };

  const handleChangeDealProductQuantity = (quantity: number) => changeQuantity(quantity);

  return (
    <Container>
      <MembershipLabelsWrapper labels={membershipLabels} />
      <NameWrapper>
        <Name disabled={disabled}>
          {!!dealDisabledState && `(${dealDisabledState}) `}
          {name}
        </Name>
      </NameWrapper>
      {pointBanner.isShow ? (
        <PointBannerWrapper>
          <PointBannerText pointBanner={pointBanner} disabled={disabled} />
        </PointBannerWrapper>
      ) : null}
      {contentsSoldOutGuideText && <ExpectedSalesText>{contentsSoldOutGuideText}</ExpectedSalesText>}
      <Option>
        <PriceWrapper>
          <Price disabled={disabled}>{addComma(representativePrice)}원</Price>
          {!!notSalePrice && <BasePrice disabled={disabled}>{addComma(notSalePrice)}원</BasePrice>}
        </PriceWrapper>
        {disabled ? (
          <CartOptionRestockButton
            disabled={!canRestockNotify || !isPurchaseStatus}
            onClickRestockButton={subscribeRestockNotification}
          />
        ) : (
          <StepperButton
            contentType={contentType}
            dealProduct={deal}
            directOrderType={directOrderType}
            isPC={false}
            onChange={handleChangeDealProductQuantity}
          />
        )}
      </Option>
    </Container>
  );
}
