import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

import * as pactum from 'pactum';

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
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      it.todo('should signup');
    });
    describe('Signin', () => {
      it.todo('should signin');
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
