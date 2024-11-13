import { eq, isNull } from 'lodash';
import * as Yup from 'yup';

import type { AlternativeSuggestion, DisplayMessage, SpellingCorrection } from '../types';

const SPELLING_CORRECTION_SCHEMA: Yup.SchemaOf<SpellingCorrection> = Yup.object({
  type: Yup.mixed<'SPELLING_CORRECTION'>().oneOf(['SPELLING_CORRECTION']).required(),
  header: Yup.object()
    .shape({
      keyword: Yup.string().required(),
      description: Yup.string().required(),
    })
    .defined(),
  footer: Yup.object()
    .shape({
      keyword: Yup.string().required(),
      description: Yup.string().required(),
    })
    .defined(),
}).defined();

const ALTERNATIVE_SUGGESTION_SCHEMA: Yup.SchemaOf<AlternativeSuggestion> = Yup.object({
  type: Yup.mixed<'ALTERNATIVE_SUGGESTION'>().oneOf(['ALTERNATIVE_SUGGESTION']).required(),
  header: Yup.object()
    .shape({
      keyword: Yup.string().required(),
      description: Yup.string().required(),
    })
    .defined(),
  footer: Yup.object()
    .shape({
      keyword: Yup.string().nullable().oneOf([null]),
      description: Yup.string().required(),
    })
    .defined(),
}).defined();

export const validateDisplayMessage = (displayMessage: DisplayMessage) => {
  if (isNull(displayMessage)) {
    return false;
  }

  if (eq(displayMessage.type, 'SPELLING_CORRECTION')) {
    try {
      const isValid = SPELLING_CORRECTION_SCHEMA.validateSync(displayMessage);
      if (!isValid) {
        throw new Error('SPELLING_CORRECTION type에 맞지 않는 값입니다.');
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  if (eq(displayMessage.type, 'ALTERNATIVE_SUGGESTION')) {
    try {
      const isValid = ALTERNATIVE_SUGGESTION_SCHEMA.validateSync(displayMessage);
      if (!isValid) {
        throw new Error('ALTERNATIVE_SUGGESTION type에 맞지 않는 값입니다.');
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  return false;
};
