import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';

import SlideModal from '../../../../shared/components/modal/SlideModal';
import Button from '../../../../shared/components/Button/Button';
import useToggle from '../../../../order/checkout/shared/hooks/useToggle';
import { AppState } from '../../../../shared/store';
import NewIcon from '../../../../shared/components/icons/NewIcon';
import usePrivacyPolicyState from '../../shared/hooks/usePrivacyPolicyState';
import { USER_MENU_PATH } from '../../../../shared/constant';
import COLOR from '../../../../shared/constant/colorset';
import { clearInfo } from '../../slice';
import { putPrivacyPolicy } from '../../../../shared/services/myKurlyStyle.service';

import Alert from '../../../../shared/components/Alert/Alert';
import useAgreement from '../../shared/hooks/useAgreement';
import { amplitudeService } from '../../../../shared/amplitude';
import { ImpressionProfileInformationArgeement } from '../../../../shared/amplitude/events/mykurly-style';

const Wrapper = styled.div`
  padding: 22px 20px 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 8px;
  margin-top: 20px;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 16px;
`;

const SubTitle = styled.p`
  margin: 8px 0 3px;
  line-height: 19px;
`;

const Description = styled.p`
  font-size: 13px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const Caution = styled.p`
  margin-top: 12px;
  font-size: 13px;
  line-height: 18px;
`;

const Emphasis = styled.span`
  color: ${COLOR.invalidRed};
`;

const newIcon = css`
  width: 14px;
  height: 14px;
  vertical-align: middle;
`;

interface Props {
  period: string;
  purpose: string;
  items: string;
  description: string;
}

export default function ListStyle({ period, purpose, items, description }: Props) {
  const dispatch = useDispatch();
  const { replace } = useRouter();

  const dummy = () => {};

  useEffect(() => {
    void amplitudeService.logEvent(new ImpressionProfileInformationArgeement());
  }, []);

  const {
    myKurlyStyleInformation: { privacyPolicyStatus },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  const { toggle, isOpen } = useToggle();

  const { popupOpen, agreePrivacyPolicy } = useAgreement();

  const { isDisagreement, updatedPrivacyPolicy } = usePrivacyPolicyState(privacyPolicyStatus);

  const moveToMypage = useCallback(async () => {
    dispatch(clearInfo());
    await putPrivacyPolicy(false);
    if (updatedPrivacyPolicy) {
      await Alert({
        text: '프로필이 삭제되었습니다.',
      });
    }
    await replace(USER_MENU_PATH.mykurly.uri);
  }, [updatedPrivacyPolicy, dispatch]);

  return (
    <SlideModal open={popupOpen} onClose={dummy} disableSwipe={true} showHeader={false}>
      {isOpen ? (
        <Wrapper>
          <Title>약관 동의를 취소하시겠습니까?</Title>
          <SubTitle>
            미동의 시 이용이 어려우며, 기존 동의를 철회하는 경우 서비스 제공은 즉시 중단되고{' '}
            <Emphasis>기존 정보는 모두 삭제</Emphasis>됩니다.
          </SubTitle>
          <ButtonWrapper>
            <Button text="아니요" theme="tertiary" onClick={toggle} />
            <Button text="네" onClick={moveToMypage} />
          </ButtonWrapper>
        </Wrapper>
      ) : (
        <Wrapper>
          <Title>
            프로필 수집 및 이용 약관 동의 (필수)
            {updatedPrivacyPolicy && <NewIcon css={newIcon} />}
          </Title>
          <SubTitle>수집 목적</SubTitle>
          <Description>{purpose}</Description>
          <SubTitle>수집 항목</SubTitle>
          <Description>{items}</Description>
          <SubTitle>보유 및 이용기간</SubTitle>
          <Description>{period}</Description>
          <Caution>{description}</Caution>
          <ButtonWrapper>
            <Button text="취소" radius={6} theme="tertiary" onClick={isDisagreement ? moveToMypage : toggle} />
            <Button text="동의 후 계속" radius={6} onClick={agreePrivacyPolicy} />
          </ButtonWrapper>
        </Wrapper>
      )}
    </SlideModal>
  );
}
