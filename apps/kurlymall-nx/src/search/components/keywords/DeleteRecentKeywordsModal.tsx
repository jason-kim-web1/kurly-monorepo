import styled from '@emotion/styled';

import SlideModal from '../../../shared/components/modal/SlideModal';
import COLOR from '../../../shared/constant/colorset';

const DeleteOptionList = styled.div``;

const DeleteOption = styled.button`
  width: 100%;
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  padding: 18px 20px;
  color: ${COLOR.kurlyGray800};
  -webkit-tap-highlight-color: transparent;
  :active,
  :hover {
    background-color: ${COLOR.bgLightGray};
  }
`;

interface Props {
  isOpen: boolean;
  onClose(): void;
  isDeletable(): void;
  clearRecentSearchedKeywords(): void;
}

export default function DeleteRecentKeywordsModal({
  isOpen,
  onClose,
  isDeletable,
  clearRecentSearchedKeywords,
}: Props) {
  return (
    <SlideModal open={isOpen} onClose={onClose}>
      <DeleteOptionList>
        <DeleteOption onClick={isDeletable}>선택 삭제</DeleteOption>
        <DeleteOption onClick={clearRecentSearchedKeywords}>전체 삭제</DeleteOption>
      </DeleteOptionList>
    </SlideModal>
  );
}
