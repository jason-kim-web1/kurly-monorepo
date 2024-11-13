import MainSiteProvider from '../../../../main/components/shared/MainSiteProvider';
import CircleThumbCollectionListContainer from '../../collections/m/containers/CircleThumbCollectionListContainer';
import type { MainCollectionGroupsProps } from '../../types';

const MainCollectionGroups = (mainCollection: MainCollectionGroupsProps) => {
  return (
    <MainSiteProvider site={mainCollection.site}>
      <CircleThumbCollectionListContainer collectionGroupsCode={mainCollection.code} />
    </MainSiteProvider>
  );
};

export default MainCollectionGroups;
