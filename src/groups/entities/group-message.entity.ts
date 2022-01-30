import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class GroupMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinytext' })
  message: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.userMS, { nullable: false })
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @ManyToOne(() => Group, (group) => group.groupMS, { nullable: false })
  @JoinColumn({
    name: 'groupId',
  })
  group: Group;
}
