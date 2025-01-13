

# Auth service. NestJS.

## Features

- Авторизация на сессиях с сохранением в Redis
- Написана без помощи passport
- Есть OAuth авторизация через google и yandex
- Google reCaptcha
- Подтверждение аккаунта через почту
- Двухфакторная авторизация с кодом
- Функционал сброса пароля через почту
- Обновление информации о аккаунте

## Tech Stack

- NestJS
- TypeScript
- Prisma
- Posgtresql
- Docker
- Redis

## Documentation

[Documentation](obsidian://open?vault=Obsidian%20Vault&file=FS%20AUTH.%20NestJS%2C%20NextJS%2C%20Postgresql%2FFS%20AUTH%20-%20Full%20Stack%20%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F)

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
