import { cloneElement, createContext, isValidElement, PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { nanoid } from 'nanoid';
import { chain, forEach, isEmpty, noop } from 'lodash';

import type { ChildrenOnlyProps } from '../../types';
import { checkBrowserEnvironment } from '../../utils/checkBrowserEnvironment';
import { waitScrollStops } from '../../utils/wait-scroll-stops';

type ImpressionTargetId = string;

type ImpressionTargetMeta = {
  inView: boolean;
  callback: () => void;
  isFired: boolean;
};

type ImpressionRegisterMeta = Omit<ImpressionTargetMeta, 'isFired'>;

type ImpressionTargetDictionary = Record<ImpressionTargetId, ImpressionTargetMeta>;

type ImpressionPolicyContextState = {
  register: (id: ImpressionTargetId, meta: ImpressionRegisterMeta) => void;
  unRegister: (id: ImpressionTargetId) => void;
  updateInViewState: (id: ImpressionTargetId, inView: boolean) => void;
  registerElement: (el: HTMLElement) => void;
  unRegisterElement: (el: HTMLElement) => void;
  checkIsScrolling: () => boolean;
  checkIsSwiping: () => boolean;
};

const ImpressionPolicyContext = createContext<ImpressionPolicyContextState>({
  register: noop,
  unRegister: noop,
  updateInViewState: noop,
  registerElement: noop,
  unRegisterElement: noop,
  checkIsScrolling: () => false,
  checkIsSwiping: () => false,
});

const ImpressionPolicyContextProvider = ({ children }: ChildrenOnlyProps) => {
  const isScrollingRef = useRef(false);
  const isSwipingRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const impressionTargetDictionaryRef = useRef<ImpressionTargetDictionary>({});
  const animationFrameIdRef = useRef<number | null>(null);

  const fireEvent = () => {
    if (!impressionTargetDictionaryRef.current) {
      return;
    }
    const targetEventIdList = chain(impressionTargetDictionaryRef.current)
      .entries()
      .filter(([, { inView, isFired }]) => inView && !isFired)
      .map(([id]) => id)
      .value();

    if (isEmpty(targetEventIdList)) {
      return;
    }

    // NOTE: requestAnimationFrame tick timing 이슈를 방지하기 위해 발생 여부를 먼저 갱신
    forEach(targetEventIdList, (id) => {
      if (!impressionTargetDictionaryRef.current[id]) {
        return;
      }
      impressionTargetDictionaryRef.current[id].isFired = true;
    });

    forEach(targetEventIdList, (id) => {
      if (!impressionTargetDictionaryRef.current[id]) {
        return;
      }
      impressionTargetDictionaryRef.current[id].callback();
    });
  };

  const handleScroll = (e: Event) => {
    isScrollingRef.current = true;

    const target = e.target === window.document ? window : e.target instanceof HTMLElement ? e.target : null;
    if (target) {
      waitScrollStops(target).then(() => (isScrollingRef.current = false));
    }
  };

  const handleRegisterElement = (el: HTMLElement) => {
    if (!el) {
      return;
    }
    el.addEventListener('scroll', handleScroll, { passive: true });
  };

  const handleUnRegisterElement = (el: HTMLElement) => {
    if (!el) {
      return;
    }
    el.removeEventListener('scroll', handleScroll);
  };

  const handleRegister = (id: ImpressionTargetId, meta: Omit<ImpressionTargetMeta, 'isFired'>) => {
    if (!impressionTargetDictionaryRef.current) {
      return;
    }
    impressionTargetDictionaryRef.current[id] = {
      ...meta,
      isFired: false,
    };
  };

  const handleUnRegister = (id: ImpressionTargetId) => {
    if (!impressionTargetDictionaryRef.current) {
      return;
    }
    delete impressionTargetDictionaryRef.current[id];
  };

  const handleUpdateInViewState = (id: ImpressionTargetId, inView: boolean) => {
    if (!impressionTargetDictionaryRef.current || !impressionTargetDictionaryRef.current[id]) {
      return;
    }
    impressionTargetDictionaryRef.current[id].inView = inView;
  };

  const checkIsScrolling = () => isScrollingRef.current;
  const checkIsSwiping = () => isSwipingRef.current;

  useEffect(() => {
    const isBrowserEnv = checkBrowserEnvironment();
    if (!isBrowserEnv) {
      return;
    }
    const handleMouseDown = () => {
      isSwipingRef.current = true;
      isPointerDownRef.current = true;
    };
    const handleMouseMove = () => {
      if (isPointerDownRef.current) {
        isSwipingRef.current = true;
      }
    };
    const handleMouseUp = () => {
      isSwipingRef.current = false;
      isPointerDownRef.current = false;
    };

    const logBatch = () => {
      if (!isSwipingRef.current && !isScrollingRef.current) {
        fireEvent();
      }
      animationFrameIdRef.current = requestAnimationFrame(logBatch);
    };

    window.addEventListener('touchstart', handleMouseDown, { passive: true });
    window.addEventListener('touchmove', handleMouseMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    animationFrameIdRef.current = requestAnimationFrame(logBatch);
    return () => {
      window.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <ImpressionPolicyContext.Provider
      value={{
        // fireEvent,
        register: handleRegister,
        unRegister: handleUnRegister,
        updateInViewState: handleUpdateInViewState,
        registerElement: handleRegisterElement,
        unRegisterElement: handleUnRegisterElement,
        checkIsSwiping,
        checkIsScrolling,
      }}
    >
      {children}
    </ImpressionPolicyContext.Provider>
  );
};

const useImpressionPolicy = () => {
  const context = useContext(ImpressionPolicyContext);
  if (!context) {
    throw new Error('ImpressionPolicyContext 하위에서 사용 가능합니다.');
  }
  const {
    register,
    unRegister,
    updateInViewState,
    registerElement,
    unRegisterElement,
    checkIsSwiping,
    checkIsScrolling,
  } = context;
  return {
    register,
    unRegister,
    updateInViewState,
    registerElement,
    unRegisterElement,
    checkIsSwiping,
    checkIsScrolling,
  };
};

type ImpressionPolicyProps = {
  onInView: () => void;
};

const ImpressionPolicy = ({ children, onInView }: PropsWithChildren<ImpressionPolicyProps>) => {
  const { register, unRegister, updateInViewState } = useImpressionPolicy();
  const impressionTargetIdRef = useRef(nanoid());
  const { ref, inView, entry } = useInView({
    triggerOnce: false,
  });
  const targetElement = entry?.target;

  useEffect(() => {
    if (!targetElement || !impressionTargetIdRef.current) {
      return;
    }
    const impressionTargetId = impressionTargetIdRef.current;
    register(impressionTargetId, {
      inView: false,
      callback: onInView,
    });
  }, [register, unRegister, targetElement, onInView]);

  useEffect(() => {
    updateInViewState(impressionTargetIdRef.current, inView);
  }, [updateInViewState, inView]);

  useEffect(() => {
    const impressionTargetId = impressionTargetIdRef.current;
    return () => {
      unRegister(impressionTargetId);
    };
  }, [unRegister]);

  if (!isValidElement(children)) {
    return null;
  }

  return cloneElement(children, {
    ref,
  });
};

export { ImpressionPolicyContextProvider, ImpressionPolicy, useImpressionPolicy };
