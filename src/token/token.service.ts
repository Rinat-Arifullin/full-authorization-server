import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { Token, TokenType } from "@prisma/__generated__";

@Injectable()
export class TokenService {
  public constructor(
    private prismaService: PrismaService,
  ) {}

  public async generateToken(
    {
      email,
      tokenType,
      getTokenFn,
      expiresTime = 3600
    }:{
      email: string,
      tokenType: TokenType,
      getTokenFn: ()=> string;
      expiresTime?: number
    }):Promise<Token> {
    const token = getTokenFn()
    const expiresIn = new Date(new Date().getTime() + expiresTime * 1000)

    const existingToken =
      await this.prismaService.token.findFirst({
        where: {
          email,
          type: tokenType,
        }
      })

    if (existingToken) {
      await this.prismaService.token.delete({
        where: {
          id: existingToken.id,
          type: tokenType
        }
      })
    }

    const verificationToken =
      await this.prismaService.token.create({
        data: {
          email,
          token,
          expiresIn,
          type: tokenType
        }
      })

    return verificationToken
  }

  public async getExistingToken(
    {token,tokenType}:{tokenType: TokenType, token: string}): Promise<Token> {
    const existingToken = await this.prismaService.token.findFirst({
      where: {
        token,
        type: tokenType
      }
    })

    if(!existingToken) {
      throw new NotFoundException(
        'Токен не найден. Пожалуйста, убедитесь, что у вас правильный токен.'
      )
    }

    const isExpired = new Date(existingToken.expiresIn) < new Date();

    if(isExpired) {
      throw new BadRequestException(
        'Токен подтверждения истек, пожулуйста, запросите новый токен.'
      )
    }

    return existingToken

  }

  public async deleteToken(tokenId: string) {
    await this.prismaService.token.delete({
      where: {
        id: tokenId
      }
    })

    return true
  }
}
