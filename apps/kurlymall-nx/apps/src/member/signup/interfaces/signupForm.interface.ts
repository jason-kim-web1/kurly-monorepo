import { AddressInfomation } from '.';

export interface SignupForm {
  id: string;
  name: string;
  addressInfomation: AddressInfomation;
  password: string;
  passwordConfirm: string;
  recommender: string;
  eventName: string;
}
