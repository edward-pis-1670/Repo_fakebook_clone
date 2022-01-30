import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserFriend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint', default: '0' })
  type: string;

  @Column({ type: 'smallint', default: '0' })
  status: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => User, (user) => user.friendSource, { nullable: false })
  @JoinColumn({
    name: 'sourceId',
  })
  source: User;

  @ManyToOne(() => User, (user) => user.friendTarget, { nullable: false })
  @JoinColumn({
    name: 'targetId',
  })
  target: User;
}
