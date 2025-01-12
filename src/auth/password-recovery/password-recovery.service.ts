import { Injectable, NotFoundException } from "@nestjs/common";
import { ResetPasswordDto } from "@/auth/password-recovery/dto/resetPasswordDto";
import { UserService } from "@/user/user.service";
import { TokenService } from "@/token/token.service";
import { $Enums, User } from "@prisma/__generated__";
import TokenType = $Enums.TokenType;
import { MailService } from "@/libs/mail/mail.service";
import { Request } from 'express';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class PasswordRecoveryService {
  public constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
  ) {}

  public async newPassword(newPassword: string, token: string) {
    const existingToken =
      await this.tokenService.getExistingToken({
        token,
        tokenType: TokenType.PASSWORD_RESET
      })

    const existingUser =
      await this.userService.findByEmail(existingToken.email)

    if(!existingUser) {
      throw new NotFoundException(
        'Пользователь с указанным email не найден. Пожалуйста убедитесь, что вы ввели правильный email.'
      )
    }

    await Promise.allSettled([
      this.userService.updatePassword(existingUser.id, newPassword),
      this.tokenService.deleteToken(existingToken.id)
    ])

    // Нужно ли разлогинить пользователя и удалить старые сессии?
    return {
      message: 'Пароль обновлен. Вы можете зайти в свой профиль по новому паролю.'
    }
  }

  // Нужно ли разлогинить пользователя и удалить старые сессии?
  public async resetPassword(dto: ResetPasswordDto) {
    const existingUser =
      await this.userService.findByEmail(dto.email);

    if(!existingUser) {
      throw new NotFoundException(
        'Пользователь с данным email не найден. ' +
        'Пожалуйста, проверьте правильность написания email.'
      )
    }

    await this.sendPasswordResetToken(existingUser)

    return {
      message: 'Писмо для подтверждения сброса пароля отправленно вам на почту. ' +
        'Пожалуйста, проверьте свой почтовый ящик, привязанный к данному аккаунту'
    }
  }

  private async sendPasswordResetToken(user: User) {
    const passwordResetToken =
      await this.generatePasswordRecoveryToken(user.email);

    await this.mailService.sendPasswordResetEmail(
      user.email,
      passwordResetToken.token
    );

    return true
  }

  private async generatePasswordRecoveryToken(email: string) {
    return this.tokenService.generateToken({
      email,
      tokenType: TokenType.PASSWORD_RESET,
      getTokenFn: uuidv4
    })
  }
}
