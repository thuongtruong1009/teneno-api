<div align="center">
  <h1>Teneno API</h1>
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Logo" />
</div>

<p align="center">A official api for teneno application</p>

## Preview

* [API Document](http://localhost:5500/api)

## Description

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

  ✅  Get all conversations of user by user-id

  ✅  Get conversation information has current user

  ⬜️  Add new member to current conversation

  ✅  Update conversation information (name, description, avatar)

  ⬜️  Delete member out of current conversation by creator-conversation

  ✅  Delete conversation by creator-conversation

* **Chat**

  ✅  Join conversation by conversation-id

  ✅  Get all messages in conversation

  ✅  Create new messages

  ✅  Update message by message-id

  ✅  Delete messages by message-id


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
