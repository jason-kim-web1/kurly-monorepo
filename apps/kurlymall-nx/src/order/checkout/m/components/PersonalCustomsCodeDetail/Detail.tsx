import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import Empty from '../ShippingDetails/Empty';
import Button from '../../../../../shared/components/Button/Button';
import useToggle from '../../../shared/hooks/useToggle';
import { ORDER_PATH } from '../../../../../shared/constant';
import { useWebview } from '../../../../../shared/hooks';
import appService from '../../../../../shared/services/app.service';
import usePersonalCustomsCode from '../../../shared/hooks/usePersonalCustomsCode';
import LayerPopup from '../../../../../shared/components/m/LayerPopup';
import PersonalCustomsCodeForm from './PersonalCustomsCodeForm';
import addWindowEventListenerOnMessage from '../../../shared/utils/addWindowEventListenerOnMessage';
import { REFETCH_PERSONAL_CUSTOMS_CODE } from '../../../shared/interfaces/CustomMessageEvent';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;

  button > span {
    font-size: 14px;
    font-weight: 500;
  }
`;

const Text = styled.div`
  font-size: 15px;
  color: ${COLOR.kurlyGray600};
`;

const EMPTY_MESSAGE = '받는 분의 개인통관고유부호를 입력해 주세요';
const LAYER_POPUP_TITLE = '개인통관고유부호';

declare global {
  interface Window {
    refetchPersonalCustomsCode?: () => void;
  }
}

const Detail = () => {
  const { hasPCC, personalCustomsCode, refetch } = usePersonalCustomsCode();

  const webview = useWebview();
  const { isOpen, close, open } = useToggle();

  const handleClick = () => {
    if (webview) {
      // 웹뷰 닫힌 후 호출할 갱신 함수 등록
      window.refetchPersonalCustomsCode = () => {
        refetch();
      };
      //웹뷰인 경우 페이지 이동으로 해당 페이지 열림 처리
      appService.openWebview({
        url: `${window.location.origin}${ORDER_PATH.personalCustomsCodeForm.uri}`,
        title: '개인통관고유부호',
        is_modal: true,
      });
    } else {
      // 레이어 컴포넌트에서 저장 버튼 클릭후 레이어 팝업 닫기 + 갱신 함수 호출
      addWindowEventListenerOnMessage(REFETCH_PERSONAL_CUSTOMS_CODE, () => {
        close();
        refetch();
      });
      //모웹인 경우 LayerPopup 컴포넌트 열림 처리
      open();
    }
  };
  return (
    <>
      {/* 모웹일때만 LayerPopup렌더링 */}
      <LayerPopup isOpen={isOpen} headerTitle={LAYER_POPUP_TITLE} onClosePopup={close}>
        <PersonalCustomsCodeForm />
      </LayerPopup>

      {hasPCC ? (
        <Content>
          <Text>{personalCustomsCode}</Text>
          <Button theme="tertiary" text="수정" width={52} height={38} radius={4} onClick={handleClick} />
        </Content>
      ) : (
        <Content>
          <button onClick={handleClick}>
            <Empty text={EMPTY_MESSAGE} hasArrow />
          </button>
        </Content>
      )}
    </>
  );
};

export default Detail;
