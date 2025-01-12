import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '@/user/user.service';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRecaptchaConfig } from '@/config/recaptcha.config';
import { ProviderModule } from './provider/provider.module';
import { getProvidersConfig } from '@/config/providers.config';
import { MailService } from "@/libs/mail/mail.service";
import { EmailConfirmationModule } from "@/auth/email-confirmation/email-confirmation.module";
import { PasswordRecoveryModule } from "@/auth/password-recovery/password-recovery.module";
import { TwoFactorAuthService } from "@/auth/two-factor-auth/two-factor-auth.service";
import { TokenService } from "@/token/token.service";

@Module({
  imports: [
    ProviderModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getProvidersConfig,
      inject: [ConfigService]
    }),
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getRecaptchaConfig,
      inject: [ConfigService]
    }),
    forwardRef(() => EmailConfirmationModule),
    PasswordRecoveryModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, MailService, TokenService, TwoFactorAuthService],
  exports: [AuthService]
})
export class AuthModule { }
