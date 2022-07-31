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

  ✅ Signup

  ✅  Signin

  ✅  Signout

  ✅  Refresh access-token
  
* **Users**

  ✅  Get list all users
  
  ✅  Get user data by user-id

  ✅  Get public user profile by user-id / username / email

  ✅  Update user profile

* **File**

  ✅  Upload file data

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

## Conventions & Tools

* [Prettier](https://prettier.io/) opinionated code formatter
* [Eslint](https://eslint.org/) analyzes code to quickly find problems and built with continuous integration pipeline
* [Husky x Lintstage x Commitlint](https://medium.com/angular-in-depth/husky-6-lint-prettier-eslint-and-commitlint-for-javascript-project-d7174d44735a) linter conventions for clean code
* [JWT Playground](https://jwt.io)

## References & Tips

* [Fix upload file on Postman](https://stackoverflow.com/questions/60036239/upload-file-failed-postman)

### Prisma

#### 1. Installation
```bash
npm install prisma@latest @prisma/client
```
#### 2. Running
```bash
npx prisma init
prisma db pull  #turn database schema into a Prisma schema
prisma generate #generate the Prisma Client
```

#### 3. Create env and migrate db
```bash
npx prisma migrate dev --create-only
```
#### 4. Open prisma studio
```bash
npx prisma studio
```

#### 5. Sync migrate change to db
```bash
npx prisma db push
```

### Database

#### 1. Start db
```bash
docker-compose up
```

## Running the app in local

```bash
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

## Test

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
