import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { useWebview } from '../../../shared/hooks';

import deepLinkUrl from '../../../shared/constant/deepLink';
import { getPageUrl, PRODUCT_PATH } from '../../../shared/constant';
import { KURLY_PASS_CONTENTS_NUMBER } from '../../../shared/constant/kurlyPass';
import { CurrentKurlyPass, KurlyPassStatusType } from '../../../shared/interfaces/KurlyPass';

import ButtonGroup from '../../../shared/components/Button/ButtonGroup';
import Information from '../components/Information';
import { ButtonProps } from '../../../shared/components/Button/Button';
import BillingInfo from '../../shared/components/BillingInfo';
import { redirectTo } from '../../../shared/reducers/page';

const Wrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  padding-bottom: 64px;
  box-sizing: border-box;
`;

const ButtonStyle = css`
  padding: 0 12px 12px;
`;

const message: Record<KurlyPassStatusType, string> = {
  Y: '궁금하신 점은 자세히 보기 또는 1:1 문의를 이용해주세요.',
  N: '컬리패스는 언제든지 재구매 가능합니다. 문의 또는 피드백은 1:1 문의에 남겨주세요.',
  P: '궁금하신 점은 자세히 보기 또는 1:1 문의를 이용해주세요.',
};

export default function KurlyPassProductsContainer({ currentKurlyPass }: { currentKurlyPass?: CurrentKurlyPass }) {
  const dispatch = useDispatch();
  const webview = useWebview();

  const moveKurlyPass = () => {
    const productUrl = webview
      ? `${deepLinkUrl.PRODUCT}${KURLY_PASS_CONTENTS_NUMBER}`
      : `${getPageUrl(PRODUCT_PATH.detail)}/${KURLY_PASS_CONTENTS_NUMBER}`;

    dispatch(
      redirectTo({
        url: productUrl,
      }),
    );
  };

  const buyKurlyPass: ButtonProps = {
    text: currentKurlyPass?.status === 'N' ? '컬리패스 구매하기' : '자세히 보기',
    height: 56,
    onClick: moveKurlyPass,
  };

  return (
    <Wrapper>
      <BillingInfo currentKurlyPass={currentKurlyPass} isPC={false} />
      <Information message={message[currentKurlyPass?.status ?? 'Y']} />
      <ButtonGroup isFixed contents={[buyKurlyPass]} css={ButtonStyle} />
    </Wrapper>
  );
}
