import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from 'lodash';
import { isAfter } from 'date-fns';

import { useRouter } from 'next/router';

import { AppState } from '../../../src/shared/store';
import { loadGiftInformation, postGiftApproved, postGiftReject, setExternalOrderNo } from '../../../src/gift/slice';

import InformationContainer from '../../../src/gift/containers/InformationContainer';
import DecisionContainer from '../../../src/gift/containers/DecisionContainer';
import ShippingContainer from '../../../src/gift/containers/ShippingContainer';

import Alert from '../../../src/shared/components/Alert/Alert';
import Loading from '../../../src/shared/components/Loading/Loading';

import ReceivedContainer from '../../../src/gift/containers/ReceivedContainer';
import PolicyContainer from '../../../src/gift/containers/PolicyContainer';
import DeliveryResultContainer from '../../../src/gift/containers/DeliveryResultContainer';

import { notify, notifyAndFocus, notifyAndScroll } from '../../../src/shared/reducers/page';

import { phoneValidate, findNotAllowText, formatMobileNumber } from '../../../src/shared/utils';
import { removeHyphen } from '../../../src/shared/services';
import Footer from '../../../src/footer/components/m/Footer';
import { Divider } from '../../../src/shared/components/Divider/Divider';

export default function GiftReceivePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { externalGroupOrderNo } = router.query;

  const {
    externalOrderNo,
    acceptInfo,
    loading,
    receiver: { orderNo, status, availableDate, ordererName },
  } = useSelector(({ gift }: AppState) => gift);

  // isNoticeTime : 고객 인지 및 CC 대응을 위한 기존 유효기간 노출 처리 시간
  const isNoticeTime = isAfter(new Date(), new Date(availableDate));

  const validation = async () => {
    const { address, addressDetail, phoneNumber, memo, termsAgreements } = acceptInfo;

    const removeHyphenPhoneNumber = removeHyphen(phoneNumber.trim());

    if (isEmpty(removeHyphenPhoneNumber)) {
      dispatch(
        notifyAndFocus({
          message: '휴대폰 번호를 입력해주세요.',
          documentId: 'receiver-phone-number',
        }),
      );
      return false;
    }

    if (!phoneValidate(removeHyphenPhoneNumber)) {
      dispatch(
        notifyAndFocus({
          message: '정확한 휴대폰 번호를 입력해주세요.',
          documentId: 'receiver-phone-number',
        }),
      );
      return false;
    }

    if (isEmpty(address)) {
      dispatch(
        notifyAndScroll({
          message: '주소를 입력해주세요.',
          scrollId: 'receiver-adress-area',
        }),
      );
      return false;
    }

    if (isEmpty(addressDetail)) {
      const { isConfirmed } = await Alert({
        text: '나머지 주소를 입력하지 않으셨습니다. 이대로 저장하시겠습니까?',
        showConfirmButton: true,
        showCancelButton: true,
        returnFocus: false,
      });
      if (!isConfirmed) {
        document.getElementById('receiver-sub-address')?.focus();
        return false;
      }
    } else {
      const isNotAllowAddr = findNotAllowText(addressDetail);
      if (!isEmpty(isNotAllowAddr)) {
        dispatch(
          notifyAndFocus({
            message: `주소에 사용할 수 없는 문자가 있습니다. 다시 확인해주세요. \n${isNotAllowAddr?.join(' ')}`,
            documentId: 'receiver-sub-address',
          }),
        );
        return false;
      }
    }

    // 미지원 문자열 판별
    if (!isEmpty(memo)) {
      const isNotAllowMemo = findNotAllowText(memo || '');

      if (!isEmpty(isNotAllowMemo)) {
        dispatch(
          notifyAndFocus({
            message: `배송기사 요청사항에 사용할 수 없는 문자가 있습니다. 다시 확인해주세요. \n${isNotAllowMemo?.join(
              ' ',
            )}`,
            documentId: 'receiver-delivery-request',
          }),
        );
        return false;
      }
    }

    if (!termsAgreements.every(({ agreed }) => agreed)) {
      dispatch(notify('선물 수락을 위해 필수 동의를 체크해주세요.'));
      return false;
    }

    return true;
  };

  const handleAccepted = async () => {
    const validated = await validation();
    if (!validated) {
      return;
    }

    const { isConfirmed } = await Alert({
      text: `${ordererName}님이 보내신 선물을 수락하시겠습니까?`,
      showCancelButton: true,
    });
    if (!isConfirmed) {
      return;
    }

    dispatch(
      postGiftApproved(externalOrderNo, {
        ...acceptInfo,
        phoneNumber: formatMobileNumber(acceptInfo.phoneNumber),
      }),
    );
  };

  const handleRejected = async () => {
    const { isConfirmed } = await Alert({
      text: `${ordererName}님이 보내신 선물을 거절하시겠습니까?`,
      showCancelButton: true,
    });

    if (!isConfirmed) {
      return;
    }

    dispatch(postGiftReject(externalOrderNo));
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!externalGroupOrderNo) {
      router.push('/m2/error.php');
      return;
    }

    dispatch(setExternalOrderNo(externalGroupOrderNo));
    dispatch(loadGiftInformation(String(externalGroupOrderNo)));
  }, [router, dispatch, externalGroupOrderNo]);

  return (
    <>
      {loading && <Loading />}
      {orderNo !== 0 && status === 'READY_FOR_ACCEPT' && (
        <>
          <InformationContainer />
          <Divider />
          <ShippingContainer isNoticeTime={isNoticeTime} />
          <Divider />
          {!isNoticeTime && <DecisionContainer handleAccepted={handleAccepted} handleRejected={handleRejected} />}
          <Footer />
        </>
      )}
      {orderNo !== 0 && status !== 'READY_FOR_ACCEPT' && (
        <>
          <ReceivedContainer />
          <Divider />
          <PolicyContainer />
          <DeliveryResultContainer />
        </>
      )}
    </>
  );
}
