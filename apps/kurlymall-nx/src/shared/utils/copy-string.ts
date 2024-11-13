// base on https://github.com/zenorocha/clipboard.js
const createFakeElement = (elementValue: string) => {
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  const fakeElement = document.createElement('textarea');
  fakeElement.style.fontSize = '12pt';
  fakeElement.style.border = '0';
  fakeElement.style.padding = '0';
  fakeElement.style.margin = '0';
  fakeElement.style.position = 'absolute';
  fakeElement.style[isRTL ? 'right' : 'left'] = '-9999px';
  const yPosition = window.pageYOffset || document.documentElement.scrollTop;
  fakeElement.style.top = `${yPosition}px`;

  fakeElement.setAttribute('readonly', '');
  fakeElement.value = elementValue;

  return fakeElement;
};

export default function setClipboard(copyString: string) {
  const fakeElement = createFakeElement(copyString);
  document.body.appendChild(fakeElement);
  fakeElement.select();
  document.execCommand('copy');
  document.body.removeChild(fakeElement);
}
