import CheckBoxActive from '../../icons/CheckBoxActive';
import CheckBoxInactive from '../../icons/CheckBoxInactive';
import COLOR from '../../constant/colorset';

interface Props {
  width?: number | string;
  height?: number | string;
  disabled?: boolean;
  checked: boolean;
  iconColor?: string;
}

export default function CheckIcon({
  width = 24,
  height = 24,
  disabled = false,
  checked = false,
  iconColor = COLOR.kurlyPurple,
}: Props) {
  return (
    <>
      {checked ? (
        <CheckBoxActive width={width} height={height} fill={iconColor} />
      ) : (
        <CheckBoxInactive width={width} height={height} fill={disabled ? COLOR.btnGray : COLOR.kurlyWhite} />
      )}
    </>
  );
}
