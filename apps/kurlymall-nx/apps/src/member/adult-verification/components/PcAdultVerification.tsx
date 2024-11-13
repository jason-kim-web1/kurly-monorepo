import { useDispatch } from 'react-redux';

import { isBefore, parseISO } from 'date-fns';

import { useEffect } from 'react';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import AgreeContents from './AgreeContents';
import AdultNotice from './AdultNotice';

import { Arrow10x7c979797, AuthMobile, CloseIconImg32Color999, NineteenPc } from '../../../shared/images';
import Checkbox from '../../../shared/components/Input/Checkbox';
import Button from '../../../shared/components/Button/Button';
import getUserMetadata from '../services/getUserMetadata';
import Alert from '../../../shared/components/Alert/Alert';
import { AdultVerificationResult, VerificationData } from '../AdultVerificationContainer';
import { KURLY_URL } from '../../../shared/configs/config';
import Header from '../../../header/components/Header';
import Footer from '../../../footer/components/Footer';
import { isGoBackLocation } from '../services/isGoBackLocation';
import { removeAdultVerificationData } from '../services/adult-verificaiton-data-storage';
import { redirectTo } from '../../../shared/reducers/page';
import { zIndex } from '../../../shared/styles';
import COLOR from '../../../shared/constant/colorset';

const Content = styled.div`
  min-width: 1050px;
  padding: 50px 0;
  background-color: white;
`;

const BgLayer = styled.div`
  position: fixed;
  z-index: ${zIndex.layerAdultVerification};
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${COLOR.kurlyBlack};
  opacity: 0.4;
`;

const ContentArea = styled.div`
  margin: auto;
  max-width: 400px;
  min-height: 200px;
  padding: 0 10px 6px 10px;
  position: relative;
  background-color: ${COLOR.kurlyWhite};
`;

const NoticeAdult = styled.div`
  position: fixed;
  z-index: ${zIndex.layerAdultVerification};
  left: 50%;
  top: 50%;
  width: 440px;
  height: 614px;
  padding: 30px 30px 30px;
  border-radius: 12px;
  background-color: ${COLOR.kurlyWhite};
  text-align: center;
  transform: translate(-50%, -50%);
`;

const Title = styled.div`
  height: 50px;
  padding-top: 2px;
  font-weight: 500;
  font-size: 24px;
  text-align: left;
`;

const AdultIcon = styled.span`
  display: block;
  width: 70px;
  height: 70px;
  margin: 0 auto;
  background: url('${NineteenPc}') no-repeat 50% 50%;
  background-size: 70px 70px;
`;

const AdultTitle = styled.h2`
  padding-top: 16px;
  font-size: 18px;
  color: ${COLOR.kurlyGray800};
  line-height: 26px;
`;

const Emph = styled.span`
  color: ${COLOR.invalidRed};
`;

const AdultDesc = styled.p`
  padding: 6px 0 40px;
  font-size: 14px;
  color: ${COLOR.kurlyGray500};
  line-height: 20px;
`;

const NoticeScroll = styled.div`
  overflow: hidden;
  width: 380px;
`;

const NoticeScrollInner = styled.div`
  overflow-y: scroll;
  width: 410px;
  height: 421px;
  padding-top: 40px;
`;
const NoticeScrollIn = styled.div`
  width: 380px;
`;

const Agree = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-top: 1px solid ${COLOR.kurlyGray200};
  padding: 1px 0 9px;
`;

const AgreeView = styled.button`
  position: relative;
  padding: 18px 14px 0 0;
  font-size: 13px;
  color: ${COLOR.kurlyGray450};
  line-height: 18px;
`;

const AgreeViewArrow = styled.span<{ agreeTerms: boolean }>`
  position: absolute;
  right: 0;
  top: 23px;
  width: 10px;
  height: 7px;
  background: url(${Arrow10x7c979797}) no-repeat 50% 50%;
  background-size: 10px 7px;
  transform: ${(props) => (props.agreeTerms ? 'rotate(180deg)' : 'rotate(0)')};
`;

const checkbox = css`
  font-size: 14px;
`;

const WrapButton = styled.div`
  padding-top: 27px;
