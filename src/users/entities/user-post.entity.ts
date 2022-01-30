import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinytext' })
  message: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.postSource, { nullable: false })
  @JoinColumn({
    name: 'userId',
  })
  source: User;

  @ManyToOne(() => User, (user) => user.postTarget, { nullable: false })
  @JoinColumn({
    name: 'senderId',
  })
  target: User;
}
