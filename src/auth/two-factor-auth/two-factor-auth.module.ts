import { Module } from '@nestjs/common';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { MailService } from "@/libs/mail/mail.service";
import { TokenService } from "@/token/token.service";

@Module({
  providers: [TwoFactorAuthService, MailService, TokenService],
})
export class TwoFactorAuthModule {}
