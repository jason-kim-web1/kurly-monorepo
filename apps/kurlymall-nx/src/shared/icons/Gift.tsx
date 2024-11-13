import * as React from 'react';

export default function Gift({ width = 30, height = 30, ...props }: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h30v30H0z" />
        <g stroke="#5F0080" strokeWidth="1.5">
          <path d="m15 9.099 1.953-2.727a2.282 2.282 0 0 1 1.81-.872C20 5.5 21 6.45 21 7.622a2.06 2.06 0 0 1-.629 1.476c-.001.001-.07.002-.186.002h-2.2l-.164-.001H15zM14 9.099l-1.953-2.727a2.282 2.282 0 0 0-1.81-.872C9 5.5 8 6.45 8 7.622c0 .574.24 1.094.629 1.476.001.001.07.002.186.002h2.2l.164-.001H14z" />
          <path d="M20.082 9H24c.552 0 1 .56 1 1.25v2.5c0 .69-.448 1.25-1 1.25h-1M6.165 14H5c-.552 0-1-.56-1-1.25v-2.5C4 9.56 4.448 9 5 9h3.33M6 14h17v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V14zM14.482 9.391l.034 4M14.482 13.391l.092 11" />
        </g>
      </g>
    </svg>
  );
}