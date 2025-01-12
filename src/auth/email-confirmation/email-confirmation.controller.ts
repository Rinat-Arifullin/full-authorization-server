import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { EmailConfirmationService } from './email-confirmation.service';
import { Request } from "express";
import { EmailConfirmationDto } from "@/auth/email-confirmation/dto/confirmation.dto";

@Controller('auth/email-confirmation')
export class EmailConfirmationController {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async verificationByToken(@Req() req: Request, @Body() dto: EmailConfirmationDto) {
    return this.emailConfirmationService.verificationByToken(req, dto)
  }
}
