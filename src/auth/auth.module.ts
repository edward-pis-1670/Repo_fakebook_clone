import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, FacebookStrategy, RtStrategy } from './strategies';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    FacebookStrategy,
    EmailService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
