export default function parsePlccContentStrToElement(str: string) {
  const priceAndOtherTextRegex = /(\d{1,3}(?:,\d{3})*\s?원)/g;
  const priceAndOtherMatches = str.match(priceAndOtherTextRegex);
  if (!priceAndOtherMatches) {
    return str;
  }

  return str.replace(new RegExp(priceAndOtherTextRegex, 'g'), '<strong>$1</strong>');
}
