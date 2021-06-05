"use strict";

const request = require(`supertest`);
const {app, server} = require(`../cli/server`);

describe(`Offers API end-points`, () => {
  test(`When get offers status code should be 200`, async () => {
    const res = await request(app).get(`/api/offers/`);
    expect(res.statusCode).toBe(200);
  });
  server.close();

});
