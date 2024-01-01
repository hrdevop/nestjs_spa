import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUserAddresses } from '../interfaces/user-address.interface';
import { IUsers } from '../interfaces/user.interface';
import { UserAddresses } from './user-address.entity';

@Entity()
export class Users implements IUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'mobile_number', unique: true, length: 10 })
  mobileNumber: string;

  @Column({ type: 'date' })
  dob: Date;

  @OneToMany(() => UserAddresses, (address) => address.user)
  addresses: IUserAddresses[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}
