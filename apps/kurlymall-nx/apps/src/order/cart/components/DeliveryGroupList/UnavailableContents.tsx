import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { CartProduct } from '../../interface/CartProduct';
import ItemTitle from '../CartItems/ItemTitle';
import TagList from '../CartItems/TagList';

import ItemMessage from '../CartItems/ItemMessage';
import ItemImage from '../CartItems/ItemImage';
import useUnavailableCartItem from '../../hooks/useUnavailableCartItem';
import StorageTag from '../CartItems/StorageTag';
import Tags from '../CartItems/Tags';

const Wrapper = styled.div`
  padding: ${vars.spacing.$6} ${vars.spacing.$0} ${vars.spacing.$16} ${vars.spacing.$0};
  display: flex;
`;

interface Props {
  product: CartProduct;
}

export default function UnavailableContents({ product }: Props) {
  const { title, subTitle, reason, buyableTarget, notPurchasable, detailUrl } = useUnavailableCartItem(product);

  const { productVerticalSmallUrl, tagNames, storageType, isKurlyFulfillment } = product;

  return (
    <Wrapper>
      <ItemImage imageUrl={productVerticalSmallUrl} detailUrl={detailUrl} disable />
      <div>
        <ItemTitle disable={notPurchasable} title={title} subTitle={subTitle} detailUrl={detailUrl} />
        <TagList>
          {isKurlyFulfillment && <StorageTag storageType={storageType} />}
          <Tags tagNames={tagNames} />
        </TagList>
        <ItemMessage soldOutText={reason} buyableTarget={buyableTarget} />
      </div>
    </Wrapper>
  );
}
