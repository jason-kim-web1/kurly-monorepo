export const getCookie = () => {
  if (typeof window !== 'object') {
    return '';
  }

  return window.document.cookie;
};

export const getCookieOnce = (name: string): string | undefined => {
  const match = getCookie().match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : undefined;
};

export const setCookie = ({
  name,
  value,
  days = 0,
  hours = 0,
}: {
  name: string;
  value: string;
  days?: number;
  hours?: number;
}) => {
  let expires = '';

  if (days || hours) {
    const today = new Date();
    const multiplyTime = (days * 24 + hours) * 60 * 60 * 1000;
    today.setTime(today.getTime() + multiplyTime);
    expires = '; expires=' + today.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

export const deleteCookie = (...cookieName: string[]) => {
  cookieName.forEach((name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  });
};
