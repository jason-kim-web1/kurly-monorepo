import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../../../shared/store';

import useReAddCartItems from '../../../shared/hooks/useReAddCartItems';

import { USER_MENU_PATH } from '../../../../../shared/constant';
import COLOR from '../../../../../shared/constant/colorset';

import Button from '../../../../../shared/components/Button/Button';
import ButtonGroup from '../../../../../shared/components/Button/ButtonGroup';
import { redirectTo } from '../../../../../shared/reducers/page';

const Wrapper = styled.div<{ height: number }>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  height: ${({ height }) => (height === 0 ? '100vh' : `${height - 104}px`)};
`;

const Image = styled.img`
  display: block;
  width: 68px;
  height: 68px;
  margin: 0 auto 8px;
`;

const Title = styled.strong`
  display: block;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: normal;
  color: ${COLOR.kurlyGray600};
`;

const Description = styled.p`
  padding: 0 20px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${COLOR.kurlyGray400};
`;

const styles = {
  button: {
    margin: '24px auto 0',
    span: {
      fontWeight: 600,
    },
  },
  buttonGroup: {
    span: {
      fontWeight: 600,
    },
  },
};

export default function CancelSuccessContainer() {
  const { addCart, isLoading } = useReAddCartItems();
  const { productsToReAddToCart, isAddBackToCart } = useAppSelector(({ mypageCancel }) => ({
    productsToReAddToCart: mypageCancel.productsToReAddToCart,
    isAddBackToCart: mypageCancel.isAddBackToCart,
  }));

  const dispatch = useDispatch();

  const [height, setHeight] = useState(0);

  const handleCartPutAgain = () => {
    addCart(productsToReAddToCart);
  };

  const moveHome = () => {
    dispatch(
      redirectTo({
        url: USER_MENU_PATH.home.uri,
      }),
    );
  };

  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Wrapper height={height}>
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
      <ButtonGroup
        css={styles.buttonGroup}
        isFixed
        contents={[
          {
            text: '홈으로 이동',
            height: 52,
            onClick: moveHome,
          },
        ]}
      />
    </Wrapper>
  );
}
