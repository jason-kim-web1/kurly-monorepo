import Check from '../../icons/Check';
import COLOR from '../../constant/colorset';

interface Props {
  checked: boolean;
  iconColor?: string;
}

export default function CheckFlatIcon({ checked = false, iconColor = COLOR.kurlyPurple }: Props) {
  return (
    <Check
      width={24}
      height={24}
      stroke={checked ? iconColor : COLOR.lightGray}
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 11.5L10.35 16L18.75 8"
    />
  );
}
