import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { SwordsService } from '../src/swords/swords.service';
import { UsersService } from '../src/users/users.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService, SwordsService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /auth/register 회원가입 후 POST /auth/login 로그인에 성공한다', async () => {
    const email = `test-${Date.now()}@test.com`;
    const password = '1234';

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password, nickname: '기사' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject({
          id: 1,
          email,
          nickname: '기사',
        });
      });

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(201)
      .expect((res) => {
        expect(res.body.accessToken).toBeDefined();
      });
  });
});
