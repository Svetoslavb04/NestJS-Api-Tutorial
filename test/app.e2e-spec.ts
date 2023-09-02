import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'gmail@gmail.com',
      password: '123',
    };

    describe('Signup', () => {
      it('should throw on empty email', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });

      it('should throw on empty email', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('should throw if body is empty', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({})
          .expectStatus(400);
      });

      it('should signup', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('should throw on empty email', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });

      it('should throw on empty email', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('should throw if body is empty', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({})
          .expectStatus(400);
      });

      it('should signin', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(201);
      });
    });
  });

  describe('User', () => {
    describe('Me', () => {
      it.todo('should get me information');
    });
  });

  describe('Bookmarks', () => {
    describe('Create Bookmark', () => {
      it.todo('should create bookmark');
    });
    describe('Get Bookmarks', () => {
      it.todo('should get all bookmarks');
    });
    describe('Get Bookmark by id', () => {
      it.todo('should get bookmark by id');
    });
    describe('Edit Bookmark', () => {
      it.todo('should edit bookmark');
    });
    describe('Delete Bookmark', () => {
      it.todo('should delete bookmark by id');
    });
  });
});
