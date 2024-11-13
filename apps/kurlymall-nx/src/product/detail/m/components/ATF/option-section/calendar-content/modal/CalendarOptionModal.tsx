import styled from '@emotion/styled';

import { last } from 'lodash';

import { useDispatch } from 'react-redux';

import { OptionListType, SelectedOptionType } from '../../../../../../hooks/useGroupProduct';

import ContentList from './ContentList';
import Button from '../../../../../../../../shared/components/Button/Button';
import SlideModal from '../../../../../../../../shared/components/modal/SlideModal';
import Header from './Header';
import COLOR from '../../../../../../../../shared/constant/colorset';
import { changeProductDetail } from '../../../../../../slice';
import { HandleChangeOptionProps } from '../CalendarContent';
import { amplitudeService } from '../../../../../../../../shared/amplitude';
import { SubmitGroupOptionSuccess } from '../../../../../../../../shared/amplitude/events/product/SubmitGroupOptionSuccess';
import { getFusionQueryId } from '../../../../../../shared/utils/productDetailEvent';
import { useAppSelector } from '../../../../../../../../shared/store';
import { hiddenScrollBar } from '../../../../../../../../shared/utils/hidden-scrollbar';

const OptionContents = styled.div`
  @supports (max-height: constant(safe-area-inset-top) -constant(safe-area-inset-bottom)) {
    max-height: calc(100vh - (260px + constant(safe-area-inset-top) + constant(safe-area-inset-bottom)));
  }
  @supports (max-height: env(safe-area-inset-top) - env(safe-area-inset-bottom)) {
    max-height: calc(100vh - (260px + env(safe-area-inset-top) + env(safe-area-inset-bottom)));
  }

  ${hiddenScrollBar({ x: 'hidden', y: 'hidden' })};
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid ${COLOR.bg};
`;

const BottomWrapper = styled.div`
  background: ${COLOR.kurlyWhite};
  padding: 0 12px 8px;
  font-weight: 600;

  .select-option-button {
    span {
      font-weight: 600;
    }
  }
`;

interface Props {
  open: boolean;
  optionListState: OptionListType[];
  openSectionIndex: number;
  onClickClose(): void;
  handleClickOpenSection(sectionIndex: number): void;
  onClickOptionItem({ optionsIndex, option, optionPosition, optionTitle }: HandleChangeOptionProps): void;
  onClickCloseModal(): void;
}

export default function CalendarOptionModal({
  open,
  optionListState,
  openSectionIndex,
  onClickClose,
  handleClickOpenSection,
  onClickOptionItem,
  onClickCloseModal,
}: Props) {
  const { queryId } = useAppSelector(({ productList }) => productList);

  const dispatch = useDispatch();

  const buildSelectedOptionItem = (options: SelectedOptionType[]) => {
    const selectedOptionDescriptions = options.map((it) => it.description ?? '');

    const lastOption = last(options);

    if (!lastOption) {
      return { description: selectedOptionDescriptions };
    }

    const { contentsProductNo, imageUrl, isSoldOut, isPurchaseStatus, prices } = lastOption;

    return {
      description: selectedOptionDescriptions,
      contentsProductNo,
      imageUrl,
      isSoldOut,
      isPurchaseStatus,
      prices,
    };
  };

  const selectedOption = buildSelectedOptionItem(optionListState.map((it) => it.selectedOption));

  const selectedContentsProductNo = selectedOption.contentsProductNo ?? 0;

  const onClickCompleteOptionSelection = (targetNo: number) => {
    if (!selectedContentsProductNo) {
      return;
    }

    dispatch(changeProductDetail(targetNo));

    amplitudeService.logEvent(
      new SubmitGroupOptionSuccess({
        fusionQueryId: getFusionQueryId(queryId),
      }),
    );

    onClickCloseModal();
  };

  return (
    <SlideModal open={open} onClose={onClickClose}>
      <Header selectedOption={selectedOption} />
      <Divider />
      <OptionContents>
        {optionListState.map((option, optionIndex) => (
          <ContentList
            key={optionIndex}
            optionsIndex={optionIndex}
            open={openSectionIndex === optionIndex}
            optionTitle={option.title}
            options={option.options}
            selectedValue={option.selectedOption.description ?? ''}
            clickOpenOptionList={handleClickOpenSection}
            clickOptionItem={onClickOptionItem}
          />
        ))}
      </OptionContents>
      <BottomWrapper>
        <Button
          text="옵션 선택 완료"
          className="select-option-button"
          onClick={() => onClickCompleteOptionSelection(selectedContentsProductNo)}
        />
      </BottomWrapper>
    </SlideModal>
  );
}
