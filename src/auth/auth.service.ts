import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { EmailService } from 'src/email/email.service';
import { Status } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private emailService: EmailService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  // sign up for user
  async signUp(body: AuthDto): Promise<Tokens> {
    const isDuplicateEmail = await this.repo.find({ email: body.email });

    if (isDuplicateEmail.length) {
      throw new BadRequestException('email in use');
    }
    const hashedPassword = await this.hashPassword(body.password);
    const user = this.repo.create({
      email: body.email,
      passwordHash: hashedPassword,
    });
    await this.repo.save(user);

    console.log(1);
    await this.emailService.createMailVerify(user.email);
    console.log(2);

    const tokens = await this.generateTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async activeAccount(body: any) {
    await this.emailService.verifyEmail(body.code, body.email);

    await this.repo.update(
      { email: body.email },
      {
        status: Status.ACTIVE,
      },
    );
  }

  // update refresh token
  async updateRefreshToken(userId: number, rt: string) {
    const hash = await this.hashPassword(rt);
    await this.repo.update({ id: userId }, { refreshToken: hash });
  }

  //sign in for user
  async signIn(body: AuthDto): Promise<Tokens> {
    const user = await this.repo.findOne({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Access Denied');
    }

    if (user && user.status === 'inactive') {
      throw new ForbiddenException(
        'Please check your email to activate your account',
      );
    }

    const passwordMatches = await bcrypt.compare(
      body.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  // logout account
  async logout(userId: number) {
    const user = await this.repo.findOne({ id: userId });
    if (!user.refreshToken) {
      throw new UnauthorizedException('Not logged in');
    }

    await this.repo.save({
      ...user,
      refreshToken: null,
    });
  }

  //get refresh token
  async refreshTokens(userId: number, rt: string) {
    const user = await this.repo.findOne({
      where: { id: userId, status: 'active' },
    });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Not logged in');
    }
    const rtMatches = await bcrypt.compare(rt, user.refreshToken);

    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  // hash plain text password
  hashPassword(password: string) {
    const saltRounds = +this.configService.get('BCRYPT_SALT');
    console.log(saltRounds);
    const hash = bcrypt.hash(password, saltRounds);
    return hash;
  }

  //generate tokens
  async generateTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          email,
        },
        {
          expiresIn: +this.configService.get('AT_EXPIRESIN'),
          secret: this.configService.get('AT_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        {
          userId,
          email,
        },
        {
          expiresIn: +this.configService.get('RT_EXPIRESIN'),
          secret: this.configService.get('RT_SECRET'),
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  //FACTOR

  async generateTwoFactorAuthenticationSecret(userId: number) {
    const secret = authenticator.generateSecret();

    const user = await this.repo.findOne({ id: userId });
    const otpauthUrl = authenticator.keyuri(
      user.email,
      this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'),
      secret,
    );

    await this.repo.update(
      { id: user.id },
      { twoFactorAuthenticationSecret: secret },
    );

    return {
      secret,
      otpauthUrl,
    };
  }

  async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
}
