import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { useAppSelector } from '../../../shared/store';
import Button from '../../../shared/components/Button/Button';
import { MEMBERSHIP_PATH, getPageUrl } from '../../../shared/constant';
import { redirectTo } from '../../../shared/reducers/page';
import Alert from '../../../shared/components/Alert/Alert';
import Confirm, { closeConfirm } from '../../../shared/components/Alert/Confirm';
import { AlertSuccessContent, ButtonArea } from '../shared/styled';
import { subscribeWithSkt } from '../shared/service';
import { loadSessionStorage } from '../../../shared/services/session.storage.service';
import { SERVICE_MANAGEMENT_NUM, SUBS_PRODUCT_ID } from '../shared/constants';
import { loadMemberLoading } from '../../../shared/reducers/member';

const SubscribeUsingSKT = () => {
  const { isGuest, hasSession, isAlreadySubscribed } = useAppSelector(({ auth, member }) => ({
    isGuest: auth.isGuest,
    hasSession: auth.hasSession,
    isAlreadySubscribed: member.subscription.isSubscribed,
  }));

  const memberLoading = useAppSelector(loadMemberLoading);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsSubscribed(isAlreadySubscribed);
  }, [isAlreadySubscribed]);

  const goToKurlyMembers = useCallback(() => {
    dispatch(
      redirectTo({
        url: getPageUrl(MEMBERSHIP_PATH.membership),
      }),
    );
  }, [dispatch]);

  const handleConnectToSKT = useCallback(async () => {
    if (isSubscribed) {
      Alert({
        text: '컬리멤버스 가입 고객입니다. 컬리에서 다양한 컬리멤버스 혜택을 확인해보세요.',
        allowOutsideClick: false,
        showConfirmButton: true,
      });

      return;
    }

    const svcMgmtNum = loadSessionStorage<string>(SERVICE_MANAGEMENT_NUM) ?? '';
    const subsProdId = loadSessionStorage<string>(SUBS_PRODUCT_ID) ?? '';

    if (!svcMgmtNum || !subsProdId) {
      Alert({
        text: '링크가 유효하지 않습니다.\n우주패스 연결페이지에서 다시 클릭하여 진입해주세요.',
        allowOutsideClick: false,
        showConfirmButton: true,
      });

      return;
    }

    try {
      setDisabled(true);

      await subscribeWithSkt(svcMgmtNum, subsProdId);

      await Confirm({
        contents: (
          <AlertSuccessContent>
            <h3>컬리멤버스 가입이 완료되었습니다.</h3>
            <p>컬리멤버스에서 제공되는 다양한 혜택을 이용하시기 바랍니다.</p>
            <div className="buttons">
              <Button theme="primary" text="컬리멤버스 혜택보기" radius={6} onClick={goToKurlyMembers} />
              <Button theme="tertiary" text="닫기" radius={6} onClick={closeConfirm} />
            </div>
          </AlertSuccessContent>
        ),
        allowOutsideClick: false,
        showLeftButton: false,
        showRightButton: false,
      });

      setIsSubscribed(true);
    } catch (err) {
      await Alert({
        text: (err as AxiosError).response?.data?.message || '에러가 발생하였습니다. 고객센터로 문의해주세요.',
        allowOutsideClick: false,
        showConfirmButton: true,
      });
    } finally {
      setDisabled(false);
    }
  }, [isSubscribed, goToKurlyMembers]);

  return (
    <ButtonArea>
      <Button
        isSubmitLoading={!hasSession || (!isGuest && memberLoading) || disabled}
        theme="primary"
        height={56}
        radius={100}
        text="컬리멤버스 이용권 발급하기"
        onClick={handleConnectToSKT}
      />
    </ButtonArea>
  );
};

export default SubscribeUsingSKT;
