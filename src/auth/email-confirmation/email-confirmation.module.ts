import { forwardRef, Module } from "@nestjs/common";
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation.controller';

import { AuthModule } from "@/auth/auth.module";
import { UserService } from "@/user/user.service";
import { MailService } from "@/libs/mail/mail.service";
import { MailModule } from "@/libs/mail/mail.module";
import { TokenService } from "@/token/token.service";

@Module({
  imports: [MailModule, forwardRef(()=> AuthModule)],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService, UserService, MailService, TokenService],
  exports: [EmailConfirmationService]
})

export class EmailConfirmationModule {}
