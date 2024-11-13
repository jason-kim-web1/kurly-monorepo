import { Button, Typography } from '@thefarmersfront/kpds-react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import useRecommendProductButton from '../../hooks/useRecommendProductButton';
import { CartProduct } from '../../interface/CartProduct';
import { RecommendProductList } from '../../interface/RecommendProduct';

const Wrapper = styled.div`
  word-break: keep-all;
  flex-shrink: 0;

  button {
    width: 73px;
  }
  svg {
    margin-right: ${vars.spacing.$4};
    flex-shrink: 0;
  }
`;

const ButtonValue = styled(Typography)`
  display: flex;
`;

export interface RecommendProductButtonProps {
  product: RecommendProductList;
  addToCart: (product: RecommendProductList) => Promise<void>;
  availableProducts: CartProduct[];
}

export default function RecommendProductButton(params: RecommendProductButtonProps) {
  const { isInCart, handleClickAddToCart, buttonValue } = useRecommendProductButton(params);

  return (
    <Wrapper>
      <Button
        _type={'secondary'}
        color={'light'}
        size={'small'}
        _style={'stroke'}
        onClick={handleClickAddToCart}
        disabled={isInCart}
      >
        <ButtonValue variant={'$largeRegular'} as={'span'}>
          {buttonValue}
        </ButtonValue>
      </Button>
    </Wrapper>
  );
}
