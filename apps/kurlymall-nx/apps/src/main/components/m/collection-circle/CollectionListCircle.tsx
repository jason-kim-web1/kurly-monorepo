import { isEmpty } from 'lodash';

import styled from '@emotion/styled';

import type { GroupCollectionCircleProduct, MainSite } from '../../../interfaces/MainSection.interface';
import type { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import { MobileLink } from '../../../../shared/components/Link/MobileLink';
import { multiMaxLineText } from '../../../../shared/utils';
import { NoProductImageLogo } from '../../../../shared/images';
import { createCollectionGroupsUrl } from '../../../util/mainSiteUtil';
import COLOR from '../../../../shared/constant/colorset';
import { productCardImageWrapper } from '../../../../shared/styles/product-card-image-style';
import NextImage from '../../../../shared/components/NextImage';

const Container = styled.div`
  display: flex;
  position: relative;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const CollectionItem = styled.a`
  flex-shrink: 0;
  width: 19vw;
  min-width: 75px;
  min-height: 120px;
  margin-left: 12px;
  cursor: pointer;

  :first-of-type {
    margin-left: 16px;
  }

  :last-of-type {
    width: calc(19vw + 16px);
    padding-right: 16px;
  }
`;

const Thumb = styled.div`
  ${productCardImageWrapper('100%')};
  border-radius: 100%;

  :after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 19vw;
    min-width: 75px;
    height: 100%;
    border-radius: 100%;
    border: 1px solid ${COLOR.kurlyGray800};
    opacity: 0.05;
  }
`;

const Name = styled.p`
  padding-top: 7px;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${COLOR.benefitGray};
  ${multiMaxLineText(2)};
`;

interface Props {
  site: MainSite;
  collectionCode: string;
  collections: GroupCollectionCircleProduct[];

  selectProduct(selectProduct: ProductMainSelectData): void;
}

export default function CollectionListCircle({ site, collectionCode, collections, selectProduct }: Props) {
  if (isEmpty(collections)) {
    return null;
  }

  return (
    <Container>
      {collections.map(({ code, thumbnailImageUrl, collectionThumbnailMobileUrl, name }, index) => (
        <MobileLink url={createCollectionGroupsUrl(site, collectionCode, code)} key={code} passHref>
          <CollectionItem
            href={createCollectionGroupsUrl(site, collectionCode, code)}
            onClick={() =>
              selectProduct({
                type: 'collection',
                index,
                productNo: code,
              })
            }
          >
            <Thumb>
              <NextImage
                src={
                  collectionThumbnailMobileUrl || thumbnailImageUrl
                    ? collectionThumbnailMobileUrl || thumbnailImageUrl
                    : NoProductImageLogo
                }
                layout="fill"
                objectFit="cover"
                alt="브랜드 이미지"
              />
            </Thumb>
            <Name>{name}</Name>
          </CollectionItem>
        </MobileLink>
      ))}
    </Container>
  );
}
