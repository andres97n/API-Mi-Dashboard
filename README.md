# MY DASHBOARD

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

<!-- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. -->
A personal API for save and get series from external API's

## Project setup

```bash
$ pnpm install
```

<p style="font-size: 18px">Docker</p>
<p>Run the local database with follow command:</p>

```bash
$ docker-compose up -d
```

<p>And verify its local connection at the port 27017</p>

## Env file

Follow the .env-example file on the main path and create your own .env file with the parameters required for the app. 

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode (recomended)
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.


