import styled from '@emotion/styled';

import COLOR from '../../../../../../../shared/constant/colorset';

import { Calendar24x24C333, Option24x24C333 } from '../../../../../../../shared/images';
import { getFormattedDate } from '../../../../../shared/utils/productDetailState';

const Button = styled.button<{ hasOption: boolean; isProductOption: boolean }>`
  display: block;
  width: 100%;
  padding: ${({ hasOption }) => (hasOption ? '13px 17px 14px' : '12px 17px 9px')};
  font-weight: 600;
  font-size: 15px;
  color: ${COLOR.kurlyGray800};
  line-height: ${({ hasOption }) => (hasOption ? '20px' : '22px')};
  text-align: left;
  flex-direction: column;
  justify-content: flex-start;
  border-left: 1px solid ${COLOR.kurlyGray200};
  &:first-of-type {
    border-left: none;
  }
`;

const Icon = styled.img<{ hasOption: boolean }>`
  display: ${(props) => (props.hasOption ? 'block' : 'inline-block')};
  padding-bottom: ${(props) => (props.hasOption ? '8px' : '0px')};
  margin-right: 18px;
`;

const Text = styled.span<{ hasOption: boolean }>`
  display: ${(props) => (props.hasOption ? '-webkit-box' : 'inline-block')};
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  line-height: 20px;
`;

interface Props {
  buttonIndex: number;
  isProductOption: boolean;
  hasOption: boolean;
  selectedOption: string;
  onClickOpenModalWithSection(index: number): void;
}

export default function CalendarTypOptionButton({
  buttonIndex,
  isProductOption,
  hasOption,
  selectedOption,
  onClickOpenModalWithSection,
}: Props) {
  return (
    <Button
      hasOption={hasOption}
      isProductOption={isProductOption}
      onClick={() => onClickOpenModalWithSection(buttonIndex)}
    >
      <Icon src={isProductOption ? Option24x24C333 : Calendar24x24C333} alt="option_icon" hasOption={hasOption} />
      <Text hasOption={hasOption}>{getFormattedDate(selectedOption)}</Text>
    </Button>
  );
}
