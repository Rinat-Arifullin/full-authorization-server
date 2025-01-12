import { Body, Controller, HttpCode, HttpStatus, Param, Post, Req } from "@nestjs/common";
import { PasswordRecoveryService } from "@/auth/password-recovery/password-recovery.service";
import { ResetPasswordDto } from "@/auth/password-recovery/dto/resetPasswordDto";
import { NewPasswordDto } from "@/auth/password-recovery/dto/newPasswordDto";
import { Request } from 'express';
import { Recaptcha } from "@nestlab/google-recaptcha";

@Controller('auth/password-recovery')
export class PasswordRecoveryController {
  constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

  @Recaptcha()
  @Post('reset')
  @HttpCode(HttpStatus.OK)
  public async resetPassword(
    @Body() dto: ResetPasswordDto
  ) {
    return this.passwordRecoveryService.resetPassword(dto)
  }

  @Recaptcha()
  @Post('new/:token')
  @HttpCode(HttpStatus.OK)
  public async newPassword(
    @Req() req: Request,
    @Body() dto: NewPasswordDto,
    @Param('token') token: string
  ) {
    return this.passwordRecoveryService.newPassword(dto.password, token)
  }
}
