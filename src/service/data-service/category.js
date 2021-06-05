'use strict';

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll(offers) {
    const categories = offers.reduce((acc, offer) => {
      acc.add(...offer.category);
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
