import Head from 'next/head';
import styled from '@emotion/styled';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import Loading from '../../shared/components/Loading/Loading';
import { useHtmlContent } from '../hooks/useHtmlContent';
import { isPC } from '../../../util/window/getDevice';

const EventView = styled.div`
  min-height: 100vh;
`;

const PCEventView = styled(EventView)`
  min-width: 1050px;
  #qnb {
    display: none;
  }
  #content {
    padding-bottom: 0;
  }
`;

type LegoViewComponentProps = {
  legoUrl?: string;
  isMetaLoading: boolean;
  setIsLegoLoaded?: (isLegoLoaded: boolean) => void;
};

function LegoViewComponent({ legoUrl, isMetaLoading, setIsLegoLoaded }: LegoViewComponentProps) {
  const { isReady } = useRouter();

  const ViewComponent = isPC ? PCEventView : EventView;

  const { content } = useHtmlContent({ isPC, legoUrl, isLoading: isMetaLoading });

  const isLoaded = useMemo(() => !!(isReady && !isMetaLoading && content.html), [isReady, isMetaLoading, content.html]);

  useEffect(() => {
    if (isLoaded) {
      setIsLegoLoaded?.(true);
    }
  }, [isLoaded, setIsLegoLoaded]);

  return isLoaded ? (
    <>
      {content.styles?.map((style, index) => (
        <style key={index} id={`lego_inline_style_${index}`}>
          {style}
        </style>
      ))}
      <Head>
        {content.scripts?.map((script, index) => (
          <script key={index} id={`lego_inline_script_${index}`}>
            {script}
          </script>
        ))}
      </Head>
      <ViewComponent id="eventView" dangerouslySetInnerHTML={{ __html: content.html }} />
    </>
  ) : (
    <Loading />
  );
}

export default LegoViewComponent;
