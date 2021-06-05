'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const fs = require(`fs`).promises;

const mainRouter = new Router();
const FILENAME = `mocks.json`;

mainRouter.get(`/categories`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    const categories = mocks.map((mock) => mock.category);
    res.status(HttpCode.OK).send(categories);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

mainRouter.get(`/search`, async (req, res) => {
  const {query} = req.query;
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    const offers = mocks.filter((mock) => mock.title.includes(query));
    res.status(HttpCode.OK).send(offers);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

module.exports = mainRouter;
