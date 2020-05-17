'use strict';

const {HttpCode} = require(`../../constants`);

const offerKeys = [`category`, `description`, `picture`, `title`, `type`, `sum`];

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keyExists = offerKeys.every((key) => keys.includes(key));

  if (!keyExists) {
    res.status(HttpCode.BAD_REQUEST).send(`Validation hasn't passed`);
  }

  next();
};
