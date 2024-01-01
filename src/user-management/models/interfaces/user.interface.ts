import { IUserAddresses } from './user-address.interface';

export interface IUsers {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  dob: Date;
  addresses: IUserAddresses[];
}
