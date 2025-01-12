import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { useMailConfig } from "@/config/mailer.config";

@Module({
  imports: [MailerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: useMailConfig,
    inject: [ConfigService],
  })],
  providers: [MailService],
})

export class MailModule {}
