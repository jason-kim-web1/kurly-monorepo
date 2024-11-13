import styled from '@emotion/styled';

import { useEffect } from 'react';

import COLOR from '../../../../../shared/constant/colorset';

import { multiMaxLineText } from '../../../../../shared/utils';
import useShareProduct, { initShareProductData } from '../../../hooks/useShareProduct';
import useShareProductData from '../../../hooks/useShareProductData';
import Alert from '../../../../../shared/components/Alert/Alert';
import { SHARABLE_SNS_LIST } from '../../../../../shared/constant/sns';

const ProductImageBackground = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 288px;
  background: url(${({ imageUrl }) => imageUrl}) no-repeat 50% 50%;
  background-size: cover;
`;

const ProductImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ProductImage = styled.div<{ imageUrl: string }>`
  width: 256px;
  height: 166px;
  background: url(${({ imageUrl }) => imageUrl}) no-repeat 50% 50%;
  background-size: cover;
`;

const ProductName = styled.h3`
  width: 256px;
  padding-top: 17px;
  font-weight: 600;
  font-size: 16px;
  color: ${COLOR.kurlyWhite};
  line-height: 24px;
  ${multiMaxLineText(2)}
`;

const CloseButton = styled.button`
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 44px;
  height: 44px;
  border: none;
  background: url(https://res.kurly.com/mobile/service/goodsview/1804/btn_close_44x44.png) no-repeat 50% 50%;
  background-size: 44px 44px;
`;

const ShareItemList = styled.ul`
  padding: 0 10px 20px;
`;

const Button = styled.button<{ thumbUrl: string }>`
  display: flex;
  width: 100%;
  padding: 20px 0 20px 10px;
  border: none;
  border-bottom: 1px solid ${COLOR.kurlyGray250};

  &:before {
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    background: url(${(props) => props.thumbUrl}) no-repeat 50% 50%;
    background-size: 30px 30px;
  }

  > span {
    display: block;
    padding: 5px 0 0 20px;
    font-weight: 600;
    font-size: 16px;
    color: ${COLOR.kurlyGray800};
    line-height: 20px;
  }
`;

interface Props {
  contentsProductNo: number;
  onDismiss(): void;
}

export default function ShareModal({ contentsProductNo, onDismiss }: Props) {
  const { data: shareProductData, isLoading, isInitialLoading } = useShareProductData(contentsProductNo);
  const { handleShareSNS } = useShareProduct(shareProductData ?? initShareProductData);

  useEffect(() => {
    if (shareProductData || isInitialLoading) {
      return;
    }

    (() => {
      onDismiss();
      Alert({ text: '공유하기 상품정보를 불러올 수 없습니다' });
    })();
  }, [isInitialLoading, onDismiss, shareProductData]);

  if (!shareProductData || isLoading) {
    return null;
  }

  const { title, productHorizontalLargeUrl } = shareProductData;

  return (
    <>
      <CloseButton type="button" onClick={onDismiss} />
      <ProductImageBackground imageUrl={productHorizontalLargeUrl}>
        <ProductImageWrapper>
          <ProductImage imageUrl={productHorizontalLargeUrl} />
          <ProductName>{title}</ProductName>
        </ProductImageWrapper>
      </ProductImageBackground>
      <ShareItemList>
        {SHARABLE_SNS_LIST.map(({ name, value, image }) => (
          <li key={value}>
            <Button thumbUrl={image} onClick={() => handleShareSNS(value)}>
              <span>{name}</span>
            </Button>
          </li>
        ))}
      </ShareItemList>
    </>
  );
}
