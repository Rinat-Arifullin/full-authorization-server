import { isDev } from "@/libs/common/utils/is-dev.util";
import { ConfigService } from "@nestjs/config";

import { MailerOptions } from "@nestjs-modules/mailer";

export const useMailConfig = async (configService: ConfigService): Promise<MailerOptions> => ({
  transport: {
      host: configService.getOrThrow<string>("MAIL_HOST"),
      port: configService.getOrThrow<number>("MAIL_PORT"),
      secure: !isDev(configService),
      auth: {
        user: configService.getOrThrow<string>("MAIL_LOGIN"),
        pass: configService.getOrThrow<string>("MAIL_PASSWORD"),
      }
  },
  defaults: {
    from: `"@Rinat Arifullin ${configService.getOrThrow<string>("MAIL_LOGIN")}"`
  }
})
