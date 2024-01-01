import { AddressType } from '../enums/address-type.enum';

export interface IUserAddresses {
  id?: string;
  user?: string;
  addressLine1: string;
  addressLine2: string;
  pinCode: number;
  city: string;
  state: string;
  type: AddressType;
}
