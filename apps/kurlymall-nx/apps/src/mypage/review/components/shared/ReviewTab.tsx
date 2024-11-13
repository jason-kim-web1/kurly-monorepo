import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { useAppSelector } from '../../../../shared/store';
import WritableReviewPanel from './WritableReviewPanel';
import WrittenReviewPanel from './WrittenReviewPanel';
import { TabProvider } from '../../contexts/TabContext';
import { REVIEW_TAB_NAME } from '../../constants';
import { assertIsTabActive } from '../../utils';
import { ReviewContentWrapper, TabButton, TabList } from './styled-components';
import { isPC } from '../../../../../util/window/getDevice';

const TAB_LIST = [
  {
    name: REVIEW_TAB_NAME.WRITABLE_TAB,
    content: <WritableReviewPanel />,
  },
  {
    name: REVIEW_TAB_NAME.WRITTEN_TAB,
    content: <WrittenReviewPanel />,
  },
] as const;

export default function ReviewTab() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const mobileHeaderHeight = useAppSelector(({ header }) => header.mobileHeaderHeight);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const currentTarget = contentRef.current;
    if (!currentTarget) {
      return;
    }

    currentTarget.scrollTo({ top: currentTarget.offsetTop, left: 0 });
  }, [router.isReady]);

  return (
    <TabProvider>
      {({ tabIndex, setTabIndex }) => (
        <>
          <TabList isPC={isPC} mobileHeaderHeight={mobileHeaderHeight}>
            {TAB_LIST.map(({ name }, index) => (
              <TabButton
                isPC={isPC}
                type={'button'}
                key={`${index}-button-${name}`}
                isActive={assertIsTabActive(index, tabIndex)}
                onClick={() => setTabIndex(index)}
              >
                <span>{name}</span>
              </TabButton>
            ))}
          </TabList>
          {TAB_LIST.map(({ name, content }, index) => (
            <ReviewContentWrapper
              key={`${index}-content-${name}`}
              ref={contentRef}
              isActive={assertIsTabActive(index, tabIndex)}
            >
              {content}
            </ReviewContentWrapper>
          ))}
        </>
      )}
    </TabProvider>
  );
}