`;

const CloseButton = styled.button`
  overflow: hidden;
  position: absolute;
  right: 24px;
  top: 30px;
  width: 32px;
  height: 32px;
  background: url(${CloseIconImg32Color999}) no-repeat 50% 50%;
  background-size: 32px 32px;
  font-size: 0;
  text-indent: -9999px;
`;

const iconStyle = css`
  display: inline-block;
  margin-right: 4px;
  width: 24px;
  height: 24px;
  vertical-align: -6px;
`;

const icon = {
  css: iconStyle,
  src: AuthMobile,
};

interface Props {
  verificationData: VerificationData;
  result: AdultVerificationResult;
  authRequesting: boolean;
  agreeCheck: boolean;
  agreeTerms: boolean;

  handleClickAuth(): void;

  handleChangeAgree(): void;
  handleClickAgree(): void;
}

export default function PcAdultVerification({
  verificationData,
  result,
  handleClickAuth,
  authRequesting,
  agreeCheck,
  agreeTerms,
  handleChangeAgree,
  handleClickAgree,
}: Props) {
  const { goodsNo, refererUrl } = verificationData;

  const dispatch = useDispatch();

  const handleVerifiedUserResult = async () => {
    if (!result) {
      return;
    }

    const { isAdult, expiredAt } = await getUserMetadata();
    const isVerifiedAdult = isAdult && isBefore(new Date(), parseISO(expiredAt));

    removeAdultVerificationData();
    Alert({
      text: isVerifiedAdult
        ? '성인인증이 완료되었습니다.\n확인 결과는 1년동안 유지됩니다.'
        : '성인인증이 실패하였습니다.\n만 19세 이상만 이용 가능합니다.',
    }).then(() => {
      if (!isVerifiedAdult || !goodsNo) {
        const fallbackUrl = refererUrl || KURLY_URL;

        dispatch(
          redirectTo({
            url: fallbackUrl,
          }),
        );
        return;
      }

      dispatch(
        redirectTo({
          url: `/goods/${goodsNo}`,
        }),
      );
    });
  };

  useEffect(() => {
    handleVerifiedUserResult().catch();
  }, [result]);

  const handleClickClose = async () => {
    const redirectUrl = decodeURIComponent(verificationData.refererUrl);
    if (isGoBackLocation(redirectUrl)) {
      window.history.back();
      return;
    }

    dispatch(
      redirectTo({
        url: redirectUrl,
      }),
    );
  };

  return (
    <>
      <Header />
      <Content>
        <ContentArea>
          {!result && (
            <>
              <BgLayer />
              <NoticeAdult>
                <Title>성인인증</Title>
                <NoticeScroll>
                  <NoticeScrollInner>
                    <NoticeScrollIn>
                      <AdultIcon />
                      <AdultTitle>
                        본 상품은 <Emph>성인인증</Emph>이 필요합니다.
                      </AdultTitle>
                      <AdultDesc>
                        만 19세 이상 만 구매할 수 있는 상품으로
                        <br />
                        본인인증 완료 후, 상세 정보를 확인할 수 있습니다.
                      </AdultDesc>
                      <Agree id="NoticeScroll">
                        <Checkbox
                          css={checkbox}
                          id="agree-terms"
                          label="개인정보 수집∙이용 및 처리 동의(필수)"
                          checked={agreeCheck}
                          onChange={handleChangeAgree}
                        />
                        <AgreeView onClick={handleClickAgree}>
                          약관보기
                          <AgreeViewArrow agreeTerms={agreeTerms} />
                        </AgreeView>
                      </Agree>
                      {agreeTerms && <AgreeContents />}
                      <AdultNotice />
                    </NoticeScrollIn>
                  </NoticeScrollInner>
                </NoticeScroll>
                <CloseButton onClick={handleClickClose}>레이어 닫기</CloseButton>
                <WrapButton>
                  <Button
                    text="휴대폰 번호 인증"
                    styleIcon={icon}
                    onClick={handleClickAuth}
                    height={56}
                    radius={3}
                    disabled={!agreeCheck || authRequesting}
                  />
                </WrapButton>
              </NoticeAdult>
            </>
          )}
        </ContentArea>
      </Content>
      <Footer />
    </>
  );
}
