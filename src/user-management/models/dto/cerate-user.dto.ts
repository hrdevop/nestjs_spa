import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsIn,
  ValidateNested,
  ArrayMinSize,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IUserAddresses } from '../interfaces/user-address.interface';
import { AddressType } from '../enums/address-type.enum';
import { IUsers } from '../interfaces/user.interface';

class CreateAddressDto implements IUserAddresses {
  @IsNotEmpty()
  @IsString()
  addressLine1: string;

  @IsOptional()
  @IsString()
  addressLine2: string;

  @IsNotEmpty()
  @IsInt()
  @Min(9999, { message: 'Pin-code should be at least 4 digits' })
  @Max(999999, { message: 'Pin-code should be at most 6 digits' })
  pinCode: number;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsEnum(AddressType, { message: 'Type should be Home or Office' })
  type: AddressType;
}

export class CreateUserDto implements IUsers {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Mobile number should be 10 digits' })
  @MaxLength(10, { message: 'Mobile number should be 10 digits' })
  mobileNumber: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  dob: Date;

  @IsNotEmpty()
  @ArrayMinSize(1, { message: 'At least one address is required' })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses: CreateAddressDto[];
}
