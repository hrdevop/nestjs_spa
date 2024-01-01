import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUserAddresses } from '../interfaces/user-address.interface';
import { AddressType } from '../enums/address-type.enum';
import { Users } from './user.entity';

@Entity()
export class UserAddresses implements IUserAddresses {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Users, (user) => user.id)
  user: string;

  @Column({ name: 'address_line1' })
  addressLine1: string;

  @Column({ name: 'address_line2', nullable: true })
  addressLine2: string;

  @Column({ name: 'pin_code', type: 'int', width: 6 })
  pinCode: number;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ type: 'enum', enum: AddressType })
  type: AddressType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}
