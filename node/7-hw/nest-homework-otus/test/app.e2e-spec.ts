import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { EditUserDto } from '../src/user/dto/edit-user.dto';
import { log } from 'util';

describe('App (2e2)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);

    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth ', () => {
    const dto: AuthDto = { email: 'jony@mail.ru', password: 'xxx' };

    describe('Singup', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto.password)
          .expectStatus(400);
      });

      it('should throw if password is not valid', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto.email)
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({})
          .expectStatus(400);
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
        // .inspect(); // to see response
      });
    });
    describe('Singin', () => {
      it('should throw if email is not valid', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto.password)
          .expectStatus(400);
      });

      it('should throw if password is not valid', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto.email)
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({})
          .expectStatus(400);
      });

      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token'); // get access_token from the body
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current info', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}', // to put on our token in varrible userAt saved after that
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      const dto: EditUserDto = {
        email: 'jony@mail.ru',
        firstName: 'Jony',
        lastName: 'Korsac',
      };

      it('should edit current user', () => {
        return pactum
          .spec()
          .patch('/users/edit')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName);
      });
    });
  });

  describe('Bookmark', () => {
    const bookmarkDto = {
      title: 'Learn NodeJS',
      description: "It's wil be more opportunities for me",
      link: 'some link',
    };

    describe('Get empty bookmark', () => {
      it('should return empty bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create bookmark', () => {
      it('should create bookmark', () => {
        return pactum
          .spec()
          .post('/bookmarks/create')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(bookmarkDto)
          .expectStatus(201)
          .stores('bookmarkId', 'id');
      });

      it("shouldn't create bookmark if dto is emtpy", () => {
        return pactum
          .spec()
          .post('/bookmarks/create')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({})
          .expectStatus(400);
      });
    });
    describe('Get bookmarks', () => {
      it('should get all bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get bookmark by id', () => {
      it('should get bookmark by id', () => {
        return pactum
          .spec()
          .get('/bookmarks/$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains(bookmarkDto.link)
          .expectBodyContains(bookmarkDto.title)
          .expectBodyContains(bookmarkDto.description);
      });
    });

    describe('Edit bookmark by id', () => {
      const editBookmarkDto = { link: 'bookmarks', description: 'description' };

      it('should edit bookmark by id', () => {
        return pactum
          .spec()
          .patch('/bookmarks/$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .withBody(editBookmarkDto)
          .expectBodyContains(editBookmarkDto.link)
          .expectBodyContains(editBookmarkDto.description);
      });
    });

    describe('Delete bookmark by id', () => {
      it('should delete bookmark by id', () => {
        return pactum
          .spec()
          .delete('/bookmarks/$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(204);
      });
    });
  });
});
