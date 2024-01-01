import { IUserAddresses } from './../models/interfaces/user-address.interface';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../models/dto/cerate-user.dto';
import { IUsers } from '../models/interfaces/user.interface';

@Injectable()
export class UserHelperService {
  dtoToEntity(userDto: CreateUserDto): IUsers {
    return {
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
      mobileNumber: userDto.mobileNumber,
      dob: userDto.dob,
      addresses: userDto.addresses.map((address: IUserAddresses) => ({
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        pinCode: address.pinCode,
        city: address.city,
        state: address.state,
        type: address.type,
      })),
    };
  }
}
