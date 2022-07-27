<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Features
[Husky x Lintstage x Commitlint](https://medium.com/angular-in-depth/husky-6-lint-prettier-eslint-and-commitlint-for-javascript-project-d7174d44735a)

### Prisma
* 1. Installation
```bash
npm install prisma@latest @prisma/client
```
* 2. Installation
```bash
npx prisma init
```

* 3. Running
```bash
prisma db pull  #turn database schema into a Prisma schema
prisma generate #generate the Prisma Client
```

* 4. Create env and migrate db
```bash
npx prisma migrate dev --create-only
```
* 5. Open prisma studio
```bash
npx prisma studio
```

* 6. Sync migrate change to db
```bash
npx prisma db push
```

### Database
* 1. Start db
```bash
docker-compose up
```

## Installation

```bash
$ npm install
```

## Running the app

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

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
