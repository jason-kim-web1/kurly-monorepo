import DOMPurify from 'isomorphic-dompurify';

import { HTML_SANITIZE_ALLOWED_URI_REGEXP } from '../../constant';

interface Props {
  className?: string;
  html: string;
}

export default function RawHTML({ className, html }: Props) {
  return (
    <div
      className={className}
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html, {
          FORCE_BODY: true,
          ADD_TAGS: ['iframe'],
          ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
          ALLOWED_URI_REGEXP: HTML_SANITIZE_ALLOWED_URI_REGEXP,
        }),
      }}
    />
  );
}
