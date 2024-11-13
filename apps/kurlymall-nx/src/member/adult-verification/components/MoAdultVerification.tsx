import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { useDispatch } from 'react-redux';

import { isBefore, parseISO } from 'date-fns';

import { useEffect } from 'react';

import AgreeContents from './AgreeContents';
import AdultNotice from './AdultNotice';

import { Arrow20x20c999, AuthMobile, Nineteen } from '../../../shared/images';
import Checkbox from '../../../shared/components/Input/Checkbox';
import Button from '../../../shared/components/Button/Button';
import { isWebview } from '../../../../util/window/getDevice';
import getUserMetadata from '../services/getUserMetadata';
import Alert from '../../../shared/components/Alert/Alert';
import MobileHeader from '../../../shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../shared/components/layouts/HeaderButtons';
import CloseButton from '../../../shared/components/Button/CloseButton';
import HeaderTitle from '../../../shared/components/layouts/HeaderTitle';
import { AdultVerificationResult, VerificationData } from '../AdultVerificationContainer';
import { ActionProps } from '../../../shared/services/serviceCode';
import appService from '../../../shared/services/app.service';
import { KURLY_URL } from '../../../shared/configs/config';
import { isGoBackLocation } from '../services/isGoBackLocation';
import { removeAdultVerificationData } from '../services/adult-verificaiton-data-storage';
import { redirectTo } from '../../../shared/reducers/page';
import COLOR from '../../../shared/constant/colorset';

const Container = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const NoticeAdult = styled.div<{ agreeTerms: boolean }>`
  position: ${({ agreeTerms }) => (agreeTerms ? 'static' : 'absolute')};
  left: 0;
  top: 50%;
  width: 100%;
  margin-top: ${({ agreeTerms }) => (agreeTerms ? '40px' : 0)};
  padding-bottom: ${({ agreeTerms }) => (agreeTerms ? '40px' : '176px')};
  text-align: center;
  transform: ${({ agreeTerms }) => (agreeTerms ? 'translate(0, 0)' : 'translate(0, -50%)')};

  @media (max-height: 600px), (max-width: 374px) {
    position: static;
    margin-top: 40px;
    padding-bottom: 40px;
    transform: translate(0, 0);
  }
`;

const AdultTitle = styled.h2`
  padding-top: 8px;
  font-size: 18px;
  color: ${COLOR.kurlyGray800};
  line-height: 24px;
`;

const AdultDesc = styled.p`
  padding-top: 7px;
  font-size: 14px;
  color: ${COLOR.kurlyGray500};
  line-height: 19px;
`;

const Emph = styled.span`
  color: ${COLOR.invalidRed};
`;

const AdultIcon = styled.span`
  display: block;
  width: 68px;
  height: 68px;
  margin: 0 auto;
  background: url('${Nineteen}') no-repeat 50% 50%;
  background-size: 68px 68px;
`;

const AdultButton = styled.div`
  display: inline-block;
  min-width: 188px;
  margin: 0 auto;
  padding-top: 24px;
  vertical-align: top;
`;

const Agree = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 3px;
`;

const AgreeView = styled.button<{ agreeTerms: boolean }>`
  position: absolute;
  right: 0;
  top: 16px;
  width: 20px;
  height: 20px;
  background: url(${Arrow20x20c999}) no-repeat 50% 50%;
  background-size: 20px 20px;
  transform: ${({ agreeTerms }) => (agreeTerms ? 'rotate(0)' : 'rotate(180deg)')};
`;

const checkbox = css`
  font-size: 14px;
`;

const FixedContent = styled.div<{ agreeTerms: boolean }>`
  position: ${({ agreeTerms }) => (agreeTerms ? 'relative' : 'fixed')};
  left: ${({ agreeTerms }) => (agreeTerms ? 0 : '20px')};
  right: ${({ agreeTerms }) => (agreeTerms ? 0 : '20px')};
  bottom: ${({ agreeTerms }) => (agreeTerms ? 0 : '42px')};
  margin: ${({ agreeTerms }) => (agreeTerms ? '0 20px' : '0')};
  padding-bottom: ${({ agreeTerms }) => (agreeTerms ? '42px' : '0')};
  background-color: ${COLOR.kurlyWhite};

  @media (max-height: 600px), (max-width: 374px) {
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 20px;
    padding-bottom: 42px;
  }
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

export default function MoAdultVerification({
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

    if (isWebview()) {
      const sendData: ActionProps = {
        code: 'WV3300',
        is_success: isVerifiedAdult,
      };
      appService.postMessage(sendData);
    } else {
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

        const url = `/goods/${goodsNo}`;
        dispatch(
          redirectTo({
            url,
          }),
        );
      });
    }
  };

  useEffect(() => {
    handleVerifiedUserResult().catch();
  }, [result]);

  const handleClickClose = async () => {
    if (isGoBackLocation(verificationData.refererUrl)) {
      window.history.back();
      return;
    }

    dispatch(
      redirectTo({
        url: `/m${verificationData.refererUrl}`,
      }),
    );
  };

  return (
    <Container>
      {!isWebview() && (
        <MobileHeader>
          <HeaderButtons position="left">
            <CloseButton onClick={handleClickClose} />
          </HeaderButtons>
          <HeaderTitle>성인인증</HeaderTitle>
        </MobileHeader>
      )}
      <NoticeAdult agreeTerms={agreeTerms}>
        <AdultIcon />
        <AdultTitle>
          본 상품은 <Emph>성인인증</Emph>이 필요합니다.
        </AdultTitle>
        <AdultDesc>
          만 19세 이상 만 구매할 수 있는 상품으로
          <br />
          본인인증 완료 후, 상세 정보를 확인할 수 있습니다.
        </AdultDesc>
        <AdultButton>
          <Button
            text="휴대폰 번호 인증하기"
            styleIcon={icon}
            onClick={handleClickAuth}
            height={48}
            disabled={!agreeCheck || authRequesting}
          />
        </AdultButton>
      </NoticeAdult>

      <FixedContent agreeTerms={agreeTerms}>
        <Agree id="NoticeScroll">
          <Checkbox
            css={checkbox}
            id="agree-terms"
            label="개인정보 수집∙이용 및 처리 동의(필수)"
            checked={agreeCheck}
            onChange={handleChangeAgree}
          />
          <AgreeView onClick={handleClickAgree} agreeTerms={agreeTerms} />
        </Agree>
        {agreeTerms && <AgreeContents />}
        <AdultNotice />
      </FixedContent>
    </Container>
  );
}
