import COLOR from '../../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  stroke?: string;
  lineStroke?: string;
}

export default function ModifyButton({
  width = 48,
  height = 48,
  stroke = COLOR.kurlyWhite,
  lineStroke = COLOR.kurlyGray350,
}: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_51_22049" maskUnits="userSpaceOnUse" x="14" y="14" width="20" height="20">
        <path fillRule="evenodd" clipRule="evenodd" d="M14 14H34V33.9552H14V14Z" fill={stroke} />
      </mask>
      <g mask="url(#mask0_51_22049)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.567 20.6328L27.3533 17.4191L29.5278 15.2444L32.7312 18.4687L30.567 20.6328ZM18.5065 32.6934H15.2102V29.5622L26.3954 18.377L29.6091 21.5907L18.5065 32.6934ZM33.6691 17.6822L30.283 14.3245C29.8456 13.8905 29.1397 13.892 28.7038 14.3279L14.0886 28.9431C14.0318 28.9996 14 29.0768 14 29.1569V32.8367C14 33.4544 14.5009 33.9553 15.1185 33.9553H18.86C18.9402 33.9553 19.0173 33.9232 19.0739 33.8666L33.6722 19.2684C34.1107 18.8301 34.1092 18.1187 33.6691 17.6822Z"
          fill={lineStroke}
        />
      </g>
    </svg>
  );
}
