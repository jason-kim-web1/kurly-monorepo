import { MainSite } from '../../../main/interfaces/MainSection.interface';

interface Props {
  sword: string;
  site: MainSite;
}

export const getQvtQuery = ({ sword, site }: Props) => {
  return {
    sword,
    qvt: 0,
    ...(site === 'BEAUTY' && { site: 'beauty' }),
  };
};
