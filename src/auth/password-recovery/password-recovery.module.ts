import { Module } from "@nestjs/common";
import { UserService } from "@/user/user.service";
import { MailService } from "@/libs/mail/mail.service";
import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordRecoveryController } from "./password-cecovery.controller";
import { TokenService } from "@/token/token.service";


@Module({
  controllers: [PasswordRecoveryController],
  providers: [PasswordRecoveryService, UserService, MailService, TokenService],
  exports: [PasswordRecoveryService]
})
export class PasswordRecoveryModule {}

