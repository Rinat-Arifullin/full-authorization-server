import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { MailService } from "@/libs/mail/mail.service";
import { PrismaService } from "@/prisma/prisma.service";
import { TokenService } from "@/token/token.service";
import { $Enums } from "@prisma/__generated__";
import TokenType = $Enums.TokenType;

@Injectable()
export class TwoFactorAuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService
  ) {}

  public async sendTwoFactorToken(email: string) {
    const twoFactorToken =
      await this.generateTwoFactorToken(email)

    await this.mailService.sendTwoFactorTokenEmail(
      twoFactorToken.email,
      twoFactorToken.token
    )

    return true
  }

  public async validateTwoFactorToken(email: string, code: string) {
    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.TWO_FACTOR
      }
    })

    if(!existingToken) {
      throw new NotFoundException(
        'Токен двухфакторной аутентификации не найден. Убедитесь, что вы' +
        ' запрашивали токен для данного адреса электронной почты.'
      )
    }

    if(existingToken.token !== code) {
      throw new BadRequestException(
        'неверный код двухфакторной аутентификации. Пожалуйста, проверьте ' +
        'введенный код и попробуйте снова.'
      )
    }

    const isExpired = new Date(existingToken.expiresIn) < new Date();

    if(isExpired) {
      throw new BadRequestException(
        'Срок действия токена двухфакторной аутентификации истеу. Пожалуйста, ' +
        'запросите новый токен.'
      )
    }

    await this.tokenService.deleteToken(existingToken.id);

    return true
  }

  private async generateTwoFactorToken(email: string) {
    const getTokenFn = ()=> Math.floor(Math.random() * 1e6).toString()
    return this.tokenService.generateToken({
      email,
      tokenType: TokenType.TWO_FACTOR,
      getTokenFn,
      expiresTime: 300000
    })
  }
}
