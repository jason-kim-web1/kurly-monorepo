import COLOR from '../../../../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const Close32x32 = ({ width = 32, height = 32, color = COLOR.kurlyGray450 }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <path
              fill={COLOR.kurlyWhite}
              fillOpacity="0"
              d="M0 0H32V32H0z"
              transform="translate(-884 -270) translate(500 240) translate(384 30)"
            />
            <g stroke={color} strokeLinecap="round">
              <path
                d="M20 20L0 0M0 20L20 0"
                transform="translate(-884 -270) translate(500 240) translate(384 30) translate(6 6)"
              />
            </g>
            <g fill={color}>
              <path
                d="M.784.089l.07.057L10.5 9.793 20.146.146c.196-.195.512-.195.708 0 .173.174.192.443.057.638l-.057.07-9.647 9.646 9.647 9.646c.195.196.195.512 0 .708-.174.173-.443.192-.638.057l-.07-.057-9.646-9.647-9.646 9.647c-.196.195-.512.195-.708 0-.173-.174-.192-.443-.057-.638l.057-.07L9.793 10.5.146.854C-.049.658-.049.342.146.146.32-.027.59-.046.784.09z"
                transform="translate(-884 -270) translate(500 240) translate(384 30) translate(5.5 5.5)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default Close32x32;
