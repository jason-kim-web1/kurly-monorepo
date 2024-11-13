import { isPC } from '../../../util/window/getDevice';
import useScrollToTopWithTabs from '../hooks/useScrollToTopWithTabs';
import { StyledTabsWrapper } from '../shared/styled';
import { ContentBody, TabType } from '../shared/type';

type TabsProps = { tabs?: TabType[]; styles?: ContentBody['styles']; onClickTab?: (tabType: TabType) => void };

function Tabs({ tabs, styles, onClickTab }: TabsProps) {
  const { topValue, scrollToTopWithTabs } = useScrollToTopWithTabs();

  const clickTab = (tabType: TabType) => () => {
    scrollToTopWithTabs(tabType);

    onClickTab?.(tabType);
  };

  return (
    <StyledTabsWrapper
      id="tab"
      rowLength={Math.ceil((tabs?.length || 0) / 2)}
      styles={styles}
      className={isPC ? 'pc' : 'mobile'}
      top={topValue()}
    >
      <div className="tab-wrap">
        {tabs?.map((benefit, index) => (
          <button
            className={`tab ${index < tabs.length / 2 ? 'top' : 'bottom'}`}
            key={benefit.id}
            onClick={clickTab(benefit)}
          >
            {benefit.title}
            {benefit.badge && <span className="badge">{benefit.badge}</span>}
          </button>
        ))}
      </div>
    </StyledTabsWrapper>
  );
}

export default Tabs;
