import type { SpecialDealPayload } from '../interfaces/MainSection.interface';

interface Props {
  deals: SpecialDealPayload['deals'];
  initialTime: string;
}

export function mainSpecialDealEndTime({ deals, initialTime }: Props) {
  return deals
    .filter(({ isDisplayTime }) => isDisplayTime)
    .map(({ dealExpireTime }) => new Date(dealExpireTime))
    .reduce((prev, cur) => {
      const prevDate = new Date(prev);
      const curDate = new Date(cur);
      return prevDate > curDate ? prevDate : curDate;
    }, new Date(initialTime));
}
