import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class NewPasswordDto {
  @IsString({ message: 'Пароль должен быть строкой.' })
  @IsNotEmpty({ message: 'Поле пароль не может быть пустым.' })
  @MinLength(6, { message: 'Пароль должен содержать не менее 6 символов.' })
  password: string
}
