import styled from '@emotion/styled';

import FlexButton from './FlexButton';
import ArrowMore from '../../../icons/ArrowMore';

const Text = styled.div({
  fontSize: '14px',
  lineHeight: 'normal',
  color: '#999999',
});

const styles = {
  arrow: (folded: boolean) => ({
    marginLeft: '2px',
    ...(!folded && {
      transform: 'rotate(180deg)',
    }),
  }),
};

interface Props {
  foldedText: string;
  unfoldedText?: string;
  folded: boolean;
  onClick(): void;
}

export default function FoldButton({ foldedText, unfoldedText = '접기', folded = true, onClick }: Props) {
  return (
    <FlexButton onClick={onClick} type="button">
      <Text>{folded ? foldedText : unfoldedText}</Text>
      <ArrowMore css={styles.arrow(folded)} />
    </FlexButton>
  );
}
