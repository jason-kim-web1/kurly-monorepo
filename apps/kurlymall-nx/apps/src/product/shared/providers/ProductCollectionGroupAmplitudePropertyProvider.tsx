import { createContext, PropsWithChildren, useCallback, useContext, useRef } from 'react';

import {
  ImpressionGroupParams,
  ImpressionItemParams,
  logImpressionGroup,
  logImpressionItem,
  logSelectCollection,
  SectionPageParams,
  SelectProductParams,
  SelectViewAllParams,
} from '../amplitude/product-collection-group';

interface ContextValue extends SectionPageParams {
  handleImpressionGroup: (params: ImpressionGroupParams) => void;
  handleImpressionItem: (params: ImpressionItemParams) => void;
  handleSelectCollection: (params: SelectViewAllParams | SelectProductParams) => void;
  addCollectionProperty: (params: ImpressionGroupParams) => void;
  addCollectionProductsProperty: (collectionId: string, params: ImpressionItemParams[]) => void;
}

const context = createContext<ContextValue | null>(null);

const ProductCollectionGroupAmplitudePropertyProvider = ({
  sectionScreen,
  sectionType,
  children,
}: PropsWithChildren<SectionPageParams>) => {
  const impressionGroupFiredRef = useRef<Set<string>>(new Set());
  const impressionItemFiredRef = useRef<Set<number>>(new Set());

  const collectionPropertyRef = useRef<Map<string, ImpressionGroupParams>>(new Map());
  const collectionProductPropertyRef = useRef<Map<string, ImpressionItemParams[]>>(new Map());

  const handleImpressionGroup = useCallback(
    (params: ImpressionGroupParams) => {
      const hasImpressionGroupSent = impressionGroupFiredRef.current.has(params.collectionId);

      if (hasImpressionGroupSent) return;

      impressionGroupFiredRef.current.add(params.collectionId);
      logImpressionGroup({ sectionScreen, sectionType, ...params });
    },
    [sectionScreen, sectionType],
  );

  const handleImpressionItem = useCallback(
    ({ collectionId, ...params }: ImpressionItemParams) => {
      const impressionGroupParams = collectionPropertyRef.current.get(collectionId);
      const hasImpressionItemSent = impressionItemFiredRef.current.has(params.contentId);

      if (!impressionGroupParams || hasImpressionItemSent) return;

      impressionItemFiredRef.current.add(params.contentId);

      logImpressionItem({ sectionScreen, sectionType, ...params, ...impressionGroupParams });
    },
    [sectionScreen, sectionType],
  );

  const handleSelectCollection = useCallback(
    (payload: SelectViewAllParams | SelectProductParams) => {
      const collectionProperties = collectionPropertyRef.current.get(payload.collectionId);
      if (!collectionProperties) return;

      const params = { sectionScreen, sectionType, ...payload, ...collectionProperties };

      if (payload.selectionType === 'content' && collectionProductPropertyRef.current.has(payload.collectionId)) {
        const productProperty = (collectionProductPropertyRef.current.get(payload.collectionId) ?? []).find(
          (o) => o.contentId === payload.contentId,
        );

        logSelectCollection({ ...params, ...productProperty });
        return;
      }

      logSelectCollection(params);
    },
    [sectionScreen, sectionType],
  );

  const addCollectionProperty = useCallback((params: ImpressionGroupParams) => {
    collectionPropertyRef.current.set(params.collectionId, params);
  }, []);

  const addCollectionProductsProperty = useCallback((collectionId: string, params: ImpressionItemParams[]) => {
    collectionProductPropertyRef.current.set(collectionId, params);
  }, []);

  return (
    <context.Provider
      value={{
        sectionScreen,
        sectionType,
        handleImpressionGroup,
        handleImpressionItem,
        handleSelectCollection,
        addCollectionProperty,
        addCollectionProductsProperty,
      }}
    >
      {children}
    </context.Provider>
  );
};

const useProductCollectionGroupAmplitudeEvents = () => {
  const ctx = useContext(context);
  if (!ctx) throw Error('<ProductCollectionGroupAmplitudePropertyProvider /> 가 올바르게 세팅되지 않았습니다.');

  return ctx;
};

export { ProductCollectionGroupAmplitudePropertyProvider, useProductCollectionGroupAmplitudeEvents };
