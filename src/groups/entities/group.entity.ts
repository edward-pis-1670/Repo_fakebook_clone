import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { GroupFollow } from './group-follow.entity';
import { GroupMember } from './group-member.entity';
import { GroupMessage } from './group-message.entity';
import { GroupPost } from './group-post.entity';
export enum Status {
  NEW = 'new',
  APPROVED = 'approved',
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 75, nullable: false })
  title: string;

  @Column({ length: 100 })
  metaTitle: string;

  @Column({ length: 100, nullable: false })
  slug: string;

  @Column({ type: 'tinytext', nullable: false })
  summary: string;

  @Column({ type: 'text' })
  profile: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.createdBy, { nullable: false })
  @JoinColumn({
    name: 'createdBy',
  })
  source: User;

  @ManyToOne(() => User, (user) => user.updatedBy, { nullable: false })
  @JoinColumn({
    name: 'updatedBy',
  })
  target: User;

  @OneToMany(() => GroupMember, (groupmember) => groupmember.group)
  groupM: GroupMember;

  @OneToMany(() => GroupFollow, (groupfollow) => groupfollow.group)
  groupF: GroupFollow;

  @OneToMany(() => GroupMessage, (groupmessage) => groupmessage.group)
  groupMS: GroupMessage;

  @OneToMany(() => GroupPost, (grouppost) => grouppost.group)
  groupP: GroupMessage;
}
