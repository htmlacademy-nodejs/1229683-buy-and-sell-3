'use strict';

const {HttpCode} = require(`../../constants`);

const commentsKeys = [`text`];

module.exports = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keysExist = commentsKeys.every((key) => keys.includes(key));

  if (!keysExist) {
    res.status(HttpCode.BAD_REQUEST).send(`Validation hasn't passed`);
  }

  next();
};
