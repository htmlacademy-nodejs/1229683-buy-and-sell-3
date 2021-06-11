"use strict";

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll(searchText) {
    return this._offers.filter((offer) => offer.title.include(searchText));
  }
}

module.exports = SearchService;
