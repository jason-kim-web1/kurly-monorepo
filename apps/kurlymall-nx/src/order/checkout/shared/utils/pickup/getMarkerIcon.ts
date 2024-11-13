interface Params extends Partial<naver.maps.HtmlIcon> {
  size: { width: number; height: number };
}

export const defaultMarkerIcon = ({ size, anchor }: Params): naver.maps.HtmlIcon => {
  const element = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 24 28" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.639 26.2937C13.9833 23.6052 16.6155 21.8332 18.8936 19.8722C21.1456 17.9335 22.5716 15.0619 22.5716 11.8572C22.5716 6.01876 17.8386 1.28577 12.0001 1.28577C6.1617 1.28577 1.42871 6.01876 1.42871 11.8572C1.42871 15.0618 2.85466 17.9335 5.10668 19.8721C7.38471 21.8332 10.017 23.6052 11.3612 26.2937C11.6245 26.8201 12.3758 26.8201 12.639 26.2937Z" fill="#CB98FA"/>
    <path d="M21.8216 11.8572C21.8216 14.8343 20.4978 17.5015 18.4042 19.3038L19.3829 20.4406C21.7934 18.3655 23.3216 15.2894 23.3216 11.8572H21.8216ZM12.0001 2.03577C17.4244 2.03577 21.8216 6.43297 21.8216 11.8572H23.3216C23.3216 5.60454 18.2528 0.535767 12.0001 0.535767V2.03577ZM2.17871 11.8572C2.17871 6.43297 6.57591 2.03577 12.0001 2.03577V0.535767C5.74749 0.535767 0.678711 5.60454 0.678711 11.8572H2.17871ZM5.59599 19.3037C3.50242 17.5015 2.17871 14.8343 2.17871 11.8572H0.678711C0.678711 15.2894 2.2069 18.3654 4.61737 20.4405L5.59599 19.3037ZM10.6904 26.6291C11.23 27.7083 12.7702 27.7083 13.3098 26.6291L11.9682 25.9583C11.9674 25.9598 11.9684 25.9575 11.972 25.9536C11.9756 25.9498 11.9798 25.9464 11.9843 25.9438C11.9926 25.9389 11.9982 25.9385 12.0001 25.9385C12.002 25.9385 12.0076 25.9389 12.016 25.9438C12.0204 25.9464 12.0247 25.9498 12.0282 25.9536C12.0318 25.9575 12.0328 25.9598 12.0321 25.9583L10.6904 26.6291ZM4.61737 20.4405C5.81411 21.4708 6.96669 22.339 8.07574 23.3615C9.15485 24.3564 10.0758 25.3999 10.6904 26.6291L12.0321 25.9583C11.3024 24.4989 10.2351 23.3122 9.09251 22.2587C7.97985 21.2329 6.67728 20.2346 5.59599 19.3037L4.61737 20.4405ZM18.4042 19.3038C17.323 20.2346 16.0204 21.2329 14.9077 22.2587C13.7651 23.3122 12.6978 24.4989 11.9682 25.9583L13.3098 26.6291C13.9244 25.3999 14.8454 24.3564 15.9245 23.3615C17.0335 22.339 18.1861 21.4708 19.3829 20.4406L18.4042 19.3038Z" fill="#A06ACE"/>
    <circle cx="12" cy="11.8601" r="4" fill="white"/>
  </svg>`;

  return {
    content: element,
    size,
    anchor,
  };
};

export const selectedMarkerIcon = ({ size, anchor }: Params): naver.maps.HtmlIcon => {
  const element = `
  <svg width="${size.width}" height="${size.height}" viewBox="0 0 42 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse opacity="0.15" cx="21" cy="47" rx="8.5" ry="4" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.118 45.7639C24.4705 41.059 29.0771 37.958 33.0636 34.5261C37.0046 31.1334 39.5 26.1081 39.5 20.5C39.5 10.2827 31.2173 2 21 2C10.7827 2 2.5 10.2827 2.5 20.5C2.5 26.1081 4.99537 31.1334 8.93635 34.5261C12.9229 37.958 17.5295 41.059 19.882 45.7639C20.3426 46.6852 21.6574 46.6852 22.118 45.7639Z" fill="#363A40"/>
    <path d="M38.75 20.5C38.75 25.8806 36.3569 30.7014 32.5743 33.9577L33.553 35.0945C37.6524 31.5654 40.25 26.3356 40.25 20.5H38.75ZM21 2.75C30.8031 2.75 38.75 10.6969 38.75 20.5H40.25C40.25 9.86852 31.6315 1.25 21 1.25V2.75ZM3.25 20.5C3.25 10.6969 11.1969 2.75 21 2.75V1.25C10.3685 1.25 1.75 9.86852 1.75 20.5H3.25ZM9.42567 33.9577C5.64314 30.7014 3.25 25.8806 3.25 20.5H1.75C1.75 26.3356 4.34761 31.5654 8.44704 35.0945L9.42567 33.9577ZM19.2111 46.0993C19.9482 47.5734 22.0518 47.5734 22.7889 46.0993L21.4472 45.4285C21.263 45.797 20.737 45.797 20.5528 45.4285L19.2111 46.0993ZM8.44704 35.0945C10.4981 36.8601 12.5713 38.4283 14.5136 40.219C16.4258 41.9821 18.0924 43.8619 19.2111 46.0993L20.5528 45.4285C19.319 42.961 17.5061 40.9378 15.5303 39.1162C13.5845 37.3222 11.3612 35.6239 9.42567 33.9577L8.44704 35.0945ZM32.5743 33.9577C30.6388 35.6239 28.4155 37.3222 26.4697 39.1162C24.4939 40.9378 22.681 42.961 21.4472 45.4285L22.7889 46.0993C23.9076 43.8619 25.5742 41.9821 27.4864 40.219C29.4287 38.4283 31.5019 36.8601 33.553 35.0945L32.5743 33.9577Z" fill="#252628"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.3332 20.4446V20.4447H12.6665V20.4446H29.3332ZM12.6665 21.8891H29.3332L29.3332 27.6667C29.3332 28.5871 28.587 29.3333 27.6665 29.3333H23.2223V25.4444C23.2223 24.8308 22.7248 24.3333 22.1112 24.3333H19.8889C19.2753 24.3333 18.7778 24.8308 18.7778 25.4444V29.3333H14.3332C13.4127 29.3333 12.6665 28.5871 12.6665 27.6667V21.8891Z" fill="white"/>
    <path d="M11 14.3334C11 13.4129 11.7462 12.6667 12.6667 12.6667H29.3333C30.2538 12.6667 31 13.4129 31 14.3334V18.7779C31 19.6983 30.2538 20.4445 29.3333 20.4445H12.6667C11.7462 20.4445 11 19.6983 11 18.7779V14.3334Z" fill="#DFC8F5"/>
    <line x1="11" y1="16.5556" x2="31" y2="16.5556" stroke="#CB98FA" stroke-width="1.66667"/>
  </svg>`;

  return {
    content: element,
    size,
    anchor,
  };
};
