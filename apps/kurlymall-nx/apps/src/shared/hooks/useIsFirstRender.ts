import { useRef } from 'react';

const useIsFirstRender = () => {
  const ref = useRef(true);
  const firstRender = ref.current;
  ref.current = false;

  return firstRender;
};

export { useIsFirstRender };
