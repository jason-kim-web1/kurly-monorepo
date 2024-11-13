export const parseTrackingHtml = (html: string) => {
  const sweetTrackerUrl = 'https://info.sweettracker.co.kr';
  const relativePathRegex = /\.\.\/\.\./g;
  const webjarsRegex = /(\/webjars\/)/gi;

  const modifiedRelativeUrl = html.replace(relativePathRegex, sweetTrackerUrl);
  const parsedHtml = modifiedRelativeUrl.replace(webjarsRegex, `${sweetTrackerUrl}$1`);

  return { parsedHtml };
};
