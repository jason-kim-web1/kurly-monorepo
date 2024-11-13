import { useEffect } from 'react';

import { eq, isEmpty } from 'lodash';

import { KAKAO_SHARE_KEY } from '../../../shared/configs/config';

import { useAppSelector } from '../../../shared/store';

import { SNSType } from '../types';

import Alert from '../../../shared/components/Alert/Alert';
import { amplitudeService, ScreenName } from '../../../shared/amplitude';
import { ShareProduct } from '../../../shared/amplitude/events/product/ShareProduct';
import { branchService } from '../../../shared/branch';
import { Share } from '../../../shared/branch/events';
import { SHARABLE_SNS_LIST, SNS_TYPE_NAME } from '../../../shared/constant/sns';
import { getFusionQueryId } from '../shared/utils/productDetailEvent';

const createTitleText = (title: string) => {
  const SUFFIX = ', 마켓컬리에서 확인해보세요!';
  return `${title}${SUFFIX}`;
};

interface GetShareEncodedData {
  title: string;
  productUrl: string;
}

const findShareSNSUrl = (sns: SNSType, { title, productUrl }: GetShareEncodedData) => {
  const foundShareSNS = SHARABLE_SNS_LIST.find((sharableSNS) => eq(sharableSNS.value, sns));
  if (!foundShareSNS || isEmpty(foundShareSNS)) {
    return '';
  }

  return foundShareSNS.getRedirectUrl(title, productUrl);
};

const getEncodedShareData = ({ title, productUrl }: GetShareEncodedData) => ({
  title: encodeURIComponent(title),
  productUrl: encodeURIComponent(productUrl),
});

export const initShareProductData = {
  no: 0,
  title: '',
  description: '',
  horizontalImageUrl: '',
  verticalImageUrl: '',
  imageWidth: 0,
  imageHeight: 0,
  productUrl: '',
  buttonTitle: '',
};

export interface ShareProductData {
  no: number;
  title: string;
  description: string;
  horizontalImageUrl: string;
  verticalImageUrl: string;
  imageWidth: number;
  imageHeight: number;
  productUrl: string;
  buttonTitle: string;
}

export default function useShareProduct(shareProductData: ShareProductData) {
  const queryId = useAppSelector(({ productList }) => productList.queryId);
  const productDetailState = useAppSelector(({ productDetail }) => productDetail);

  const { no, title, productUrl, horizontalImageUrl, imageWidth, imageHeight, buttonTitle } = shareProductData;

  const logSharedSNS = (sns: SNSType) => {
    branchService.logEvent(
      new Share(
        {
          description: 'PRODUCT',
        },
        [
          {
            $canonical_identifier: `product/${no}`,
            $sku: no,
            $product_name: title,
          },
        ],
      ),
    );
    amplitudeService.logEvent(
      new ShareProduct({
        productDetailState,
        message: createTitleText(title),
        channel: SNS_TYPE_NAME[sns],
        fusionQueryId: getFusionQueryId(queryId),
      }),
    );
  };

  const handleShareKakao = () => {
    const kakao = window.Kakao;

    if (!kakao) {
      Alert({ text: '현재 카카오톡 공유하기를 사용할 수 없습니다.' });
      return;
    }

    if (!kakao.isInitialized()) {
      kakao.init(KAKAO_SHARE_KEY);
    }

    logSharedSNS('kakao');

    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        imageUrl: horizontalImageUrl,
        imageWidth: imageWidth,
        imageHeight: imageHeight,
        link: {
          mobileWebUrl: productUrl,
          webUrl: productUrl,
        },
      },
      buttons: [
        {
          title: buttonTitle,
          link: {
            mobileWebUrl: productUrl,
            webUrl: productUrl,
          },
        },
      ],
      installTalk: true,
    });
  };

  const handleShareSNS = (sns: SNSType) => {
    if (sns === 'kakao') {
      handleShareKakao();
      return;
    }

    logSharedSNS(sns);
    const shareUrl = findShareSNSUrl(sns, getEncodedShareData({ title: createTitleText(title), productUrl }));
    window.open(shareUrl, '_blank');
  };

  useEffect(() => {
    amplitudeService.setScreenName(ScreenName.SHARE);
  }, []);

  return { handleShareSNS };
}
