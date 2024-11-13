import { useEffect } from 'react';
import { get } from 'lodash';

import { useRouter } from 'next/router';

import HeaderButtons from '../../../shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../shared/components/layouts/MobileHeader';
import useMobileWebHeaderButton from '../../../header/hooks/useMobileWebHeaderButton';
import appService from '../../../shared/services/app.service';
import { isPC } from '../../../../util/window/getDevice';
import { useWebview } from '../../../shared/hooks';
import { DEFAULT_KEYWORDS } from '../../../shared/constant/page-meta';
import PageMetaData from '../../../shared/components/PageMeta/PageMetaData';
import { KURLY_URL } from '../../../shared/configs/config';
import { EVENT_PATH } from '../../../shared/constant';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectBackButton } from '../../../shared/amplitude/events/event';
import { ignoreError } from '../../../shared/utils/general';
import type { ShowcaseMetaProps } from '../types/reponse';

const pageTitle = '쇼케이스';
const pageDescription = '컬리가 선정한 쇼케이스 상품들을 만나보세요.';

interface Props {
  meta: ShowcaseMetaProps;
}

const ShowcaseHeader = ({ meta }: Props) => {
  const webview = useWebview();
  const router = useRouter();
  const { renderLeftButton } = useMobileWebHeaderButton({
    leftButtonType: 'back',
    onClickLeftButton: () => {
      ignoreError(() => amplitudeService.logEvent(new SelectBackButton()));
      router.back();
    },
  });
  const metaTitle = get(meta, 'title', pageTitle);
  const metaDescription = get(meta, 'description', pageDescription);
  const metaImage = get(meta, 'image');
  const metaUrl = get(meta, 'url', `${KURLY_URL}${EVENT_PATH.showcase}`);

  useEffect(() => {
    if (webview) {
      appService.changeTitle(metaTitle);
    }
  }, [metaTitle, webview]);

  if (isPC || webview) {
    return null;
  }

  return (
    <>
      <PageMetaData
        title={metaTitle}
        description={metaDescription}
        image={metaImage}
        url={metaUrl}
        keyword={DEFAULT_KEYWORDS}
      />
      <MobileHeader visibleBanner={false}>
        <HeaderButtons position="left">{renderLeftButton()}</HeaderButtons>
        <HeaderTitle>{metaTitle}</HeaderTitle>
      </MobileHeader>
    </>
  );
};

export { ShowcaseHeader };
