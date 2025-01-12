import { Injectable } from '@nestjs/common';
import { MailService } from "@/libs/mail/mail.service";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class TwoFactorAuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailService
  ) {}

}
