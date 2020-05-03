'use strict';

const offerValidator = (offer) => {
  if (typeof offer.title !== `string`) {
    throw new Error(`Title must be a string`);
  }

  if (offer.title.length < 10 || offer.title.length > 100) {
    throw new Error(`Title must be more than 10 symbols andless than 100`);
  }

  if (typeof offer.description !== `string`) {
    throw new Error(`Description must be a string`);
  }

  if (offer.description < 50 || offer.description > 1000) {
    throw new Error(`Title must be more than 50 symbols andless than 1000`);
  }

  if (typeof offer.sum !== `number`) {
    throw new Error(`Sum must be a number`);
  }

  if (offer.sum < 100) {
    throw new Error(`Sum must be more than 100`);
  }

};

module.exports = offerValidator;
