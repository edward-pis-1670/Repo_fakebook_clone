import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinytext' })
  message: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.messageSource, { nullable: false })
  @JoinColumn({
    name: 'sourceId',
  })
  source: User;

  @ManyToOne(() => User, (user) => user.messageTarget, { nullable: false })
  @JoinColumn({
    name: 'targetId',
  })
  target: User;
}
