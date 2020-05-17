'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.findOne(offerId);

  if (!offer) {
    res.status(HttpCode.NOT_FOUND).send(`Offer ${offerId} not found`);
  }

  res.locals.offer = offer;
  next();
};
