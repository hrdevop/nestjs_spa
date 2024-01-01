// fake-data.service.ts

import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from 'src/user-management/models/dto/cerate-user.dto';
import { AddressType } from 'src/user-management/models/enums/address-type.enum';

@Injectable()
export class UserFakeDataService {
  private generateFakeAddress() {
    return {
      addressLine1: faker.location.streetAddress(),
      addressLine2: faker.location.secondaryAddress(),
      pinCode: parseInt(faker.string.numeric(6)),
      city: faker.location.city(),
      state: faker.location.state(),
      type:
        Math.round(Math.random()) === 1 ? AddressType.HOME : AddressType.OFFICE,
    };
  }

  private generateFakeUser(): CreateUserDto {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      mobileNumber: faker.string.numeric(10),
      dob: faker.date.past(),
      addresses: Array.from({ length: Math.round(Math.random() * 5) }, () =>
        this.generateFakeAddress(),
      ),
    };
  }

  generateFakeUsers(count: number): CreateUserDto[] {
    return Array.from({ length: count }, () => this.generateFakeUser());
  }
}
