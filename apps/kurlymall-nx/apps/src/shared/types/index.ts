import { ReactNode } from 'react';

import { SHORTCUT_TYPE } from '../constant/shortcut-type';
import type { PropsWithChildrenOnly } from '../interfaces';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

type StrictPropsWithChildren<P = unknown> = P & NonNullable<PropsWithChildrenOnly>;

type ShortCutType = typeof SHORTCUT_TYPE[keyof typeof SHORTCUT_TYPE];

type Nullable<T> = T | null;

type NullableProperties<T> = {
  [P in keyof T]: T[P] | null;
};

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

type SnakeToCamelCaseNested<T> = T extends object
  ? {
      [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<T[K]>;
    }
  : T;

type ChildrenOnlyProps = {
  children?: ReactNode | Element | JSX.Element;
};

export type {
  Awaited,
  StrictPropsWithChildren,
  ShortCutType,
  Nullable,
  SnakeToCamelCase,
  SnakeToCamelCaseNested,
  ChildrenOnlyProps,
  NullableProperties,
};
