import { List, CellMeasurerCache, CellMeasurer, ListRowProps, WindowScroller } from 'react-virtualized';
import { motion } from 'framer-motion';

import { MainSection } from '../../components/m/main-section';
import Footer from '../../../footer/components/m/Footer';
import { useAppSelector } from '../../../shared/store';
import { fadeVariant } from '../../../shared/styles/motions';
import { useManualScrollRestoration } from '../../../shared/hooks/useManualScrollRestoration';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 500,
});

export default function MainSectionListContainer() {
  useManualScrollRestoration();

  const sectionsStatus = useAppSelector(({ main }) => main.sectionsStatus);
  const sectionKeys = useAppSelector(({ main }) => main.sectionKeys);
  const size = sectionKeys.length; // 초기값으로 메인배너가 들어가있어, 최소값은 1

  const rowRenderer = ({ index, key, parent, style }: ListRowProps) => {
    return (
      <CellMeasurer cache={cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
        {({ measure }) => (
          <div style={style}>
            <MainSection
              sectionPosition={index}
              sectionKey={sectionKeys[index]}
              hasSectionsStatus={!!(sectionsStatus === 'LOADING')}
              measure={measure}
            />
            {size > 1 && index >= size - 1 ? <Footer /> : null}
          </div>
        )}
      </CellMeasurer>
    );
  };

  return (
    <motion.div initial={'initial'} whileInView="animate" viewport={{ once: true }} variants={fadeVariant}>
      <WindowScroller>
        {({ width, height, registerChild, isScrolling, scrollTop }) => (
          <List
            deferredMeasurementCache={cache}
            width={width}
            height={height}
            autoHeight
            overscanRowCount={0}
            rowCount={size}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
            ref={registerChild}
            isScrolling={isScrolling}
            scrollTop={scrollTop}
          />
        )}
      </WindowScroller>
    </motion.div>
  );
}
