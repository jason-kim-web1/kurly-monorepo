import styled from '@emotion/styled';

import { useState } from 'react';

import { useRouter } from 'next/router';

import { eq } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';
import SNSButton from '../components/ATF/share/SNSButton';
import useShareProduct, { initShareProductData, ShareProductData } from '../../hooks/useShareProduct';
import Alert from '../../../../shared/components/Alert/Alert';
import { branchService } from '../../../../shared/branch';
import { Share } from '../../../../shared/branch/events';
import { amplitudeService } from '../../../../shared/amplitude';
import { ShareProduct } from '../../../../shared/amplitude/events/product/ShareProduct';
import { useAppSelector } from '../../../../shared/store';
import { getFusionQueryId } from '../../shared/utils/productDetailEvent';
import { KURLY_URL, RESOURCE_URL } from '../../../../shared/configs/config';
import useShareProductData from '../../hooks/useShareProductData';
import { SHARABLE_SNS_LIST } from '../../../../shared/constant/sns';
import { SNSType } from '../../types';

const Container = styled.div`
  position: absolute;
  right: -5px;
  top: 0;
  width: 238px;
  height: 120px;
  box-shadow: 0 0 20px 0 ${COLOR.shadowGray};
  background-color: ${COLOR.kurlyWhite};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: -10px;
    width: 100%;
    height: 10px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 207px;
    top: -4px;
    width: 12px;
    height: 12px;
    background-color: ${COLOR.kurlyWhite};
    transform: rotate(45deg);
  }
`;

const ShareItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0 0 21px;
`;

export const ShareItemWrapper = styled.li`
  display: flex;
  width: 113px;

  &:nth-of-type(2) {
    width: 99px;
  }

  &:last-of-type {
    width: 100%;
    padding-top: 20px;
  }
`;

const URLInput = styled.input`
  width: 113px;
  height: 30px;
  padding: 7px 0 6px 3px;
  border: none;
  background-color: ${COLOR.btnGray};
  font-size: 11px;
  color: ${COLOR.kurlyGray600};
  letter-spacing: -0.5px;
`;

const LinkCopyButton = styled.button`
  width: 84px;
  height: 30px;
  border: 1px solid ${COLOR.kurlyPurple};
  font-size: 12px;
  color: ${COLOR.kurlyPurple};
  line-height: 28px;
  letter-spacing: -0.5px;
`;

const UrlCheckedImage = styled.img`
  width: 10px;
  height: 9px;
  margin: 10px 0 0 5px;
  vertical-align: top;
`;

const getSNSShareName = (sns: SNSType) => {
  if (eq(sns, 'twitter')) {
    return '트윗하기';
  }

  if (eq(sns, 'facebook')) {
    return '공유하기';
  }

  return '';
};

export default function ShareContainer() {
  const { queryId } = useAppSelector(({ productList }) => productList);
  const productDetailState = useAppSelector(({ productDetail }) => productDetail);
  const { data: shareProductData, isLoading } = useShareProductData(productDetailState.no);
  const { handleShareSNS } = useShareProduct(shareProductData ?? initShareProductData);
  const [isUrlClipboardCopied, setIsUrlClipboardCopied] = useState(false);

  const { asPath } = useRouter();
  const contentUrl = `${KURLY_URL}${asPath}`;

  const handleClickLinkCopy = (data: ShareProductData) => {
    if (!data) {
      return;
    }

    if (!navigator.clipboard) {
      Alert({
        text: 'URL을 복사할 수 없습니다.\n브라우저를 재실행해보시겠어요?',
      });
      return;
    }

    navigator.clipboard.writeText(contentUrl).then(() => {
      branchService.logEvent(
        new Share(
          {
            description: 'PRODUCT',
          },
          [
            {
              $canonical_identifier: `product/${data.no}`,
              $sku: data.no,
              $product_name: data.title,
            },
          ],
        ),
      );

      amplitudeService.logEvent(
        new ShareProduct({
          productDetailState,
          message: 'URL이 클립보드에 복사되었습니다.',
          channel: '링크복사',
          fusionQueryId: getFusionQueryId(queryId),
        }),
      );

      Alert({
        text: 'URL이 클립보드에 복사되었습니다.',
      });
      setIsUrlClipboardCopied(true);
    });
  };

  const pcSharableSNSList = SHARABLE_SNS_LIST.filter((sns) => sns.value === 'twitter' || sns.value === 'facebook');

  if (!shareProductData || isLoading) {
    return null;
  }

  return (
    <Container>
      <ShareItemList>
        {pcSharableSNSList.map(({ value, image }) => (
          <SNSButton
            key={value}
            name={getSNSShareName(value)}
            value={value}
            imageUrl={image}
            onClick={() => handleShareSNS(value)}
          />
        ))}
        <ShareItemWrapper>
          <URLInput readOnly type="text" value={contentUrl} />
          <LinkCopyButton onClick={() => handleClickLinkCopy(shareProductData)}>
            URL 복사
            {isUrlClipboardCopied && (
              <UrlCheckedImage
                src={`${RESOURCE_URL}/mobile/service/goodsview/1804/ico_checked_x2.png`}
                alt="URL 복사 아이콘"
              />
            )}
          </LinkCopyButton>
        </ShareItemWrapper>
      </ShareItemList>
    </Container>
  );
}
