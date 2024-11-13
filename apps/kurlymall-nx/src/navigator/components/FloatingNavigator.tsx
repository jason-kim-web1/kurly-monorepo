import { useMemo } from 'react';

import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { useRouter } from 'next/router';

import Link from 'next/link';

import COLOR from '../../shared/constant/colorset';
import { GUIDE_PATH, MEMBER_BENEFIT_PATH, PRODUCT_PATH, USER_MENU_PATH } from '../../shared/constant';
import {
  DELIVERY_BANNER,
  DELIVERY_SEARCH_ALTERNATIVE_TEXT,
  MAXIMUM_LIST_HEIGHT,
  THUMBNAIL_WIDTH,
} from '../shared/constants';
import useFloatingNavigator from '../shared/hooks/useFloatingNavigator';
import { ArrowUp, ArrowDown } from '../../shared/icons';

import NextImage from '../../shared/components/NextImage';
import NextLink from '../../shared/components/NextLink';
import { CURATOR_PROGRAM_LINK, RECIPE_LINK } from '../../shared/configs/config';

const Wrapper = styled.div<{
  isMain: boolean;
  centerAlignMargin: number;
  isFooter: boolean;
}>`
  position: absolute;
  top: ${({ isMain }) => (isMain ? 516 : 70)}px;
  right: 20px;
  bottom: ${({ centerAlignMargin, isFooter }) => (centerAlignMargin && isFooter ? -centerAlignMargin : 0)}px;
  z-index: 1;
  margin-top: ${({ centerAlignMargin }) => (centerAlignMargin ? centerAlignMargin : 0)}px;
`;

const Navigator = styled.div`
  position: sticky;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray800};
  letter-spacing: -0.3px;

  @media (max-width: 1250px) {
    display: none;
  }
`;

const DeliveryInfoBanner = styled.div`
  height: 120px;
  margin-bottom: 7px;
  cursor: pointer;
`;

const NavigatorMenu = styled.div`
  width: 80px;
  border: 1px solid ${COLOR.lightGray};
  border-bottom: 0;
  background-color: ${COLOR.kurlyWhite};
`;

const NavigatorMenuItem = styled.div`
  height: 29px;
  padding-top: 5px;
  text-align: center;
  color: ${COLOR.lightGray};
  border-bottom: 1px solid ${COLOR.lightGray};
  cursor: pointer;
`;

const Text = styled.span`
  color: ${COLOR.kurlyGray800};
`;

const RecentProducts = styled.div`
  margin-top: 8px;
  border: 1px solid ${COLOR.lightGray};
  background-color: ${COLOR.kurlyWhite};
  text-align: center;
  font-weight: 500;
`;

const ProductArea = styled.div`
  max-height: ${MAXIMUM_LIST_HEIGHT}px;
  overflow: hidden;
  margin-top: 6px;
`;

const ProductList = styled.ul<{ top: number }>`
  position: relative;
  top: -${({ top }) => top}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: top 0.2s;
`;

const ProductLink = styled.a`
  display: block;
  height: 80px;
  margin: 2px 0;
`;

const ArrowButton = styled.button`
  width: 100%;
`;

interface Props {
  isFooter?: boolean;
}

export default function FloatingNavigator({ isFooter = true }: Props) {
  const { pathname } = useRouter();
  const isMain = useMemo(() => pathname.includes(USER_MENU_PATH.home.uri), [pathname]);
  const {
    positionValue,
    recentProducts,
    disabledPrevButton,
    disabledNextButton,
    handleClickButton,
    getCenterAlignMargin,
  } = useFloatingNavigator();

  return (
    <Wrapper isMain={isMain} centerAlignMargin={getCenterAlignMargin()} isFooter={isFooter}>
      <Navigator>
        <DeliveryInfoBanner>
          <NextLink href={GUIDE_PATH.deliveryGuide.uri}>
            <NextImage src={DELIVERY_BANNER} alt={DELIVERY_SEARCH_ALTERNATIVE_TEXT} width={80} height={120} />
          </NextLink>
        </DeliveryInfoBanner>
        <NavigatorMenu>
          <NextLink href={MEMBER_BENEFIT_PATH.vip.uri}>
            <NavigatorMenuItem>
              <Text>컬리 고객 제도</Text>
            </NavigatorMenuItem>
          </NextLink>
          <NextLink href={CURATOR_PROGRAM_LINK} passHref>
            <a href={CURATOR_PROGRAM_LINK} target="_blank" rel="noreferrer">
              <NavigatorMenuItem>
                <Text>컬리 큐레이터</Text>
              </NavigatorMenuItem>
            </a>
          </NextLink>
          <NextLink href={RECIPE_LINK} passHref>
            <a href={RECIPE_LINK} target="_blank" rel="noreferrer">
              <NavigatorMenuItem>
                <Text>레시피</Text>
              </NavigatorMenuItem>
            </a>
          </NextLink>
        </NavigatorMenu>
        {!isEmpty(recentProducts) && (
          <RecentProducts>
            <ArrowButton type="button" onClick={handleClickButton('prev')} disabled={disabledPrevButton}>
              <ArrowUp
                width={20}
                height={20}
                strokeWidth={1.3}
                stroke={disabledPrevButton ? COLOR.lightGray : COLOR.kurlyGray600}
              />
            </ArrowButton>
            최근 본 상품
            <ProductArea>
              <ProductList top={positionValue}>
                {recentProducts.map(({ no, thumb }) => (
                  <li key={`recent-product-${no}`}>
                    <Link href={`${PRODUCT_PATH.detail.uri}/${no}`} passHref prefetch={false}>
                      <ProductLink href={`${PRODUCT_PATH.detail.uri}/${no}`}>
                        <NextImage
                          src={thumb}
                          alt={`recent-product-${no}`}
                          width={THUMBNAIL_WIDTH}
                          height={80}
                          objectFit={'cover'}
                        />
                      </ProductLink>
                    </Link>
                  </li>
                ))}
              </ProductList>
            </ProductArea>
            <ArrowButton type="button" onClick={handleClickButton('next')} disabled={disabledNextButton}>
              <ArrowDown
                width={20}
                height={20}
                strokeWidth={1.3}
                stroke={disabledNextButton ? COLOR.lightGray : COLOR.kurlyGray600}
              />
            </ArrowButton>
          </RecentProducts>
        )}
      </Navigator>
    </Wrapper>
  );
}
