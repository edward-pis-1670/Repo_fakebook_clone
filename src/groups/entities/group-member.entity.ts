import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { User } from '../../users/entities/user.entity';

export enum Roles {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member',
}

export enum Status {
  NEW = 'new',
  REJECTED = 'rejected',
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

@Entity()
export class GroupMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Roles, default: Roles.MEMBER })
  role: Roles;

  @Column({ type: 'enum', enum: Status, default: Status.NEW })
  status: Status;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @Column({ type: 'text' })
  notes: string;

  @ManyToOne(() => User, (user) => user.userG, { nullable: false })
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @ManyToOne(() => Group, (group) => group.groupM, { nullable: false })
  @JoinColumn({
    name: 'groupId',
  })
  group: Group;
}
