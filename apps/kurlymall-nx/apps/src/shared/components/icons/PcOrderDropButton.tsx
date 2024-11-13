import COLOR from '../../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  stroke?: string;
  isOpen?: boolean;
}

export const PcOrderDropButton = ({ width = 30, height = 30, stroke = COLOR.kurlyGray800, isOpen = false }: Props) => {
  const transform = isOpen ? 'rotate(-45 15.5 16.5)' : 'rotate(135 15.5 16.5)';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path id="7a02qqg3ja" d="M11 12h9v9" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h30v30H0z" />
        <use stroke={stroke} strokeWidth="2" strokeLinecap="square" transform={transform} href="#7a02qqg3ja" />
      </g>
    </svg>
  );
};
