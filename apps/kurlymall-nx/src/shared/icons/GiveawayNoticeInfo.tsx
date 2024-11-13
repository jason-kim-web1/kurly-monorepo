export const GiveawayNoticeInfo = ({ width = 16, height = 16, ...props }: React.SVGAttributes<SVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="8" fill="white" />
      <circle cx="8" cy="12" r="1" fill="#808080" />
      <rect x="7" y="3" width="2" height="7" rx="0.7" fill="#808080" />
    </svg>
  );
};
