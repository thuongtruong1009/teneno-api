<div align="center">
  <h1>Teneno API</h1>
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Logo" />
</div>

<p align="center">A official api for teneno application</p>

## Preview

* [API Document](http://localhost:5500/api)

* [Database diagram](https://dbdiagram.io/d/62fe42dec2d9cf52fad1848c)

## Description

```sh
The purpose of Teneno webapp is create a new network platform where everyone can sharing their feels, thinks or experiences together. Make an easily life with Teneno
```

## Features

* **Auth**

  ✅  Signup

  ✅  Signin

  ✅  Signout

  ✅  Refresh access-token
  
* **Users**

  ✅  Get list all users
  
  ✅  Get user data by user-id

  ✅  Get public user profile by user-id / username / email

  ✅  Update user profile

  ✅  Delete user-profile by email & password

  ✅  Delete user by user-id (admin)

* **File**

  ✅  Upload single field file data (avatar, cover)

  ✅  Upload multi fields file data

  ✅  Upload array-field files data (post, sample_image)

* **Conversation**

  ✅  Create new conversation

  ✅  Get all conversations of user

  ✅  Get one conversation information has current user

  ✅  Update members to current conversation

  ✅  Update conversation information (name, description, avatar)

  ✅  Delete admin out of current conversation by creator

  ✅  Delete conversation by creator

  ✅  Change users role in current conversation

* **Chat**

  ✅  Join conversation by conversation-id

  ✅  Get all messages in conversation

  ✅  Create new messages

  ✅  Update message by message-id

  ✅  Delete messages by message-id

* **Post**

  ✅  Create a new post

  ✅  Get all posts of user by user-id

  ✅  Match a new category with new post

  ✅  Get a post by post-id

  ✅  Delete a post by post-id

  ✅  Reaction to post

<!-- ⬜️ ✅ -->

## Plugins & Dependencies

* [Nodejs](http://nodejs.org) framework for building efficient and scalable server-side applications
* [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository
* [Prisma](https://www.prisma.io/) query builder and auto-generated schema with types tailored
* [CORS](https://www.npmjs.com/package/cors) connect middleware that can be used to enable CORS with various options
* [Swagger](https://swagger.io/) describe definition format and design document APIs at scale
* [Bcrypt](https://www.npmjs.com/package/bcrypt) a library to help you hash passwords
* [JWT](https://www.npmjs.com/package/jsonwebtoken) decode, verify and generate access tokens
* [Class-validator](https://www.npmjs.com/package/class-validator) use of decorator and non-decorator to perform validation
* [Class-transformer](https://www.npmjs.com/package/class-transformer) transform plain object to some instance of class and versa and serialize / deserialize object based on criteria
* [Passport](https://www.npmjs.com/package/passport) compatible authentication requests middleware for Node.js
* [Cookies-Parser](https://anonystick.com/blog-developer/cookie-parser-la-gi-middleware-can-thiet-ma-hoa-cookie-trong-expressjs-2020112687915577) middleware parsing of cookies in Nodejs and Expressjs.
* [Multer](https://docs.nestjs.com/techniques/file-upload) upload file data form in Expressjs
* [Cookie-parser](https://www.npmjs.com/package/cookie-parser) Parse Cookie header and signed cookie support

## Conventions & Tools

* [Prettier](https://prettier.io/) opinionated code formatter
* [Eslint](https://eslint.org/) analyzes code to quickly find problems and built with continuous integration pipeline
* [Husky x Lintstage x Commitlint](https://medium.com/angular-in-depth/husky-6-lint-prettier-eslint-and-commitlint-for-javascript-project-d7174d44735a) linter conventions for clean code
* [JWT Playground](https://jwt.io)

## References & Tips

* [Prisma x Nest](https://docs.nestjs.com/recipes/prisma#getting-started) build CRUD API endpoints rapidy
* [Fix upload file on Postman](https://stackoverflow.com/questions/60036239/upload-file-failed-postman)
* [File upload with Nest](https://notiz.dev/blog/type-safe-file-uploads)
* [Base roles example](https://www.youtube.com/watch?v=wdsp7BNmJRc&list=PL2eJaT2jJV7Ku72gl8YSSVRC0D7IQRJJZ&index=9&ab_channel=MariusEspejo)
* [Database for chat](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Ddatabase%2Bfor%2Bchat%2Bapplication%26sxsrf%3DALiCzsZVJGO-Xg7f0j6bm04uemOFXQOCow%3A1661272422354%26source%3Dlnms%26tbm%3Disch%26sa%3DX%26ved%3D2ahUKEwjH3u-Est35AhUFmlYBHQe4BikQ_AUoAXoECAEQAw%26biw%3D1920%26bih%3D948%26dpr%3D1&h=AT1rz92_FbaMniK5W8han8NWXAfairaSKCmfkCu3TPLJWm48IqSIYii-aIRJ16hF-Vt_Y7Ju8l2B8YvIqo-5fIndTxa4Koo62fgJN7fGuUcbuMg9XU-5Y7IYHdhWjOESt9SEOvAGrud8_5c&s=1)
* [Database for social](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Ddatabase%2Bfor%2Bsocial%2Bmedia%2Bapp%26tbm%3Disch%26ved%3D2ahUKEwj2_M6Tst35AhUKVPUHHefeDpkQ2-cCegQIABAA%26oq%3Ddatabase%2Bfor%2Bsocial%2Bmedia%26gs_lcp%3DCgNpbWcQARgAMgQIABAYMgQIABAYOgQIIxAnOgYIABAeEAg6BQgAEIAEUN4HWOodYNYlaABwAHgAgAGFAYgB3AySAQQwLjE0mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE%26sclient%3Dimg%26ei%3DhQEFY7amEIqo1e8P5727yAk%26bih%3D948%26biw%3D1920&h=AT2bN5utpmugfzrrq3LxJL2taNOV2GVjJPB9MXZ3kkPt5MBwUuqo6O-m-g_xeLO-c0MBe3_P6H_hrFvp53MmQ8msV1DFVay8_JdoXpgmkCp8LQwiiTzYktBVKIMNN_kEWLxUjRQLqsOIZyE&s=1)

### Prisma

```bash
# Installation
npm install prisma@latest @prisma/client
```

```bash
# Init prisma
npx prisma init

# turn database schema into a Prisma schema
prisma db pull

# generate the Prisma Client
prisma generate
```

```bash
# Create env and migrate db
npx prisma migrate dev --create-only
```

```bash
# Open prisma studio
npx prisma studio
```

```bash
# Sync migrate change to db
npx prisma db push
```

### Database

```bash
# Start db
$ docker-compose up
```

### Running

```bash
# Running the app in local
$ npm install
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Teneno is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://github.com/sponsors/thuongtruong1009).

## Stay in touch

- Author - [Tran Nguyen Thuong Truong](https://github.com/thuongtruong1009)
- Devto - [@thuongtruong1009](https://dev.to/thuongtruong1009)
- Linkedin - [@thuongtruong1009](https://linkedin.com/in/thuongtruong1009)

## License

Teneno is [MIT licensed](LICENSE).
