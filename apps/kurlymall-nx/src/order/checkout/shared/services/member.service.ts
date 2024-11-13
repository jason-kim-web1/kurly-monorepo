import { readMemberInfo } from '../../../../shared/api';
import { validateAlert } from '../../../../shared/error-handlers/ValidationErrorHandlers';
import { appendHyphenToPhoneNumber, removeHyphen } from '../../../../shared/services';
import { ReceiverInfo } from '../interfaces';
import { validateReceiverInfo } from '../utils/validateReceiverInfo';

export const getOrderer = async (): Promise<ReceiverInfo> => {
  const data = await readMemberInfo();

  const response: ReceiverInfo = {
    name: data.name,
    email: data.email,
    phone: appendHyphenToPhoneNumber(removeHyphen(data.mobile_no)),
  };

  try {
    const validateReceiver = validateReceiverInfo(response);
    validateAlert(validateReceiver);

    return response;
  } catch (err) {
    throw err;
  }
};
