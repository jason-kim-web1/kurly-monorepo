import { CustomMessageType, CustomMessageEvent } from '../interfaces/CustomMessageEvent';

const addWindowEventListenerOnMessage = (type: CustomMessageType, fn: VoidFunction) => {
  const callback = (e: MessageEvent<CustomMessageEvent>) => {
    if (e.data.type === type) {
      fn();
    }
  };

  //같은 이벤트리스너 콜백 등록되지 않도록 제거
  window.removeEventListener('message', callback);
  window.addEventListener('message', callback);
};

export default addWindowEventListenerOnMessage;
