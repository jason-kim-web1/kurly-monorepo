// this file is conditionally added/removed to next-env.d.ts
// if the static image import handling is enabled

interface StaticImageData {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
}

declare module '*.png' {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const content: any;

  export default content;
}

declare module '*.svg' {
  /**
   * Use `any` to avoid conflicts with
   * `@svgr/webpack` plugin or
   * `babel-plugin-inline-react-svg` plugin.
   */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const content: any;

  export default content;
}

declare module '*.jpg' {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const content: any;

  export default content;
}

declare module '*.jpeg' {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const content: any;

  export default content;
}

declare module '*.gif' {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const content: any;

  export default content;
}

declare module '*.webp' {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const content: any;

  export default content;
}

declare module '*.ico' {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const content: any;

  export default content;
}

declare module '*.bmp' {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const content: any;

  export default content;
}

export type ImageFormat = 'png' | 'svg' | 'jpg' | 'jpeg' | 'gif' | 'webp' | 'ico' | 'bmp';
