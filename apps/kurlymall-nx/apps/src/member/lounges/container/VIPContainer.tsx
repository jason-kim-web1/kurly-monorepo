import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { isEmpty } from 'lodash';

import Association from '../components/Association';
import GiftDelivery from '../components/GiftDelivery';
import Loading from '../../../shared/components/Loading/Loading';
import { VipContentTypes } from '../shared/constants';
import useVIPContent from '../hooks/useVIPContent';

import SimpleText from '../../../marketing/components/SimpleText';
import LoungeTopBanner from '../components/LoungeTopBanner';
import Tabs from '../../../marketing/components/Tabs';
import Summary from '../../../marketing/components/Summary';
import Information from '../../../marketing/components/Information';
import LayoutContainer from '../../../marketing/containers/LayoutContainer';
import useVIPLevel from '../../shared/useVIPLevel';
import useValidAccess from '../../shared/useValidAccess';
import useScrollToTopWithTabs from '../../../marketing/hooks/useScrollToTopWithTabs';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectVipPageButton } from '../../../shared/amplitude/events/lounges';
import { TabType } from '../../../marketing/shared/type';
import { useAppSelector } from '../../../shared/store';

const VIPContainer = () => {
  const { isReady } = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const { vipLevel } = useVIPLevel();

  const { data, tabs } = useVIPContent({ vipLevel });

  const { vipInfo } = useAppSelector(({ member }) => ({
    vipInfo: member.info?.vipInfo,
  }));

  useValidAccess({ conditionProperty: 'vip' });

  const { scrollToTopWithTabs } = useScrollToTopWithTabs();

  useEffect(() => {
    if (!isReady || isEmpty(data?.content)) {
      return;
    }

    const handleScrollWhenHashExists = () => {
      if (window.location.hash) {
        const id = window.location.hash.replace('#', '');

        scrollToTopWithTabs({ id });
      }
    };

    if (window.MutationObserver === undefined) {
      setTimeout(() => {
        handleScrollWhenHashExists();
      }, 2000);
    } else {
      const observer = new MutationObserver(() => {
        handleScrollWhenHashExists();

        observer.disconnect();
      });

      const target = containerRef.current;
      if (target) {
        observer.observe(target, { childList: true, subtree: true });
      }

      return () => {
        observer?.disconnect();
      };
    }
  }, [isReady, data?.content, scrollToTopWithTabs]);

  if (!isReady || !data?.content) {
    return <Loading />;
  }

  const onTabClick = (tabType: TabType) => {
    if (tabType.title && vipInfo?.name) {
      amplitudeService.logEvent(
        new SelectVipPageButton({
          url: location.href,
          pageName: vipInfo?.name,
          selectionType: 'subtab',
          message: tabType.title,
        }),
      );
    }
  };

  return (
    <LayoutContainer pageName={vipLevel} divRef={containerRef}>
      {data.content?.map(({ type, title, id, body }) => {
        switch (type) {
          case VipContentTypes.Image:
            return <LoungeTopBanner key={id} images={body?.images} styles={body?.styles} />;
          case VipContentTypes.Tabs:
            return <Tabs key={id} tabs={tabs} styles={body?.styles} onClickTab={onTabClick} />;
          case VipContentTypes.Text:
            return <SimpleText key={id} text={body?.text} />;
          case VipContentTypes.Summary:
            return <Summary key={id} benefits={body?.list} images={body?.images} styles={body?.styles} />;
          case VipContentTypes.Gift:
            return <GiftDelivery key={id} images={body?.images} body={body} />;
          case VipContentTypes.Information:
            return <Information key={id} title={title} body={body} />;
          case VipContentTypes.Association:
            return <Association key={id} type={type} title={title} body={body} />;
          default:
            return null;
        }
      })}
    </LayoutContainer>
  );
};

export default VIPContainer;
