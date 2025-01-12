import { IsNotEmpty, IsString } from 'class-validator'

export class EmailConfirmationDto {
  @IsString({ message: 'Токен должен быть строкой.' })
  @IsNotEmpty({ message: 'Поле токен не может быть пустым.' })
  token: string
}
