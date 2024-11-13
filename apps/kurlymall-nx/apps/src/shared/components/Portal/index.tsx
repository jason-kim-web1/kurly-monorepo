import { createPortal, unmountComponentAtNode } from 'react-dom';

import { HTMLAttributes, PropsWithChildren, RefObject, useEffect, useState } from 'react';

import { checkBrowserEnvironment } from '../../utils/checkBrowserEnvironment';

interface Props extends HTMLAttributes<HTMLElement> {
  containerRef?: RefObject<HTMLElement>;
}

/**
 * Portal 컴포넌트
 * @param children ReactNode
 * @param containerRef {optional} 포털을 생성할 HTMLElement 노드 Ref를 넘겨준다. 없을 시, document.body 하위의 임의의 div 요소로 포탈이 생성된다.
 * @param props Wrapper div 요소의 attributes
 */
const Portal = ({ children, containerRef, ...props }: PropsWithChildren<Props>) => {
  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!checkBrowserEnvironment()) return;

    const wrapperNode = document.createElement('div');

    if (containerRef?.current) {
      containerRef.current.appendChild(wrapperNode);
    } else {
      document.body.appendChild(wrapperNode);
    }

    setWrapper(wrapperNode);
  }, [containerRef]);

  useEffect(() => {
    if (!wrapper) return;
    Object.entries(props).forEach(([name, value]) => wrapper.setAttribute(name, value));
  }, [wrapper, props]);

  useEffect(
    () => () => {
      if (!wrapper) return;
      unmountComponentAtNode(wrapper);
      wrapper.remove();
    },
    [wrapper, containerRef],
  );

  if (wrapper) {
    return createPortal(children, wrapper);
  }

  return null;
};

export { Portal };
