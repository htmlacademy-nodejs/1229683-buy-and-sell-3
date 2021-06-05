"use strict";

const request = require(`supertest`);
const {app, server} = require(`../cli/server`);

describe(`Categories API end-points`, () => {
  test(`When get categories status code should be 200`, async () => {
    const res = await request(app).get(`/api/categories`);
    expect(res.statusCode).toBe(200);
  });

  test(`Should had properties id and title`, async () => {
    const res = await request(app).get(`/api/categories`);
    expect(res.body).toContain(`Журналы`);
  });
  server.close();
});
