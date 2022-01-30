import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../..//users/entities/user.entity';
import { Group } from './group.entity';

export enum Types {
  LIKE = 'like',
  DISLIKE = 'dislike',
  FOLLOW = 'follow',
}

@Entity()
export class GroupFollow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Types, default: Types.LIKE })
  type: Types;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.userF, { nullable: false })
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @ManyToOne(() => Group, (group) => group.groupF, { nullable: false })
  @JoinColumn({
    name: 'groupId',
  })
  group: Group;
}
