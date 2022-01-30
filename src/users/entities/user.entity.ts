import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupFollow } from '../../groups/entities/group-follow.entity';
import { GroupMember } from '../../groups/entities/group-member.entity';
import { GroupMessage } from '../../groups/entities/group-message.entity';
import { GroupPost } from '../../groups/entities/group-post.entity';
import { Group } from '../../groups/entities/group.entity';
import { UserFollow } from './user-follow.entity';
import { UserFriend } from './user-friend.entity';
import { UserMessage } from './user-message.entity';
import { UserPost } from './user-post.entity';

export enum Status {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  DELETED = 'deleted',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  firstName: string;

  @Column({ length: 50, nullable: true })
  middleName: string;

  @Column({ length: 50, nullable: true })
  lastName: string;

  @Column({ length: 50, unique: true, nullable: true })
  username: string;

  @Column({ length: 15, unique: true, nullable: true })
  mobile: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 100 })
  passwordHash: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  registeredAt: number;

  @Column({ type: 'datetime', nullable: true })
  lastLogin: Date;

  @Column({ type: 'tinytext', nullable: true })
  intro: string;

  @Column({ type: 'text', nullable: true })
  profile: string;

  @Column({ type: 'enum', enum: Status, default: Status.INACTIVE })
  status: Status;

  @Column({ nullable: true })
  twoFactorAuthenticationSecret: string;

  @Column({
    nullable: true,
  })
  refreshToken: string;

  @OneToMany(() => UserFriend, (userfriend) => userfriend.source)
  friendSource: UserFriend[];

  @OneToMany(() => UserFriend, (userfriend) => userfriend.target)
  friendTarget: UserFriend[];

  @OneToMany(() => UserMessage, (usermessage) => usermessage.target)
  messageSource: UserMessage[];

  @OneToMany(() => UserMessage, (usermessage) => usermessage.target)
  messageTarget: UserMessage[];

  @OneToMany(() => UserPost, (userpost) => userpost.target)
  postSource: UserPost[];

  @OneToMany(() => UserPost, (userpost) => userpost.target)
  postTarget: UserPost[];

  @OneToMany(() => UserFollow, (userfollow) => userfollow.target)
  followSource: UserFollow[];

  @OneToMany(() => UserPost, (userfollow) => userfollow.target)
  followTarget: UserFollow[];

  @OneToMany(() => Group, (group) => group.target)
  createdBy: Group[];

  @OneToMany(() => UserPost, (group) => group.target)
  updatedBy: Group[];

  @OneToMany(() => GroupMember, (groupmember) => groupmember.user)
  userG: GroupMember[];

  @OneToMany(() => GroupFollow, (groupfollow) => groupfollow.user)
  userF: GroupMember[];

  @OneToMany(() => GroupMessage, (groupmessage) => groupmessage.user)
  userMS: GroupMessage[];

  @OneToMany(() => GroupPost, (grouppost) => grouppost.user)
  userP: GroupPost[];
}
