import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { setup } from 'src/core/configs';
import * as supertest from 'supertest';

import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
    let app: Promise<INestApplication>;
    let request: supertest.SuperTest<supertest.Test>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = setup(moduleFixture.createNestApplication());

        await (await app).init();

        request = supertest((await app).getHttpServer());
    });

    afterEach(async () => {
        await (await app).close();
    });

    it.each([
        [
            '/auth/signin',
            {
                email: 'example1@gail.com',
                password: 'example1@A',
            },
            HttpStatus.OK,
        ],
        [
            '/auth/signup',
            { name: null, email: null, password: null },
            HttpStatus.UNPROCESSABLE_ENTITY,
        ],
        ['/auth/signin', { email: '', password: '' }, HttpStatus.UNAUTHORIZED],
        [
            '/auth/signin',
            { email: 'john@doe.me', password: '' },
            HttpStatus.UNAUTHORIZED,
        ],
    ])(
        'should make a POST request to %s with %p and expect %d status',
        async (url, body, statusCode) => {
            const resp = await request.post(url).send(body).expect(statusCode);

            expect(resp.body).toBeDefined();
            expect(resp.body.password).toBeUndefined();
            if (resp.ok)
                expect(resp.header.authorization).toMatch(/Bearer\s+.*/);
        },
    );

    it('should get session user', async () => {
        const {
            header: { authorization },
        } = await request
            .post('/auth/signin')
            .send({
                email: 'example1@gmail.com',
                password: 'example1@A',
            })
            .expect(HttpStatus.OK);
        const resp = await request
            .get('/auth/refresh-token')
            .set('Authorization', authorization);

        expect(resp.body).toBeDefined();
        expect(resp.body.password).toBeUndefined();
    });
});
