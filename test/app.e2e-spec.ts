import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { setup } from 'src/core/configs';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: Promise<INestApplication>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = setup(moduleFixture.createNestApplication());

        await (await app).init();
    });

    afterEach(async () => {
        await (await app).close();
    });

    it('/ (GET)', async () => {
        await request((await app).getHttpServer())
            .get('/')
            .expect(HttpStatus.OK)
            .expect('Hello World!');
    });

    it('/health (GET)', async () => {
        await request((await app).getHttpServer())
            .get('/health')
            .expect(HttpStatus.OK)
            .expect((response) =>
                expect(response.body).toMatchObject(
                    expect.objectContaining({
                        details: {
                            db: {
                                status: expect.stringMatching(/up/i),
                            },
                            mem_rss: {
                                status: expect.stringMatching(/up/i),
                            },
                        },
                        error: {},
                        info: {
                            db: {
                                status: expect.stringMatching(/up/i),
                            },
                            mem_rss: {
                                status: expect.stringMatching(/up/i),
                            },
                        },
                        status: 'ok',
                    }),
                ),
            );
    });
});
