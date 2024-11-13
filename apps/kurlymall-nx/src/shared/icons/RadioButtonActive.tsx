import COLOR from '../constant/colorset';

interface Props extends React.SVGAttributes<SVGElement> {
  fillWhite: string;
  fillPurple: string;
}

export default function RadioButtonActive({
  width = 18,
  height = 18,
  fillWhite = COLOR.kurlyWhite,
  fillPurple = COLOR.kurlyPurple,
  ...props
}: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill={fillPurple}
      />
      <path
        d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
        fill={fillWhite}
      />
    </svg>
  );
}
