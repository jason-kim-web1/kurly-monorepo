import { useDispatch } from 'react-redux';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '../../shared/store';
import { UserTermsType } from '../../shared/interfaces/UserTerms';
import { getUserTerms, getUserTermsDetails, setVersion } from '../slice';
import { Agreed, termsArray } from '../../member/membership/shared/constants';
import { getFile } from '../../shared/api';

export default function useUserTerms(terms: UserTermsType) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTerms(terms));
  }, [dispatch, terms]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setVersion(Number(event.target.value)));
      dispatch(getUserTermsDetails(terms));
    },
    [dispatch, terms],
  );

  const { userTermsItem, selectedVersion, details } = useAppSelector(({ userTerms }) => userTerms);

  const fetchValue = userTermsItem.find(({ majorVersion }) => majorVersion === selectedVersion);
  const value = fetchValue?.majorVersion;
  const options = userTermsItem.map(({ title, majorVersion }) => ({
    name: title,
    value: majorVersion,
  }));

  const [kurlyMembersTerms, setKurlyMembersTerms] = useState<string>('');

  useEffect(() => {
    const loadHtmlFile = async () => {
      const termsObject = termsArray.find(({ id }) => id === Agreed.terms);

      if (termsObject) {
        try {
          const response = await getFile(termsObject.link);

          setKurlyMembersTerms(response as string);
        } catch (err) {
          console.error(err);
        }
      }
    };

    loadHtmlFile();
  }, []);

  return {
    kurlyMembersTerms,
    details,
    value,
    options,
    handleChange,
  };
}
