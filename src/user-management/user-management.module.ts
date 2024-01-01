import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './models/entities/user.entity';
import { UserAddresses } from './models/entities/user-address.entity';
import { UserController } from './controllers/user-management.controller';
import { UserFakeDataService } from 'src/shared/faker/user-management/user-faker.service';
import { UserHelperService } from './services/user-helper.service';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([Users, UserAddresses])],
  providers: [UserFakeDataService, UserHelperService, UserService],
})
export class UserManagementModule {}
