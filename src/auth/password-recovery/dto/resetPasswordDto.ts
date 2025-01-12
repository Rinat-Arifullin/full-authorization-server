import { IsNotEmpty, IsEmail } from "class-validator";

export class ResetPasswordDto {
  @IsEmail({}, {message: 'Не корректный формат email.'})
  @IsNotEmpty({ message: 'Поле email обязательно.' })
  email: string
}
