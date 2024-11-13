import { ConditionText } from '../styled/common';

interface Props {
  text: string;
  className?: string;
}

export default function ConditionItem({ text, className }: Props) {
  if (!text) {
    return null;
  }

  return (
    <ConditionText variant="$largeRegular" className={className}>
      {text}
    </ConditionText>
  );
}
