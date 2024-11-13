import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import SignupAdditionalForm from '../components/SignupAdditionalForm';

import { ParsedUrlQuery } from 'querystring';
import { Crypto } from '../../../../../util/security/crypto';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import { NormalSignupFormInterface } from '../../interfaces/NormalSignupForm.interface';

export default function AdditionalFormContainer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleChange } = useFormEvent<NormalSignupFormInterface>();

  const { recommid } = router.query as ParsedUrlQuery & { recommid?: string };

  useEffect(() => {
    if (recommid) {
      try {
        const decryptID = new Crypto().decrypt(recommid, 'utf8');
        if (!decryptID) {
          return;
        }

        handleChange({ name: 'additionalOption', value: 'recommender' });
        handleChange({ name: 'additionalValue', value: decryptID });
      } catch {}
    }
  }, [recommid, dispatch, handleChange]);

  return <SignupAdditionalForm />;
}
