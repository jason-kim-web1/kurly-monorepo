import { useEffect, useState } from 'react';

const currentYear = new Date().getFullYear();
const MINIMUM_AGE = 14;
const MAXIMUM_AGE = 100;
const MID_MIN_RANGE = 3;
const MID_MAX_RANGE = 7;
const LATE_MAX_RANGE = 6;
const SENIOR_AGE = 70;
const MAXIMUM_YEAR_LENGTH = 4;

export default function useAgeGroup(inputYear: string) {
  const [ageGroup, setAgeGroup] = useState('');
  const [isValid, setIsValid] = useState(false);

  const isValidAgeLength = inputYear.length === MAXIMUM_YEAR_LENGTH;
  const age = currentYear - parseInt(inputYear);
  const ageLastNumber = parseInt(String(age).slice(-1, 2));

  const getAgeRange = () => {
    if (ageLastNumber > LATE_MAX_RANGE) {
      return '후반';
    } else if (ageLastNumber > MID_MIN_RANGE && ageLastNumber < MID_MAX_RANGE) {
      return '중반';
    } else {
      return '초반';
    }
  };

  const updateAgeGroup = ({ displayAge, displayRange }: { displayAge: number; displayRange: string }) => {
    setIsValid(true);
    setAgeGroup(`${displayAge}대 ${displayRange}`);
  };

  useEffect(() => {
    const isValidAge = age >= MINIMUM_AGE && age <= MAXIMUM_AGE;
    if (!isValidAgeLength || !isValidAge) {
      setAgeGroup('');
      setIsValid(false);
      return;
    }

    if (age >= SENIOR_AGE) {
      updateAgeGroup({ displayAge: SENIOR_AGE, displayRange: '이상' });
      return;
    }

    const displayRange = getAgeRange();
    const displayAge = Math.floor(age / 10) * 10;
    updateAgeGroup({ displayAge, displayRange });
  }, [age, getAgeRange, isValidAgeLength]);

  return {
    ageGroup,
    isValid,
  };
}
