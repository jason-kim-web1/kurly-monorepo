interface Props {
  compare: string | number;
  compareKey: string;
  key?: string;
  payload: any;
}

export function getPayLoadData({ compare, compareKey, payload, key }: Props) {
  try {
    const payLoadData = key ? payload[key] : payload;

    const payLoad =
      payLoadData.reduce((acc: any, cur: any) => {
        if (Number(cur[compareKey]) === compare) {
          acc = cur;
        }

        return acc;
      }, {}) || null;

    return payLoad;
  } catch (e) {
    return null;
  }
}
