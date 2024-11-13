import { Fragment, PropsWithChildren } from 'react';
import { range } from 'lodash';

interface Props {
  count: number;
}
export default function Repeat(props: PropsWithChildren<Props>) {
  const { count, children } = props;
  if (count <= 0) {
    return null;
  }
  return (
    <Fragment>
      {range(0, count).map((i) => (
        <Fragment key={i}>{children}</Fragment>
      ))}
    </Fragment>
  );
}
