<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  
## Intro

Welcome to the Learning NestJS REST API repository! 🚀 This repository is a part of my journey into learning NestJS, a powerful Node.js framework that allows you to build scalable and maintainable REST APIs.

## Description

In this project built with Nest.js, users can register and log in securely. Upon registration or login, users receive JWT (JSON Web Token) access tokens for authentication. Once authenticated, users can perform several bookmark-related actions, including creating new bookmarks with titles, URLs, and optional descriptions, editing existing bookmarks, and deleting their own bookmarks. Additionally, the API allows anyone to retrieve either a comprehensive list of bookmarks or a specific bookmark by providing its unique identifier.

## Installation

```bash
$ npm install
```

Fill the required environment variables, fill in `.env.example` and rename it to `.env`

## Running the app

```bash
# run database docker service
$ npm run db:dev:restart

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
