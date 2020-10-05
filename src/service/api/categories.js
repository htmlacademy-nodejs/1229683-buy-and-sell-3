'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const route = new Router();
const getMockData = require(`../lib/get-mock-data`);

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    const mockData = await getMockData();
    const categories = await service.findAll(mockData);
    res.status(HttpCode.OK)
            .send(categories);
  });
};
