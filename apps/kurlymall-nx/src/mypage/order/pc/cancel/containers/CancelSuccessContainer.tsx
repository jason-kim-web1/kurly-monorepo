import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../../../shared/store';

import { getPageUrl, USER_MENU_PATH } from '../../../../../shared/constant';
import COLOR from '../../../../../shared/constant/colorset';

import useReAddCartItems from '../../../shared/hooks/useReAddCartItems';
import Button from '../../../../../shared/components/Button/Button';
import { redirectTo } from '../../../../../shared/reducers/page';

const Wrapper = styled.div`
  width: 400px;
  padding: 30px;
  margin: 0 auto;
  text-align: center;
  background: ${COLOR.kurlyWhite};
`;

const Image = styled.img`
  display: block;
  width: 68px;
  height: 68px;
  margin: 17px auto 8px;
`;

const Title = styled.strong`
  display: block;
  padding-bottom: 16px;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  color: ${COLOR.kurlyGray600};
`;

const Description = styled.p`
  padding-bottom: 24px;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray400};
`;

const styles = {
  button: {
    margin: '0 auto 48px',
  },
  goHomeButton: {
    borderRadius: '3px',
  },
};

export default function CancelSuccessContainer() {
  const dispatch = useDispatch();

  const { addCart, isLoading } = useReAddCartItems();
  const { productsToReAddToCart, isAddBackToCart } = useAppSelector(({ mypageCancel }) => ({
    productsToReAddToCart: mypageCancel.productsToReAddToCart,
    isAddBackToCart: mypageCancel.isAddBackToCart,
  }));

  const moveHome = () => {
    dispatch(
      redirectTo({
        url: getPageUrl(USER_MENU_PATH.home),
      }),
    );
  };

  const handleCartPutAgain = () => {
    addCart(productsToReAddToCart);
  };

  return (
    <Wrapper>
      <Image src="https://res.kurly.com/kurly/ico/2021/gift_cancel_68_68_gray.svg" alt="" />
      <Title>주문 취소가 완료되었습니다.</Title>
      <Description>
        결제수단에 따라 3~7일 후 <br />
        취소금액 확인이 가능합니다.
      </Description>
      {isAddBackToCart && (
        <Button
          theme="secondary"
          text="취소 상품 다시 담기"
          width={164}
          height={44}
          radius={22}
          css={styles.button}
          onClick={handleCartPutAgain}
          isSubmitLoading={isLoading}
        />
      )}
      <Button css={styles.goHomeButton} text="홈으로 이동" onClick={moveHome} />
    </Wrapper>
  );
}
