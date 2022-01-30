import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserFollow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint', default: '0' })
  type: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.followSource, { nullable: false })
  @JoinColumn({
    name: 'sourceId',
  })
  source: User;

  @ManyToOne(() => User, (user) => user.followTarget, { nullable: false })
  @JoinColumn({
    name: 'targetId',
  })
  target: User;
}
