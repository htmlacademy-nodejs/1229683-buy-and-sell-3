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

const getMockData = require(`../lib/get-mock-data`);


const app = new Router();

(async () => {
  const mockData = await getMockData();
  search(app, new SearchService(mockData));

})();

categories(app, new CategoryService());


(async () => {
    const mockData = await getMockData();
    offer(app, new OfferService(mockData), new CommentService());
})();

module.exports = app;
