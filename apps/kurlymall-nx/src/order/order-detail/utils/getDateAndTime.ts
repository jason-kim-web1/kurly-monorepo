import { format } from 'date-fns';

const getDateAndTime = (date: string | number) => {
  return {
    date: format(new Date(date), 'yyyy.MM.dd'),
    time: format(new Date(date), 'HH:mm'),
  };
};

export default getDateAndTime;
