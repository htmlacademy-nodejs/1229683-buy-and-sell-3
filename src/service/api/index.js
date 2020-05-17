'use strict';

const {Router} = require(`express`);
const categories = require(`../api/categories`);
const offer = require(`../api/offer`);
const search = require(`../api/search`);

const {
  CategoryService,
  OfferService,
  CommentService,
  SearchService,
} = require(`../data-service`);

const {getMockData} = require(`../lib/get-mock-data`);


const app = new Router();

(async () => {
  const mockData = await getMockData();

  categories(app, new CategoryService(mockData));
  offer(app, new OfferService(mockData), new CommentService());
  search(app, new SearchService(mockData));
})();

module.exports = app;
