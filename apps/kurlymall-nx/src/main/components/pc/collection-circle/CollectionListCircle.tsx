import { isEmpty } from 'lodash';
import styled from '@emotion/styled';
import Link from 'next/link';

import type { GroupCollectionCircleProduct, MainSite } from '../../../interfaces/MainSection.interface';
import type { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import { listCircleSlidePerView } from '../constant';
import { multiMaxLineText } from '../../../../shared/utils';
import { NoProductImageLogo } from '../../../../shared/images';
import { createCollectionGroupsUrl } from '../../../util/mainSiteUtil';
import COLOR from '../../../../shared/constant/colorset';
import ListSwiper from '../list/ListSwiper';
import NextImage from '../../../../shared/components/NextImage';

const CollectionItem = styled.a`
  display: block;
  position: relative;
  width: 129px;
  padding-top: 5px;
  cursor: pointer;

  :after {
    content: '';
    position: absolute;
    left: 0;
    top: 5px;
    width: 129px;
    height: 129px;
    border-radius: 100%;
    border: 1px solid ${COLOR.kurlyGray800};
    opacity: 0.05;
    transition: all 0.5s ease-in-out;
  }

  :hover {
    &:after {
      transform: scale(1.02);
      transition: all 0.3s ease-in-out;
    }

    img {
      transform: scale(1.02);
      transition: all 0.3s ease-in-out;
    }
  }

  > span {
    overflow: visible !important;
  }
`;

const Img = styled(NextImage)`
  overflow: hidden;
  border-radius: 100%;
  transition: all 0.5s ease-in-out;
`;

const Name = styled.p`
  padding: 10px 0 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  ${multiMaxLineText(2)};
`;

interface Props {
  site: MainSite;
  collectionCode: string;
  collections: GroupCollectionCircleProduct[];
  selectProduct(selectProduct: ProductMainSelectData): void;
  selectMore(): void;
}

export default function CollectionListCircle({ site, collectionCode, collections, selectProduct, selectMore }: Props) {
  if (isEmpty(collections)) {
    return null;
  }

  const items = collections.map(({ code, thumbnailImageUrl, collectionThumbnailPcUrl, name }, index) => (
    <Link href={createCollectionGroupsUrl(site, collectionCode, code)} key={code} passHref prefetch={false}>
      <CollectionItem
        href={createCollectionGroupsUrl(site, collectionCode, code)}
        onClick={() => selectProduct({ type: 'collection', index, productNo: code })}
      >
        <Img
          src={
            collectionThumbnailPcUrl || thumbnailImageUrl
              ? collectionThumbnailPcUrl || thumbnailImageUrl
              : NoProductImageLogo
          }
          width={129}
          height={129}
          objectFit="cover"
          alt="브랜드 이미지"
        />
        <Name>{name}</Name>
      </CollectionItem>
    </Link>
  ));

  return (
    <ListSwiper
      items={items}
      itemCount={items.length}
      slidesPerView={listCircleSlidePerView}
      buttonOffset={6}
      className="circleType"
      spaceBetween={36}
      handleSelectMore={selectMore}
    />
  );
}
