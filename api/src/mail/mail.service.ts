import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  public async sendSignupMail(reciever: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Welcome to KicksFactory',
      template: 'signup',
      context: {
        reciever,
        url: this.configService.get('CLIENT_APP_URL'),
      },
    });
  }

  public async sendForgotPasswordMail(reciever: string, resetLink: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Reset password demand',
      template: 'forgot-password',
      context: {
        resetLink,
        reciever,
        url: this.configService.get('CLIENT_APP_URL'),
      },
    });
  }

  public async sendConfirmResetPasswordMail(reciever: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Your password has been reset',
      template: 'reset-password',
      context: {
        reciever,
        url: this.configService.get('CLIENT_APP_URL'),
      },
    });
  }

  public async sendOrderConfirmationMail(reciever: string, invoice: Buffer) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Order confirmation',
      template: 'order-confirmation',
      context: {
        reciever,
        url: this.configService.get('CLIENT_APP_URL'),
      },
      attachments: [
        {
          filename: 'invoice.pdf',
          content: invoice.toString('base64'), // Convertir le Buffer en base64
          encoding: 'base64',
        },
      ],
    });
  }
}
