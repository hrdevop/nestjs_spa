import { UserFakeDataService } from 'src/shared/faker/user-management/user-faker.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUsers } from '../models/interfaces/user.interface';
import { Users } from '../models/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { UserAddresses } from '../models/entities/user-address.entity';
import { CreateUserDto } from '../models/dto/cerate-user.dto';

@Injectable()
export class UserService {
  constructor(
    private _userFakeDataService: UserFakeDataService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(UserAddresses)
    private readonly userAddressesRepository: Repository<UserAddresses>,
  ) {}

  async insertFakeData(count: number): Promise<IUsers[]> {
    const fakeData: IUsers[] =
      this._userFakeDataService.generateFakeUsers(count);
    const insertedUsers = await Promise.all(
      fakeData.map(async (user: IUsers) => {
        const userData = this.userRepository.create(user);
        const userSaveData = await this.userRepository.save(userData);

        const addressData = user.addresses.map((address) => ({
          user: userSaveData.id,
          ...address,
        }));

        const insertedAddresses = await this.userAddressesRepository
          .createQueryBuilder()
          .insert()
          .into(UserAddresses)
          .values(addressData)
          .returning('*')
          .execute();

        const addressesWithId = insertedAddresses.raw;

        return { ...userSaveData, addresses: addressesWithId };
      }),
    );

    return insertedUsers;
  }

  async addUser(userDto: CreateUserDto): Promise<IUsers> {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: userDto.email }, { mobileNumber: userDto.mobileNumber }],
    });

    if (existingUser) {
      throw new HttpException(
        'User with the same email or mobile number already exists',
        HttpStatus.CONFLICT,
      );
    }

    const user = this.userRepository.create(userDto);
    const userSaveData = await this.userRepository.save(user);

    const addressData = userDto.addresses.map((address) => ({
      user: userSaveData.id,
      ...address,
    }));

    const insertedAddresses = await this.userAddressesRepository
      .createQueryBuilder()
      .insert()
      .into(UserAddresses)
      .values(addressData)
      .returning('*')
      .execute();

    const addressesWithId = insertedAddresses.raw;

    return { ...userSaveData, addresses: addressesWithId };
  }

  async searchUsers(q: string, age: number, city: string): Promise<IUsers[]> {
    const conditions: Record<string, string | Date> = {};
    const query: string[] = [];

    if (q) {
      query.push(
        'LOWER(users.firstName) LIKE LOWER(:firstName)',
        'LOWER(users.lastName) LIKE LOWER(:lastName)',
        'LOWER(users.email) LIKE LOWER(:email)',
      );
      conditions['firstName'] = `%${q}%`;
      conditions['lastName'] = `%${q}%`;
      conditions['email'] = `%${q}%`;
    }
    if (city) {
      query.push('LOWER(user_addresses.city) LIKE LOWER(:city)');
      conditions['city'] = `%${city}%`;
    }
    const currentDate = new Date();
    let minDateOfBirth!: Date;
    if (age) {
      minDateOfBirth = new Date(
        currentDate.getFullYear() - age,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      query.push(' users.dob <= :minDateOfBirth');
      conditions['minDateOfBirth'] = minDateOfBirth;
    }
    return this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.addresses', 'user_addresses')
      .where(query.join(' OR '), conditions)
      .getMany();
  }
}
