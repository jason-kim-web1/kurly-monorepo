import { useDispatch } from 'react-redux';
import { head } from 'lodash';
import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  AutoSizer,
  List as FixedSizeList,
  WindowScroller,
  InfiniteLoader,
  ListRowRenderer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';

import { useRouter } from 'next/router';

import { INFINITE_QUERY_KEY } from '../../../constants';

import useInquiryProductDeleteMutation from '../../../hooks/useInquiryProductDeleteMutation';
import useInquiryProductsInfiniteQuery from '../../../hooks/useInquiryProductsInfiniteQuery';
import useInquiryProductsInvalidate from '../../../hooks/useInquiryProductsInvalidate';
import { isPC, isWebview } from '../../../../../../../util/window/getDevice';

import Repeat from '../../../../../../shared/components/Repeat';
import ListItem from '../../../components/shared/ListItem';
import ListItemError from '../../../components/shared/ListItem/Error';
import ListItemEmpty from '../../../components/shared/ListItem/Empty';
import ListItemLoading from '../../../components/shared/ListItem/Loading';
import Alert from '../../../../../../shared/components/Alert/Alert';
import { redirectTo } from '../../../../../../shared/reducers/page';
import EditDialog from '../../../components/pc/EditDialog';
import useInquiryProductUpdateMutation, { UpdateMutateParams } from '../../../hooks/useInquiryProductUpdateMutation';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 96,
});

const ListContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [expandedItem, setExpandedItem] = useState<[number | null, number | null]>([null, null]);
  const {
    isError,
    isSuccess,
    isInquiryProductsEmpty,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    size,
    flatPages,
    normalizedInquiryProductList,
  } = useInquiryProductsInfiniteQuery();

  const { invalidate } = useInquiryProductsInvalidate(INFINITE_QUERY_KEY);

  const {
    mutate: mutateUpdate,
    reset: resetUpdateMutation,
    isSuccess: isUpdateMutationSuccess,
    isLoading: isUpdateMutationLoading,
  } = useInquiryProductUpdateMutation();

  const {
    mutate: mutateDelete,
    reset: resetDeleteMutation,
    isSuccess: isDeleteMutationSuccess,
    isError: isDeleteMutationError,
  } = useInquiryProductDeleteMutation();

  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  const selectedItem = useMemo(() => {
    const selectedItemId = head(expandedItem);
    if (!selectedItemId) {
      return null;
    }
    return normalizedInquiryProductList[selectedItemId];
  }, [expandedItem, normalizedInquiryProductList]);

  const handleInvalidate = useCallback(async (): Promise<void> => {
    resetDeleteMutation();
    await invalidate();
    await Alert({
      text: '작성된 문의가 삭제되었습니다.',
    });
  }, [invalidate, resetDeleteMutation]);

  const handleInvalidatePC = useCallback(async (): Promise<void> => {
    resetUpdateMutation();
    await invalidate();
    await Alert({
      text: '문의가 정상적으로 등록되었습니다.',
    });
  }, [invalidate, resetUpdateMutation]);

  const handleOpenEditDialog = useCallback(() => {
    if (editDialogOpen) {
      return;
    }
    setEditDialogOpen(true);
  }, [editDialogOpen]);

  const handleCloseEditDialog = useCallback(() => {
    if (!editDialogOpen) {
      return;
    }
    setEditDialogOpen(false);
  }, [editDialogOpen]);

  const handleClickListItem = useCallback(
    (id: number, index: number) => () => {
      if (id === head(expandedItem)) {
        setExpandedItem(() => [null, null]);
        return;
      }
      setExpandedItem(() => [id, index]);
    },
    [expandedItem],
  );

  const handleClickEditListItem = useCallback(
    () => () => {
      if (!selectedItem) {
        return;
      }
      const { contentProductNo, id: inquiryId, subject, contents, isSecret } = selectedItem;
      const isWebViewEnv = isWebview();
      const pathname = isWebViewEnv
        ? '/webview/mypage/inquiry/products/[inquiryId]'
        : '/mypage/inquiry/products/[inquiryId]';

      dispatch(
        redirectTo({
          url: pathname,
          query: {
            inquiryId,
            contentProductNo,
            subject,
            contents,
            isSecret,
          },
        }),
      );
    },
    [dispatch, selectedItem],
  );

  const handleDeleteInquiryItem = useCallback(
    (productNo: number, id: number) => mutateDelete({ productNo, contentId: id }),
    [mutateDelete],
  );

  const handleClickDeleteListItem = useCallback(
    (productNo: number, id: number) => () => {
      Alert({
        text: '작성된 문의를 삭제하시겠습니까?',
        showCancelButton: true,
        handleClickConfirmButton: () => handleDeleteInquiryItem(productNo, id),
      });
    },
    [handleDeleteInquiryItem],
  );

  const handleSave = async (params: UpdateMutateParams) => {
    await mutateUpdate(params);
  };

  const loadMoreRows = () => {
    if (!isFetchingNextPage && hasNextPage) {
      return fetchNextPage();
    }
    return Promise.resolve(false);
  };

  const isRowLoaded = ({ index }: { index: number }) => {
    const target = flatPages[index];
    return !!target;
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!isDeleteMutationSuccess) {
      return;
    }
    handleInvalidate();
  }, [handleInvalidate, isDeleteMutationSuccess]);

  useEffect(() => {
    if (!isUpdateMutationSuccess) {
      return;
    }
    handleInvalidatePC();
    setEditDialogOpen(false);
  }, [handleInvalidatePC, isUpdateMutationSuccess, resetUpdateMutation]);

  useEffect(() => {
    if (!isDeleteMutationError) {
      return;
    }
    resetDeleteMutation();
    Alert({
      text: '네트워크 오류가 발생했습니다.\n잠시후 다시 시도해 주세요.',
    });
  }, [isDeleteMutationError, resetDeleteMutation]);

  const renderItem: ListRowRenderer = ({ key, index, parent, style }) => {
    const itemData = flatPages[index];
    return (
      <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {({ measure }) => {
          if (!itemData) {
            return <ListItemLoading style={style} />;
          }
          const { id, contentProductNo } = itemData;
          const expanded = id === head(expandedItem);
          return (
            <ListItem
              {...itemData}
              measure={measure}
              style={style}
              onClick={handleClickListItem(id, index)}
              expanded={expanded}
              onClickEdit={isPC ? handleOpenEditDialog : handleClickEditListItem()}
              onClickDelete={handleClickDeleteListItem(contentProductNo, id)}
            />
          );
        }}
      </CellMeasurer>
    );
  };

  const renderList = () => {
    if (isError) {
      return <ListItemError />;
    }
    if (isSuccess && isInquiryProductsEmpty) {
      return <ListItemEmpty />;
    }
    if (isSuccess) {
      return (
        <>
          <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={size} threshold={10}>
            {({ onRowsRendered, registerChild }) => (
              <WindowScroller>
                {({ height, isScrolling, scrollTop }) => (
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <FixedSizeList
                        ref={registerChild}
                        width={width}
                        height={height}
                        autoHeight
                        deferredMeasurementCache={cache}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                        rowRenderer={renderItem}
                        rowCount={size}
                        rowHeight={cache.rowHeight}
                        onRowsRendered={onRowsRendered}
                      />
                    )}
                  </AutoSizer>
                )}
              </WindowScroller>
            )}
          </InfiniteLoader>
          {isPC && (
            <EditDialog
              inquiryProductItem={selectedItem}
              open={editDialogOpen}
              onClose={handleCloseEditDialog}
              isLoading={isUpdateMutationLoading}
              onSave={handleSave}
            />
          )}
        </>
      );
    }
    return (
      <Repeat count={10}>
        <ListItemLoading />
      </Repeat>
    );
  };

  return <ul>{renderList()}</ul>;
};

export default ListContainer;
