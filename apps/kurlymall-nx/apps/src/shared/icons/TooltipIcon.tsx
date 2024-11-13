import COLOR from '../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  stroke?: string;
}

export default function TooltipIcon({ width = 21, height = 21, stroke = COLOR.kurlyGray350 }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 21" fill="none">
      <circle cx="10.5" cy="10.5" r="6.9" stroke={stroke} strokeWidth="1.2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.19735 8.7317H7.80005C7.84762 7.32251 8.81681 6.2998 10.5828 6.2998C12.2119 6.2998 13.3 7.23926 13.3 8.55332C13.3 9.46305 12.8482 10.0993 12.0395 10.5809C11.2606 11.0387 11.0406 11.342 11.0406 11.9306V12.2695H9.66113L9.65518 11.8652C9.60167 10.9733 9.94654 10.4382 10.7671 9.95656L10.9414 9.84757C11.5443 9.45619 11.7541 9.14643 11.7541 8.60683C11.7541 7.98845 11.2546 7.54251 10.5055 7.54251C9.73843 7.54251 9.24491 8.00629 9.19735 8.7317ZM9.42924 14.1603C9.42924 14.7312 9.82167 15.1058 10.4163 15.1058C11.0228 15.1058 11.4033 14.7312 11.4033 14.1603C11.4033 13.5836 11.0228 13.209 10.4163 13.209C9.82167 13.209 9.42924 13.5836 9.42924 14.1603Z"
        fill="#CCCCCC"
      />
    </svg>
  );
}
