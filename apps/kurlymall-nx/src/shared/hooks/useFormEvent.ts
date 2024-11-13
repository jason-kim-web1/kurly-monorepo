import { useFormikContext } from 'formik';
import { useCallback, useMemo } from 'react';

type InputEventType = { name: string; value: string };
type TouchEventType = { name: string; value: boolean };

export function useFormEvent<T>() {
  const formikContext = useFormikContext<T>();
  const { values, touched, handleChange, setFieldTouched, errors } = formikContext;

  const getTouched = useMemo(() => {
    return touched;
  }, [touched]);

  const getErrors = useMemo(() => {
    return errors;
  }, [errors]);

  const handleInputChange = useCallback(
    (event: InputEventType) => {
      if (!getTouched[event.name as keyof typeof values]) {
        setFieldTouched(event.name, true);
      }

      handleChange({ target: event });
    },
    [getTouched, handleChange, setFieldTouched],
  );

  const handleCheckboxChange = useCallback(
    (event: TouchEventType) => {
      handleChange({ target: event });
    },
    [handleChange],
  );

  const validationEvents = useCallback(
    (key: string): { touched: boolean; validationMessage: string } => {
      return {
        touched: (getTouched[key as keyof typeof values] as boolean) ?? false,
        validationMessage: (getErrors[key as keyof typeof values] as string) ?? '',
      };
    },
    [getErrors, getTouched],
  );

  return {
    handleChange: handleInputChange,
    handleSelect: handleCheckboxChange,
    errors,
    touched,
    values,
    validationEvents,
    context: {
      ...formikContext,
    },
  };
}
