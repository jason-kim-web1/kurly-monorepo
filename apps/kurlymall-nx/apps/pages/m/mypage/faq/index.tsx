import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import FaqCategoryContainer from '../../../../src/mypage/faq/container/FaqCategoryContainer';
import FaqsContainer from '../../../../src/mypage/faq/container/FaqsContainer';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import CloseButton from '../../../../src/shared/components/Button/CloseButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import { useScreenName, useWebview } from '../../../../src/shared/hooks';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../../src/shared/services/app.service';
import { ScreenName } from '../../../../src/shared/amplitude';

const Container = styled.div({
  padding: '10px 20px 0 20px',
});

export default function FQA() {
  useScreenName(ScreenName.FREQUENTLY_ASK_QUESTION);

  const router = useRouter();
  const webview = useWebview();

  const handleClickCloseButton = () => router.back();

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('자주하는 질문');
    }
  }, []);

  return (
    <>
      {!webview && (
        <MobileHeader visibleBanner={false}>
          <HeaderButtons position="left">
            <CloseButton onClick={handleClickCloseButton} />
          </HeaderButtons>
          <HeaderTitle>자주하는 질문</HeaderTitle>
        </MobileHeader>
      )}
      <Container>
        <FaqCategoryContainer />
      </Container>
      <FaqsContainer />
    </>
  );
}
