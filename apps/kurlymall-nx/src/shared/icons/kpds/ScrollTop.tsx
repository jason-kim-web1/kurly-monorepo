import { vars } from '@thefarmersfront/kpds-css';

interface Props {
  ellipseWidth?: number;
  ellipseHeight?: number;
  ellipseStroke?: string;
  ellipseFill?: string;
  arrowStroke?: string;
  arrowWidth?: number;
  arrowHeight?: number;
}

export default function ScrollTop({
  ellipseWidth = 48,
  ellipseHeight = 48,
  ellipseStroke = vars.color.line.$line1,
  ellipseFill = vars.color.background.$background1,
  arrowStroke = vars.color.main.$secondary,
  arrowWidth = 24,
  arrowHeight = 24,
}: Props) {
  return (
    <svg width={ellipseWidth} height={ellipseHeight} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={arrowWidth} cy={arrowHeight} r="23.5" fill={ellipseFill} stroke={ellipseStroke} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.999 14.5L33.1914 23.6924L31.7772 25.1066L23.999 17.3284L16.2209 25.1066L14.8066 23.6924L23.999 14.5Z"
        fill={arrowStroke}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.999 33.3996V16.3996H24.999V33.3996H22.999Z"
        fill={arrowStroke}
      />
    </svg>
  );
}
