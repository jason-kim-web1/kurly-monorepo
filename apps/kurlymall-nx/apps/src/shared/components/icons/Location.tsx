import COLOR from '../../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function Location({ width = 24, height = 24, color = COLOR.kurlyGray450 }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="path-1-outside-1_686_65482"
        maskUnits="userSpaceOnUse"
        x="5"
        y="2.6001"
        width="14"
        height="18"
        fill="black"
      >
        <rect fill="white" x="5" y="2.6001" width="14" height="18" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 9.55904C17.9348 6.25371 15.2668 3.6001 11.9643 3.6001C8.64407 3.6001 6 6.26916 6 9.61752C6 11.7361 7.10633 13.9 8.97678 15.9954C9.61787 16.7136 10.3029 17.3716 11.0099 17.9774C11.059 18.0195 11.1137 18.0657 11.1717 18.1141L11.9128 18.7201L11.9635 18.6924L12.0589 18.6225L12.4768 18.3057C12.6298 18.1862 12.7893 18.0577 12.9556 17.9192C13.6544 17.3377 14.3447 16.6882 14.9886 15.9783C16.8784 13.8946 17.9999 11.7108 18 9.55904ZM12 12.0001C13.3255 12.0001 14.4 10.9256 14.4 9.6001C14.4 8.27461 13.3255 7.2001 12 7.2001C10.6745 7.2001 9.6 8.27461 9.6 9.6001C9.6 10.9256 10.6745 12.0001 12 12.0001Z"
        />
      </mask>
      <path
        d="M18 9.55904L19 9.5591C19 9.55251 18.9999 9.54592 18.9998 9.53933L18 9.55904ZM8.97678 15.9954L9.7228 15.3294L8.97678 15.9954ZM11.0099 17.9774L11.6606 17.2181L11.6606 17.2181L11.0099 17.9774ZM11.1717 18.1141L10.5308 18.8818L10.5387 18.8882L11.1717 18.1141ZM11.9128 18.7201L11.2798 19.4942C11.595 19.752 12.0349 19.7929 12.3922 19.5977L11.9128 18.7201ZM11.9635 18.6924L12.4429 19.57C12.4816 19.5489 12.5189 19.5252 12.5545 19.4991L11.9635 18.6924ZM12.0589 18.6225L12.6499 19.4292C12.6543 19.426 12.6587 19.4227 12.663 19.4194L12.0589 18.6225ZM12.4768 18.3057L13.0809 19.1026C13.0848 19.0997 13.0887 19.0967 13.0926 19.0936L12.4768 18.3057ZM12.9556 17.9192L12.3159 17.1506L12.3159 17.1506L12.9556 17.9192ZM14.9886 15.9783L15.7293 16.6501H15.7293L14.9886 15.9783ZM11.9643 4.6001C14.7137 4.6001 16.9456 6.80933 17.0002 9.57875L18.9998 9.53933C18.9241 5.6981 15.82 2.6001 11.9643 2.6001V4.6001ZM7 9.61752C7 6.8129 9.20486 4.6001 11.9643 4.6001V2.6001C8.08329 2.6001 5 5.72541 5 9.61752H7ZM9.7228 15.3294C7.93024 13.3213 7 11.3867 7 9.61752H5C5 12.0855 6.28242 14.4786 8.23076 16.6613L9.7228 15.3294ZM11.6606 17.2181C10.9828 16.6372 10.3304 16.0101 9.7228 15.3294L8.23076 16.6613C8.90535 17.417 9.62308 18.106 10.3591 18.7367L11.6606 17.2181ZM11.8125 17.3464C11.7568 17.2999 11.7056 17.2566 11.6606 17.2181L10.3591 18.7367C10.4125 18.7824 10.4706 18.8315 10.5308 18.8817L11.8125 17.3464ZM12.5458 17.946L11.8047 17.3399L10.5387 18.8882L11.2798 19.4942L12.5458 17.946ZM11.4841 17.8148L11.4334 17.8425L12.3922 19.5977L12.4429 19.57L11.4841 17.8148ZM11.4679 17.8158L11.3725 17.8857L12.5545 19.4991L12.6499 19.4292L11.4679 17.8158ZM11.8726 17.5089L11.4548 17.8256L12.663 19.4194L13.0809 19.1026L11.8726 17.5089ZM12.3159 17.1506C12.1574 17.2825 12.0059 17.4046 11.8609 17.5178L13.0926 19.0936C13.2537 18.9677 13.4212 18.8328 13.5953 18.6878L12.3159 17.1506ZM14.2479 15.3065C13.6387 15.9782 12.9828 16.5956 12.3159 17.1506L13.5953 18.6879C14.3261 18.0797 15.0508 17.3982 15.7293 16.6501L14.2479 15.3065ZM17 9.55898C16.9999 11.3606 16.0549 13.314 14.2479 15.3065L15.7293 16.6501C17.7018 14.4752 18.9999 12.061 19 9.5591L17 9.55898ZM13.4 9.6001C13.4 10.3733 12.7732 11.0001 12 11.0001V13.0001C13.8778 13.0001 15.4 11.4779 15.4 9.6001H13.4ZM12 8.2001C12.7732 8.2001 13.4 8.8269 13.4 9.6001H15.4C15.4 7.72233 13.8778 6.2001 12 6.2001V8.2001ZM10.6 9.6001C10.6 8.8269 11.2268 8.2001 12 8.2001V6.2001C10.1222 6.2001 8.6 7.72233 8.6 9.6001H10.6ZM12 11.0001C11.2268 11.0001 10.6 10.3733 10.6 9.6001H8.6C8.6 11.4779 10.1222 13.0001 12 13.0001V11.0001Z"
        fill={color}
        mask="url(#path-1-outside-1_686_65482)"
      />
    </svg>
  );
}
