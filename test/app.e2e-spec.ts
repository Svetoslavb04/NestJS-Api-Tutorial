import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { CreateBookmarkDto } from 'src/bookmark/dto';

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
          .expectStatus(201)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Me', () => {
      it('should throw if no token is provided', () => {
        return pactum.spec().get('/users/me').expectStatus(401);
      });

      it('should get me information', () => {
        return pactum
          .spec()
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .get('/users/me')
          .expectStatus(200);
      });
    });

    describe('Edit User', () => {
      it('should update user by id', () => {
        return pactum
          .spec()
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({
            email: 's@gmail.com',
            firstName: 's',
            lastName: 'b',
          })
          .patch('/users/edit')
          .expectStatus(200);
      });
    });
  });

  describe('Bookmarks', () => {
    describe('Create Bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: 'Best bookmark',
        description: 'Very good description',
        link: 'Invalid link',
      };

      it('should throw if title missing', () => {
        return pactum
          .spec()
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .post('/bookmark/create')
          .withBody({ description: dto.description })
          .expectStatus(400);
      });

      it('should create bookmark', () => {
        return pactum
          .spec()
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .post('/bookmark/create')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Get Bookmarks', () => {
      it('should get all bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmark/all')
          .expectJsonLength(1)
          .expectStatus(200);
      });
    });
    describe('Get Bookmark by id', () => {
      it('should throw on invalid id', () => {
        return pactum.spec().get('/bookmark/da1').expectStatus(400);
      });

      it('should get bookmark by id', () => {
        return pactum.spec().get('/bookmark/1').expectStatus(200);
      });
    });
    describe('Edit Bookmark', () => {
      it.todo('should edit bookmark');
    });
    describe('Delete Bookmark', () => {
      it.todo('should delete bookmark by id');
    });
  });
});
