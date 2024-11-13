import COLOR from '../constant/colorset';

export default function UserWithPlusIcon({ width = 20, height = 16, ...props }: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      {...props}
    >
      <path
        d="M9.15834 7.04947C10.7573 7.04947 12.0536 5.75324 12.0536 4.15425C12.0536 2.55527 10.7573 1.25903 9.15834 1.25903C7.55936 1.25903 6.26312 2.55527 6.26312 4.15425C6.26312 5.75324 7.55936 7.04947 9.15834 7.04947Z"
        stroke={COLOR.joinOrderPeopleColor}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <mask
        id="mask0_1718_138"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="8"
        width="18"
        height="9"
      >
        <path
          d="M16.6036 16.3562C15.8812 13.2544 13.4604 9.40771 9.07222 9.40771H9.07991C4.68402 9.40771 2.27089 13.2462 1.54849 16.3562"
          stroke="#257CD8"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_1718_138)">
        <rect x="0.969238" y="3.36938" width="15.8824" height="11.6471" fill={COLOR.joinOrderPeopleColor} />
      </g>
      <path d="M16.9519 3.98853V8.98853" stroke={COLOR.joinOrderPeopleColor} strokeWidth="1.5" />
      <path d="M19.4515 6.48828L14.4515 6.48828" stroke={COLOR.joinOrderPeopleColor} strokeWidth="1.5" />
    </svg>
  );
}
