import { Injectable } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { TemplateInterface } from './interfaces/template.interface';
import { readAndRenderTemplate } from './utils';

@Injectable()
export class SendgridService {
  constructor(private readonly sendgridService: SendGridService) {}

  async sendVerificationMail(email: string, verifyString: string) {
    try {
      const templateData: TemplateInterface = {
        title: 'Verify Your Account',
        body: 'You are almost there! Please click on the button below to verify your account',
        link: `${process.env.CLIENT_URL}/verify-email?token=${verifyString}`,
        buttonText: 'Verify Email',
      };
      const result: string = await readAndRenderTemplate(
        'verificationEmail',
        templateData,
      );
      const msg = {
        to: email,
        from: {
          email: 'sandrokakashvili@gmail.com',
          name: 'Lithium Test',
        },
        subject: 'Verify your account.',
        html: result,
      };
      await this.sendgridService.send(msg);
    } catch (error) {
      console.error('sendVerificationMail: ', error);
    }
  }

  async sendResetPasswordMail(
    email: string,
    fullName: string,
    resetPasswordToken: string,
  ) {
    try {
      const templateData: TemplateInterface = {
        title: 'Reset Password',
        fullName,
        link: `${process.env.CLIENT_URL}/set-password?token=${resetPasswordToken}`,
        buttonText: 'Reset Password',
      };
      const result: string = await readAndRenderTemplate(
        'resetPassword',
        templateData,
      );
      const msg = {
        to: email,
        from: {
          email: 'sandrokakashvili@gmail.com',
          name: 'Lithium Test',
        },
        subject: 'Reset your password.',
        html: result,
      };
      await this.sendgridService.send(msg);
    } catch (error) {
      console.error('sendResetPasswordMail: ', error.message);
    }
  }
}
