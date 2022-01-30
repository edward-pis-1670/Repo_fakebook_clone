import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
  authToken = this.configService.get('TWILIO_AUTH_TOKEN');
  serviceSid = this.configService.get('TWILIO_SERVICE_SID');
  templateId = this.configService.get('TEMPLATE_SENDGRID_ID');
  fromEmail = this.configService.get('FROM_EMAIL');

  client = new Twilio(this.accountSid, this.authToken);

  async createMailVerify(email: string) {
    console.log(this.accountSid);
    await this.client.verify.services(this.serviceSid).verifications.create({
      channelConfiguration: {
        template_id: this.templateId,
        from: this.fromEmail,
        from_name: 'HUST1670',
      },
      to: email,
      channel: 'email',
    });
  }

  async verifyEmail(code: string, email: string) {
    const isVerify = await this.client.verify
      .services(this.serviceSid)
      .verificationChecks.create({
        to: email,
        code: code,
      });

    if (!(isVerify.status === 'approved')) {
      throw new BadRequestException('code is incorrect');
    }
    return true;
  }
}
